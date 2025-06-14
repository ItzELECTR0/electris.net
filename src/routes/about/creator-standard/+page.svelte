<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const cursorReset = () => {
      const cursor = document.querySelector('.circle');
      if (cursor) {
        cursor.className = "circle";
      }
    };

    setTimeout(cursorReset, 10);

    const glitchTitle = () => {
      const title = document.querySelector('.hero h1');
      const highlight = document.querySelector('.highlight');
      
      if (title && highlight) {
        if (Math.random() < 0.3) {
          title.classList.add('glitch-active');
          setTimeout(() => {
            title.classList.remove('glitch-active');
          }, 150 + Math.random() * 100);
        }

        if (Math.random() < 0.2) {
          highlight.classList.add('electric-pulse');
          setTimeout(() => {
            highlight.classList.remove('electric-pulse');
          }, 800);
        }
      }
    };

    const glitchInterval = setInterval(glitchTitle, 3000 + Math.random() * 4000);

    const createElectricalParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'electrical-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 4000);
    };

    const particleInterval = setInterval(createElectricalParticle, 2000 + Math.random() * 3000);

    const setupTextCorruption = () => {
      const paragraphs = document.querySelectorAll('.explanation p, .definition');
      
      paragraphs.forEach(p => {
        let originalText = p.textContent || '';
        let isCorrupted = false;
        
        const corruptText = (text: string, intensity = 0.1): string => {
          return text.split('').map((char: string) => {
            if (Math.random() < intensity && char !== ' ') {
              const glitchChars = '█▓▒░▄▀▐▌│┤┘┴┬├─┼╋╬╫╪╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌┐└┴┬├─┼';
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          }).join('');
        };

        p.addEventListener('mouseenter', () => {
          if (!isCorrupted) {
            isCorrupted = true;
            let corruptionLevel = 0;
            
            const corruptInterval = setInterval(() => {
              corruptionLevel += 0.01;
              p.textContent = corruptText(originalText, Math.min(corruptionLevel, 0.01));
              
              if (corruptionLevel >= 0.15) {
                setTimeout(() => {
                  p.textContent = originalText;
                  isCorrupted = false;
                }, 100);
                clearInterval(corruptInterval);
              }
            }, 50);
          }
        });
      });
    };

    setupTextCorruption();

    return () => {
      clearInterval(glitchInterval);
      clearInterval(particleInterval);
    };
  });
</script>

<svelte:head>
  <title>Creator Standard | ELECTRIS</title>
</svelte:head>

<div class="hero">
  <h1>The <span class="highlight">"Creator Standard"</span></h1>
  <div class="electrical-bg"></div>
</div>

<div class="content">
  <div class="main-section">
    <h2 class="section-header">Meaning:</h2>
    <p class="definition">Works that live up to ELECTRO's Vision</p>
    
    <div class="explanation">
      <p>
        ELECTRO keeps a personal standard for all his works, code, assets and projects under ELECTRIS.<br>This standard ensures that everything aligns with the current vision and direction.
      </p>
      
      <p>
        Only works that meet this standard and support the intended goals will be utilized.<br>This applies to both original creations as well as third party ones.
      </p>
      
      <div class="important-notice">
        <h3>Vision Evolution</h3>
        <p>
          As creative vision naturally evolves over time, ELECTRO reserves the right to remove, modify, or completely recreate any creative work, whether originally created by him or not. This can happen at any time and for any reason. This makes sure that all remains consistent with the current plans and quality standards.
        </p>
        <div class="notice-glow"></div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.electrical-particle) {
    position: fixed;
    width: 2px;
    height: 2px;
    background: currentColor;
    box-shadow: 0 0 6px currentColor, 0 0 12px currentColor;
    border-radius: 50%;
    opacity: 0;
    top: -5px;
    z-index: 1;
    animation: electrical-fall 4s linear forwards;
    pointer-events: none;
  }

  @keyframes electrical-fall {
    0% {
      opacity: 0;
      transform: translateY(0) scale(1);
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
      transform: translateY(100vh) scale(0.8);
    }
    100% {
      opacity: 0;
      transform: translateY(100vh) scale(0);
    }
  }

  .hero {
    font-family: 'sans-serif';
    text-align: center;
    padding-top: 5vh;
    margin-bottom: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    position: relative;
    overflow: hidden;
  }

  .electrical-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: electrical-pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes electrical-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .hero h1 {
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
    position: relative;
    z-index: 2;
    transition: all 0.1s ease;
  }

  @keyframes glitch-text {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 1px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }

  .highlight {
    font-family: 'Nightcore';
    font-size: 4.2rem;
    position: relative;
    display: inline-block;
  }

  @keyframes electric-highlight {
    0%, 100% { 
      text-shadow: none;
      filter: brightness(1);
    }
    25% { 
      text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
      filter: brightness(1.2);
    }
    50% { 
      text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
      filter: brightness(1.4);
    }
    75% { 
      text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
      filter: brightness(1.2);
    }
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px 80px;
    position: relative;
  }

  .main-section {
    text-align: left;
  }

  .section-header {
    font-family: 'Letric';
    font-size: 2.5rem;
    margin-bottom: 20px;
    border-bottom: 2px solid;
    padding-bottom: 10px;
    position: relative;
    overflow: hidden;
  }

  .section-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%);
    animation: border-scan 3s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes border-scan {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }

  .definition {
    font-family: 'Redwing';
    font-size: 2rem;
    margin-bottom: 4vh;
    font-weight: 400;
    font-style: italic;
    position: relative;
    transition: all 0.3s ease;
  }

  .explanation {
    font-family: 'Redwing';
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .explanation p {
    margin-bottom: 25px;
    font-weight: 300;
    position: relative;
    transition: all 0.2s ease;
    cursor: default;
  }

  .explanation p:hover {
    letter-spacing: 0.5px;
  }

  .important-notice {
    margin-top: 4vh;
    padding: 2vh;
    border-radius: 0.5vh;
    border-left: 0.3vh solid;
    position: relative;
    overflow: hidden;
  }

  .notice-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    animation: notice-sweep 6s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes notice-sweep {
    0% { transform: translateX(-100%) skewX(-15deg); }
    50% { transform: translateX(0%) skewX(-15deg); }
    100% { transform: translateX(100%) skewX(-15deg); }
  }

  .important-notice h3 {
    font-family: 'Nightcore';
    font-size: 2rem;
    margin: 0 0 15px 0;
    position: relative;
    z-index: 2;
  }

  .important-notice p {
    margin: 0;
    font-weight: 500;
    font-size: 1.2rem;
    position: relative;
    z-index: 2;
  }

  @keyframes screen-distort {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(0.5px, -0.5px) scale(1.001); }
    66% { transform: translate(-0.5px, 0.5px) scale(0.999); }
  }

  .content {
    animation: screen-distort 8s ease-in-out infinite;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 134, 17, 0.01) 2px,
      rgba(255, 134, 17, 0.01) 4px
    );
    animation: scan-lines 0.1s linear infinite;
    pointer-events: none;
    opacity: 0.5;
  }

  @keyframes scan-lines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 3rem;
    }
    
    .highlight {
      font-size: 3.2rem;
    }
    
    .definition {
      font-size: 1.6rem;
    }
    
    .explanation {
      font-size: 1.1rem;
    }
  }
</style>