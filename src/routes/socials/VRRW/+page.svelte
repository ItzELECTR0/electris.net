<script>
    const socialCards = [
      {
        title: 'YouTube',
        description: 'Straight to the point',
        platformLogo: '/icons/yt.svg',
        profilePicture: '/icons/VArrow.png',
        url: 'https://youtube.com/@V4rrow'
      },
      {
        title: 'GitHub',
        description: 'Free code is best code',
        platformLogo: '/icons/github-nobg.svg',
        profilePicture: '/icons/VArrow.png',
        url: 'https://github.com/Varrow1'
      },
      {
        title: 'Twitter',
        description: 'I tweet sometimes',
        platformLogo: '/icons/twitter.svg',
        profilePicture: '/icons/VArrow.png',
        url: 'https://x.com/0xVarrow'
      }
    ];
</script>

<svelte:head>
  <title>Socials | VARROW</title>
</svelte:head>
  
  <div class="socials-page">
    <div class="hero">
      <h1>Varrow</h1>
      <p>Follows the changes all around</p>
    </div>
  
    <div class="hero">
      {#each socialCards as card}
        <a class="social-card" href={card.url} target="_blank">
          <div class="icons">
            <img src={card.platformLogo} alt="Platform Logo" class="platform-logo"/>
            <img src={card.profilePicture} alt="Profile Picture" class="profile-picture"/>
          </div>
          <div class="card-text">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
  
  <style>
    .socials-page {
      padding: 80px 20px 20px;
      min-height: 100vh;
    }
  
    .hero {
      min-height: calc(20vh - 25vh);
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 20px;
    }
    
    .hero h1 {
      padding-top: 1vh;
      font-family: 'Letric';
      font-size: 3rem;
      margin: 0;
    }

    .hero p {
      font-size: 1.5rem;
      margin: 10px 0 0;
      font-family: sans-serif;
    }
  
    .hero p {
      font-size: 1.5rem;
      margin: 10px 0 0;
    }
  
    .social-card {
      display: flex;
      align-items: center;
      padding: 15px;
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      text-decoration: none;
      transition: transform 0.2s ease;
    }
  
    .social-card:hover {
      transform: scale(1.02);
    }
  
    .icons {
      position: relative;
      margin-right: 15px;
      flex-shrink: 0;
    }
  
    .platform-logo {
      width: 4vh;
      height: 4vh;
      image-resolution: 80px;
      border-radius: 50%;
      background-color: #fff;
    }
  
    .profile-picture {
      width: 3vh;
      height: 3vh;
      border-radius: 50%;
      position: absolute;
      right: -10px;
      bottom: -10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    }
  
    .card-text h2 {
      margin: 0;
      font-size: 1.8rem;
      text-align: left;
    }
  
    .card-text p {
      margin: 5px 0 0;
      font-size: 1rem;
      text-align: left;
    }
  </style>