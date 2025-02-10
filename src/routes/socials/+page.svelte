<script>
    const socialCards = [
      {
        title: 'ELECTRIS (YouTube)',
        description: 'Heart like a pen, On paper it bleeds',
        platformLogo: '/icons/yt.svg',
        profilePicture: '/icons/elts-v1.png',
        url: 'https://youtube.com/@ELECTRIS'
      },
      {
        title: 'ELECTRIS (Discord)',
        description: 'Legends of Lightning',
        platformLogo: '/icons/discord.svg',
        profilePicture: '/icons/elts-v1.png',
        url: 'https://discord.gg/TgtCGKxbZr'
      },
      {
        title: 'ELECTRO (YouTube)',
        description: 'Dancing with the Lightning',
        platformLogo: '/icons/yt.svg',
        profilePicture: '/icons/eltr-v10.png',
        url: 'https://youtube.com/@ELEC7RO'
      },
      {
        title: 'ELECTRO (GitHub)',
        description: 'Free as in Freedom',
        platformLogo: '/icons/github.svg',
        profilePicture: '/icons/eltr-v10.png',
        url: 'https://github.com/ItzELECTR0'
      },
      {
        title: 'Varrow (YouTube)',
        description: 'Cheap learning & Lazy programming',
        platformLogo: '/icons/yt.svg',
        profilePicture: '/icons/VArrow.png',
        url: 'https://youtube.com/@V4rrow'
      },
      {
        title: 'Varrow (GitHub)',
        description: 'Free code is best code',
        platformLogo: '/icons/github.svg',
        profilePicture: '/icons/VArrow.png',
        url: 'https://github.com/Varrow1'
      }
    ];
  </script>
  
  <div class="socials-page">
    <div class="hero">
      <h1>Social Media</h1>
      <p>Follow the changes all around</p>
    </div>
  
    <div class="hero">
      {#each socialCards as card}
        <a class="social-card" href={card.url} target="_blank">
          <div class="icons">
            <img src={card.platformLogo} alt="Platform Logo" class="platform-logo" />
            <img src={card.profilePicture} alt="Profile Picture" class="profile-picture" />
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
      background-color: #131615;
      color: #f65901;
      min-height: 100vh;
    }
  
    .hero {
      min-height: calc(20vh - 25px);
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 20px;
    }
    
    .hero h1 {
      font-family: 'Letric';
      font-size: 3rem;
      margin: 0;
    }
  
    .hero p {
      font-size: 1.5rem;
      margin: 10px 0 0;
    }
  
    .social-card {
      display: flex;
      align-items: center;
      background-color: #222;
      padding: 15px;
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      text-decoration: none;
      color: #f65901;
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