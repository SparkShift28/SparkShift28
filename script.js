const API_KEY = 'e3e3ec48';  // Replace with your actual OMDb API key

document.getElementById('search-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const query = document.getElementById('search-input').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "False") {
      resultDiv.innerHTML = `<p>❌ Movie/TV show not found.</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.Title} (${data.Year})</h2>
      <img src="${data.Poster !== "N/A" ? data.Poster : ''}" alt="Poster">
      <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    console.error(error);
  }
});
