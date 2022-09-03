const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('ul');
        categoryDiv.classList.add('navbar-nav')
        categoryDiv.innerHTML = `
            <li class="nav-item mx-3">
                <a onclick="loadNews('${category.category_id}')" id="high" class="nav-link mx-2 text-muted fw-semibold my-4" aria-current="page" href="#">${category.category_name}</a>
            </li>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}
const loadNews = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
    const highLights = document.getElementById('high')
    if (displayNews(data.data) == true) {
        highLights.classList.add('active');
    }
    else {
        highLights.classList.remove('active');
    }
}
/* const highLights = document.getElementById('high')
if (loadNews() == true) {
    highLights.classList.add('active');
}
else {
    highLights.classList.remove('active');
} */

const displayNews = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    const newsCount = document.getElementById('news-count');
    newsCount.textContent = '';
    const newsCountText = document.createElement('div')
    newsCountText.classList.add('fw-bold');
    newsCountText.innerHTML = `
    <h5 class="p-3">${allNews.length} items found </h5>
    `;
    newsCount.appendChild(newsCountText);
    console.log(allNews);
    newsContainer.textContent = '';

    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        // newsDiv.classList.add('ready');
        newsDiv.innerHTML = `
        <div class="card mb-4">
            <div class="row">
                <div class="col-md-4 w-25">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-4 p-3" alt="...">
                </div>
                <div class="col-md-8 w-75">
                    <div class="card-body mt-4">
                        <h5 class="card-title fw-bold">${news.title}</h5>
                        <p class="card-text text-muted">${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <img src="${news.author.img}" class="img-fluid rounded-4 p-3 rounded-circle" alt="..." style="width: 80px;">
                            <div>
                                <h6 class="mt-3">${news.author.name ? news.author.name : 'No name Found'}</h6>
                                <p class="text-muted">${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No Date Found'}</p>
                            </div>

                        </div>
                        <div> 
                            <button class="btn btn-primary me-3">Show Details</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })

}
loadCategories();