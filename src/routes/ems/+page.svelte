  <div class="hero">
    <h1>ELECTRIS Media Studios</h1>
    <p>Room with a microphone, a phone and some chairs</p>
  </div>
  
  <div class="discography">
    <a href="/ems/music" class="disc-card">
      <div class="icon">🎵</div>
      <div class="card-content">
        <h2>Music</h2>
        <p>Explore our tunes</p>
      </div>
    </a>
  </div>
  
<style>
  .hero {
    min-height: calc(20vh - 25vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    text-align: center;
  }

  .hero h1 {
    padding-top: 1vh;
    font-family: 'Letric';
    font-size: 4rem;
    margin: 0;
  }

  .hero p {
    font-family: sans-serif;
    font-size: 1.5rem;
    margin-top: 10px;
    max-width: 80%;
  }

  .discography {
    padding-top: 65vh;
    display: grid;
    justify-content: center;
    align-items: center;
  }

  .disc-card {
    display: flex;
    align-items: center;
    background-color: #222;
    padding: 20px;
    border-radius: 8px;
    text-decoration: none;
    color: #f65901;
    transition: transform 0.2s;
  }

  .disc-card:hover {
    transform: scale(1.02);
  }

  .disc-card .icon {
    font-size: 3rem;
    margin-right: 20px;
  }

  .disc-card h2 {
    margin: 0;
    font-size: 1.8rem;
  }

  .disc-card p {
    margin: 5px 0 0;
  }
</style>