const searchForm = document.getElementById("searchForm");
const search = document.getElementById("search");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("Show-more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = search.value.trim();
  if (!keyword) return;

  const url = `/api/search?q=${keyword}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Unsplash Image";
      searchResult.appendChild(image);
    });

    showMore.style.display = "block";
  } catch (error) {
    console.error("Error fetching images:", error);
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
