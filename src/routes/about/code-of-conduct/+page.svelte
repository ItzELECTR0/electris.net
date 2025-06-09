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
  });
</script>

<svelte:head>
  <title>Code of Conduct | ELECTRIS</title>
</svelte:head>

<div class="conduct-page">
  <div class="hero">
    <h1>Community<br><span class="highlight">Code of Conduct</span></h1>
  </div>

  <div class="content">
    <section class="pledge-section">
      <h2>Our Pledge</h2>
      <div class="pledge-content">
        <p>We as members, moderators, contributors, and partners:</p>
        <ul>
          <li>We pledge to make participation in our community a harassment-free experience for everyone</li>
          <li>We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community</li>
          <li>We pledge to make our contributions out of mutual respect, regardless of reward, if any at all</li>
        </ul>
      </div>
    </section>

    <section class="standards-section">
      <h2>Our Standards</h2>
      
      <div class="standards-grid">
        <div class="standard-card encouraged">
          <h3>Encouraged Behaviour</h3>
          <ul>
            <li>Being respectful of differing opinions, viewpoints, and experiences</li>
            <li>Being kind regardless of attacking responses</li>
            <li>Accepting responsibility and apologizing to those affected by our mistakes</li>
            <li>Focusing on what is best not just for us as individuals, but for the overall community and the project</li>
          </ul>
        </div>

        <div class="standard-card unacceptable">
          <h3>
            <a href="/media/gif/wearetheexception.gif"> Unacceptable Behaviour</a>
          </h3>
          <ul>
            <li>Trolling, insulting or derogatory comments, and personal or political attacks</li>
            <li>Public or private harassment</li>
            <li>Publishing others' private information, such as doxxing or any reveal of information without consent</li>
            <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="enforcement-section">
      <h2>Responsibilities</h2>
      <div class="enforcement-content">
        <p>Community moderators are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.</p>
        
        <p>Community moderators have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.</p>
      </div>
    </section>

    <section class="scope-section">
      <h2>Scope</h2>
      <div class="scope-content">
        <p>This Code of Conduct applies community wide, including project pages, discord servers, youtube channels, etc.</p>
        <p>And it also applies when an individual is officially representing the community in public spaces.</p>
        
        <div class="examples-box">
          <h4>Examples of representing our community include:</h4>
          <ul>
            <li>Acting as an appointed representative at an online or offline event</li>
            <li>Posting via an official social media account (@ELECTRIS on YouTube)</li>
            <li>Using an official email address (Ending in @electris.net)</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="enforcement-basic-section">
      <h2>Enforcement</h2>
      <div class="enforcement-basic-content">
        <p>Instances of unacceptable behavior will be punished accordingly with the rules of this code of conduct or any other community rules</p>
        <ul>
          <li>This allows members to report such instances to moderators or other members with authority</li>
          <li>This allows members with authority and moderators to take action according to the gravity of the instance</li>
        </ul>
      </div>
    </section>

    <section class="guidelines-section">
      <h2>Enforcement Guidelines</h2>
      <p class="guidelines-intro">Community moderators will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:</p>
      
      <div class="guidelines-grid">
        <div class="guideline-card level-1">
          <div class="level-header">
            <span class="level-number">1</span>
            <h3>Correction</h3>
          </div>
          <div class="impact">
            <strong>Community Impact:</strong> Use of extreme inappropriate language or other behavior deemed unprofessional or unwelcome in the community (Depending on the context)
          </div>
          <div class="consequence">
            <strong>Consequence:</strong> A private, written warning from community moderators, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.
          </div>
        </div>

        <div class="guideline-card level-2">
          <div class="level-header">
            <span class="level-number">2</span>
            <h3>Warning</h3>
          </div>
          <div class="impact">
            <strong>Community Impact:</strong> A violation through a single incident or series of actions.
          </div>
          <div class="consequence">
            <strong>Consequence:</strong> A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.
          </div>
        </div>

        <div class="guideline-card level-3">
          <div class="level-header">
            <span class="level-number">3</span>
            <h3>Temporary Ban</h3>
          </div>
          <div class="impact">
            <strong>Community Impact:</strong> A serious violation of community standards, including sustained inappropriate behavior.
          </div>
          <div class="consequence">
            <strong>Consequence:</strong> A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.
          </div>
        </div>

        <div class="guideline-card level-4">
          <div class="level-header">
            <span class="level-number">4</span>
            <h3>Permanent Ban</h3>
          </div>
          <div class="impact">
            <strong>Community Impact:</strong> Demonstrating a grave action or a pattern of violations of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.
          </div>
          <div class="consequence">
            <strong>Consequence:</strong> A permanent ban from any sort of public interaction within the community.
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .conduct-page {
    min-height: 100vh;
    padding-top: 8vh;
  }

  .hero {
    text-align: center;
    padding: 4vh 2vh 6vh;
    margin-bottom: 4vh;
  }

  .hero h1 {
    font-family: 'Letric';
    font-size: 3.5rem;
    margin: 0;
    line-height: 1.2;
  }

  .highlight {
    color: #ff6811;
  }

  .content {
    max-width: 120vh;
    margin: 0 auto;
    padding: 0 3vh 6vh;
  }

  section {
    margin-bottom: 6vh;
  }

  h2 {
    font-family: 'Letric';
    font-size: 2.2rem;
    margin-bottom: 2vh;
    color: #f65901;
    border-bottom: 0.2vh solid rgba(246, 89, 1, 0.3);
    padding-bottom: 1vh;
  }

  h3 {
    font-family: 'Redwing';
    font-size: 1.6rem;
    margin-bottom: 1.5vh;
    color: #ff6811;
  }

  h4 {
    font-family: 'Redwing';
    font-size: 1.3rem;
    margin-bottom: 1vh;
    color: #ff6811;
  }

  p {
    font-family: 'Redwing';
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5vh;
    color: rgba(246, 89, 1, 0.9);
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    font-family: 'Redwing';
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1vh;
    color: rgba(246, 89, 1, 0.85);
    position: relative;
    padding-left: 2vh;
  }

  li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #ff6811;
    font-weight: bold;
  }

  .pledge-content {
    background: rgba(246, 89, 1, 0.05);
    padding: 3vh;
    border-radius: 1vh;
    border-left: 0.4vh solid #f65901;
  }

  .standards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
    margin-top: 3vh;
  }

  .standard-card {
    padding: 3vh;
    border-radius: 1vh;
    border: 0.2vh solid;
  }

  .encouraged {
    border-color: rgba(90, 210, 57, 0.3);
  }

  .unacceptable {
    border-color: rgba(255, 51, 51, 0.3);
  }

  .enforcement-content {
    background: rgba(246, 89, 1, 0.05);
    padding: 3vh;
    border-radius: 1vh;
  }

  .scope-content {
    padding: 3vh;
    border-radius: 1vh;
  }

  .examples-box {
    padding: 2vh;
    border-radius: 0.5vh;
    margin-top: 2vh;
    border-left: 0.3vh solid #ff6811;
  }

  .enforcement-basic-content {
    background: rgba(246, 89, 1, 0.05);
    padding: 3vh;
    border-radius: 1vh;
  }

  .guidelines-intro {
    font-size: 1.2rem;
    margin-bottom: 3vh;
    font-weight: 500;
  }

  .guidelines-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
    margin-top: 3vh;
  }

  .guideline-card {
    padding: 3vh;
    border-radius: 1vh;
    border: 0.2vh solid;
    background: rgba(246, 89, 1, 0.03);
  }

  .level-1 { border-color: rgba(157, 255, 0, 0.699); }
  .level-2 { border-color: rgba(255, 166, 0, 0.596); }
  .level-3 { border-color: rgba(255, 92, 51, 0.623); }
  .level-4 { border-color: rgba(255, 0, 0, 0.795); }

  .level-header {
    display: flex;
    align-items: center;
    margin-bottom: 2vh;
  }

  .level-number {
    font-family: 'Redwing';
    font-size: 2rem;
    background: #f65901;
    color: #131615;
    width: 4vh;
    height: 4vh;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5vh;
    font-weight: 700;
  }

  .impact, .consequence {
    margin-bottom: 1.5vh;
    font-size: 1rem;
    line-height: 1.5;
  }

  .impact strong, .consequence strong {
    color: #ff6811;
    font-weight: 600;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .content {
      padding: 0 2vh 4vh;
    }

    .standards-grid,
    .guidelines-grid {
      grid-template-columns: 1fr;
      gap: 2vh;
    }

    h2 {
      font-size: 1.8rem;
    }

    .standard-card,
    .guideline-card,
    .pledge-content,
    .enforcement-content,
    .scope-content,
    .enforcement-basic-content {
      padding: 2vh;
    }

    .level-number {
      width: 3vh;
      height: 3vh;
      font-size: 1.5rem;
    }
  }
</style>