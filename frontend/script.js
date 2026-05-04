const BASE_URL = "https://image-search-backend-208q.onrender.com";

const searchForm = document.getElementById("searchForm");
const search = document.getElementById("search");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("Show-more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = search.value.trim();
  if (!keyword) return;

  const url = `${BASE_URL}/api/search?q=${keyword}&page=${page}`;

  try {
    if (page === 1) {
      searchResult.innerHTML = "<p>Loading...</p>";
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    const results = data.results;

    if (!results || results.length === 0) {
      showMore.style.display = "none";
      return;
    }

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Unsplash Image";
      searchResult.appendChild(image);
    });

    showMore.style.display = "block";

  } catch (error) {
    console.error("Error fetching images:", error);
    searchResult.innerHTML = "<p>Something went wrong</p>";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});
