const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const githubProfileDetails = document.querySelector('.circle-container');
const content = document.querySelector('.content');
const BASE_URL = 'https://api.github.com/users/';
const loader = document.querySelector('.loading-text')

function showLoader() {
    loader.classList.add('show');
    githubProfileDetails.classList.add('hide');
}

function removeLoader() {
    loader.classList.remove('show');
    githubProfileDetails.classList.add('hide');
}

async function fetchData() {
    // to remove spaces between search text
    let val = searchInput.value.replace(/\s/g, '');
    showLoader();
    const result = await fetch(`${BASE_URL}${val}`)
        .then((res) => res.json());

    // console.log('result :>> ', result);
    if (result.message !== 'Not Found') {
        removeLoader();
        displayProfileDetails(result);
        searchInput.value = ""
    }
    else{
        document.querySelector('.error').innerHTML = 'Invalid Username | Please Enter Valid Username'
    }
}


function displayProfileDetails(getProfileDetails) {
    const { login, avatar_url, bio, name, public_repos, followers, following } = getProfileDetails;

    githubProfileDetails.innerHTML =
        `
        <div class="col-md-6 col-sm-6 text-center ">
            <img src=${avatar_url} alt=${login}
            class="circle-image img-fluid">
        </div>
        <div class=" col-md-6 col-sm-6 text-center ">
            <h4 class="mt-3">Username : ${login}</h4>
            <p class="fs-6 " >Bio : ${bio}</p>
        </div>
    `;

    content.innerHTML = `
        <div class="col-sm-6 col-md-6 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body ">
                    <h5 class="card-title fw-bold ">Name : <span>${name}</span></h5>
                </div>
            </div>
        </div>

        <div class="col-sm-6 mb-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title fw-bold ">Public Repos : <span>${public_repos}</span></h5>
                </div>
            </div>
        </div>
    <div class="col-sm-6 col-md-6 mb-3 mb-sm-0">
            <div class="card">
                <div class="card-body ">
                    <h5 class="card-title fw-bold ">Following : <span>${following}</span></h5>
                </div>
            </div>
        </div>

        <div class="col-sm-6 mb-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title fw-bold ">Followers : <span>${followers}</span></h5>
                </div>
            </div>
        </div>
    `

}

searchBtn.addEventListener('click', fetchData)
