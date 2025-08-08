// Build mode utilities
export const BUILD_MODES = {
	REGULAR: 'regular',
	NEWHOME: 'newhome'
} as const;

export type BuildMode = typeof BUILD_MODES[keyof typeof BUILD_MODES];

export function getBuildMode(): BuildMode {
	return __BUILD_MODE__ as BuildMode;
}

export function isNewHomeMode(): boolean {
	return getBuildMode() === BUILD_MODES.NEWHOME;
}

export function isRegularMode(): boolean {
	return getBuildMode() === BUILD_MODES.REGULAR;
}