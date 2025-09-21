const accessKey = "c3IhFd71F7CpBks-SKxp0h6ZNJTx4xU9jAYecq_6Or8";


const searchForm = document.getElementById('searchForm');
const search = document.getElementById('search');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('Show-more');

let keyword = '';
let page = 1;

async function searchImages(params) {
    keyword = search.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = '';
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement('img');
        image.src = result.urls.small;

        // const imageLink = document.createElement('a');
        // imageLink.href = result.links.html;
        // imageLink.target = '_blank';

        // imageLink.appendChild(image);

        // to direct the image on website replace below "image" with "imageLink"
        searchResult.appendChild(image);

    })

    showMore.style.display = 'block';

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener('click',()=> {
    page++;
    searchImages();
})