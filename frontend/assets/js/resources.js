const apiKey = 'df23eec87a784a7487e134ae15d6883e'; // Your NewsAPI key
const articlesContainer = document.getElementById('articles-container');
const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // Temporary proxy for testing

async function fetchConnectSphereArticles() {
  try {
    const apiUrl = `${corsProxy}https://newsapi.org/v2/everything?q=technology OR startup OR AI&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 'ok') {
      articlesContainer.innerHTML = '<p>Failed to load articles from the API.</p>';
      return;
    }

    if (!data.articles.length) {
      articlesContainer.innerHTML = '<p>No articles found.</p>';
      return;
    }

    articlesContainer.innerHTML = ''; // Clear the loading placeholder

    data.articles.forEach(article => {
      const articleElem = document.createElement('div');
      articleElem.classList.add('live-article');

      articleElem.innerHTML = `
        <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
        <p>${article.description || ''}</p>
        <small>Source: ${article.source.name} | Published: ${new Date(article.publishedAt).toLocaleDateString()}</small>
        <hr>
      `;

      articlesContainer.appendChild(articleElem);
    });

  } catch (error) {
    console.warn('Could not fetch articles:', error);
    articlesContainer.innerHTML = `<p>Live articles will be available once the backend is set up.</p>`;
  }
}

fetchConnectSphereArticles();
