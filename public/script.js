const api = 'http://localhost:8080/api';

// Fetch board games data
fetch(`${api}/board-games`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const boardGamesContainer = document.getElementById('boardGames');
    data.forEach(boardGame => {
      const boardGameDiv = document.createElement('div');
      boardGameDiv.classList.add('game');
      boardGameDiv.innerHTML = `
        <h2>${boardGame.name}</h2>
        <p>${boardGame.description}</p>
        <p>Price: $${boardGame.price}</p>
      `;
      boardGamesContainer.appendChild(boardGameDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching board games:', error);
  });

// Fetch video games data
fetch(`${api}/video-games`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const videoGamesContainer = document.getElementById('videoGames');
    data.forEach(videoGame => {
      const videoGameDiv = document.createElement('div');
      videoGameDiv.classList.add('game');
      videoGameDiv.innerHTML = `
        <h2>${videoGame.name}</h2>
        <p>Platform: ${videoGame.platform}</p>
        <p>Genre: ${videoGame.genre}</p>
      `;
      videoGamesContainer.appendChild(videoGameDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching video games:', error);
  });
