import { writable, derived, readable } from 'svelte/store';
import { browser } from '$app/environment';
import { isNewHomeMode } from '$lib/utils/buildMode';

export type Environment = 'production' | 'canary' | 'newhome' | 'development' | 'unknown';

export interface EnvironmentInfo {
  environment: Environment;
  environmentSecondary: Environment;
  siteUrl: string;
  siteVersion: string;
  hostname: string;
  isProduction: boolean;
  isCanary: boolean;
  isDevelopment: boolean;
  isNewHome: boolean;
  isUnknown: boolean;
}

function createEnvironmentStore() {
  const { subscribe, set } = writable<EnvironmentInfo>({
    environment: 'unknown',
    environmentSecondary: 'unknown',
    siteUrl: '',
    siteVersion: 'v0.0.2',
    hostname: '',
    isProduction: false,
    isCanary: false,
    isDevelopment: false,
    isNewHome: false,
    isUnknown: true
  });

  function detectEnvironment(): EnvironmentInfo {
    let environment: Environment = 'unknown';
    let environmentSecondary: Environment = 'unknown';
    let hostname = '';
    let siteUrl = '';
    
    if (browser) {
      hostname = window.location.hostname;
      siteUrl = import.meta.env.VITE_SITE_URL || "";
      
      if (hostname === "canary.electris.net") {
        environment = "canary";
      } else if (hostname === "electris.net") {
        environment = "production";
      } else if (hostname === "new.electris.net" && isNewHomeMode()) {
        environment = "newhome";
      } else if (hostname === "localhost" && isNewHomeMode()) {
        environment = "newhome";
        environmentSecondary = "development";
      } else if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "testing.electris.net") {
        environment = "development";
      } else {
        environment = "unknown";
      }
    }

    const siteVersion = import.meta.env.VITE_SITE_VER || "v0.0.2";

    const envInfo: EnvironmentInfo = {
      environment,
      environmentSecondary,
      siteUrl,
      siteVersion,
      hostname,
      isProduction: environment === 'production',
      isCanary: environment === 'canary',
      isDevelopment: environment === 'development' || environment === 'newhome' && environmentSecondary === 'development',
      isNewHome: environment === 'newhome',
      isUnknown: environment === 'unknown'
    };

    return envInfo;
  }

  function initialize() {
    if (browser) {
      const envInfo = detectEnvironment();
      set(envInfo);
    }
  }

  initialize();

  return {
    subscribe,
    refresh: initialize,
    detectEnvironment
  };
}

export const environmentStore = createEnvironmentStore();

export const currentEnvironment = derived(environmentStore, $env => $env.environment);
export const siteVersion = derived(environmentStore, $env => $env.siteVersion);
export const siteUrl = derived(environmentStore, $env => $env.siteUrl);
export const hostname = derived(environmentStore, $env => $env.hostname);

export function getCurrentEnvironment(): Environment {
  if (!browser) return 'unknown';
  return environmentStore.detectEnvironment().environment;
}

export function getEnvironmentInfo(): EnvironmentInfo {
  if (!browser) {
    return {
      environment: 'unknown',
      environmentSecondary: 'unknown',
      siteUrl: '',
      siteVersion: import.meta.env.VITE_SITE_VER || "v0.0.2",
      hostname: '',
      isProduction: false,
      isCanary: false,
      isDevelopment: false,
      isNewHome: false,
      isUnknown: true
    };
  }
  return environmentStore.detectEnvironment();
}

export function generateEnvironmentUrl(path: string = '', search: string = ''): string {
  if (!browser) return '';
  
  const currentPath = path || window.location.pathname;
  const currentSearch = search || window.location.search;
  const env = getCurrentEnvironment();

  switch (env) {
    case "canary":
    case "development":
      return `https://electris.net${currentPath}${currentSearch}`;
    case "production":
      return `https://canary.electris.net${currentPath}${currentSearch}`;
    default:
      return `https://localhost:5173${currentPath}${currentSearch}`;
  }
}

export function getEnvironmentDisplayName(env?: Environment): string {
  const environment = env || getCurrentEnvironment();
  
  switch (environment) {
    case 'canary':
      return 'canary';
    case 'production':
      return 'production';
    case 'newhome':
      return 'newhome';
    case 'development':
      return 'development';
    default:
      return 'unknown';
  }
}