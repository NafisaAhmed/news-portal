const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('navbarSupportedContent');
    categoryContainer.textContent = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('ul');
        categoryDiv.classList.add('navbar-nav')
        categoryDiv.innerHTML = `
            <li class="nav-item mx-3">
                <a onclick="loadNews('${category.category_id}')" class="nav-link text-muted fw-semibold my-4" aria-current="page" href="#">${category.category_name}</a>
            </li>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}
const loadNews = (categoryId) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data.sort((a, b) => b.total_view - a.total_view)))
        .catch(error => console.log(error))
}

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

    newsContainer.textContent = '';

    console.log(allNews);
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="row row-cols-sm-1">
            <div class="col">
                <div class="card mb-4">
                    <div class="row g-0 row-cols-sm-1">
                        <div class="col-md-4">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-4 p-3" alt="...">
                        </div>
                        <div class="col-md-8">
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
                                <div class="mt-4">
                                    <p><i class="fa-regular fa-eye mt-1"></i><span class="ms-3">${news.total_view ? news.total_view : 'No Views'}</span></p>
                                    
                                </div>
                                <div>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div class="me-3"> 
                                    <!-- Button trigger modal -->
                                    <button onclick="displayModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">
                                    Show Details
                                    </button>                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);

    })
    toggleSpinner(false);
}
const displayModal = (modalId) => {
    const url = `https://openapi.programming-hero.com/api/news/${modalId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}

const displayNewsDetails = (newsId) => {

    console.log(newsId);
    const modalTitle = document.getElementById('showDetailsModalLabel');
    modalTitle.innerText = newsId[0].title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${newsId[0].thumbnail_url}" class="img-fluid rounded-2 p-3" alt="...">
    <p>${newsId[0].details} </p>
    <div class="d-flex">
        <img src="${newsId[0].author.img}" class="img-fluid rounded-4 p-3 rounded-circle" alt="..." style="width: 80px;">
        <div>
            <h6 class="mt-3">${newsId[0].author.name ? newsId[0].author.name : 'No name Found'}</h6>
            <p class="text-muted">${newsId[0].author.published_date ? newsId[0].author.published_date.slice(0, 10) : 'No Date Found'}</p>
        </div>
    </div>
    <p>Total View: ${newsId[0].total_view ? newsId[0].total_view : 'No Views'}</span></p>
    <p>Rating: ${newsId[0].rating.number ? newsId[0].rating.number : 'No Rating'}</span></p>
    `;

}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
loadCategories();