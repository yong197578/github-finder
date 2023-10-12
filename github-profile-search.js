//go to cdnjs to get axio object.

// axios() & axios.get() same thing
//Root URL
const APIURL = 'https://api.github.com/users/'

// getUser('yong197578')
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const btn = document.getElementById('search-btn')
async function getUser(username) {
    //returns promise these ways
    // .then(res => res.json()) no need to do this for axios
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    // const res = await axios(APIURL + username)
    // console.log(res.data)
    // const {data} = await axios(APIURL + username)
    // console.log(data)
    //try and catch method
    try {
        const {data} = await axios(APIURL + username)
        console.log(data)
        createUserCard(data)
        getRepos(username)
    }catch (err){
        // console.log(err)
        if(err.response.status == 404){
            createErrorCard('No profile with the Username')
        }
    }
}
async function getRepos(username){
    try {
        //show latest repositories
        const {data} = await axios(APIURL + username + '/repos?sort=created')
        // console.log(data)
        addReposToCard(data)
    }catch (err){
        // console.log(err)
        if(err.response.status == 404){
            createErrorCard('Fetching Repos Problem')
        }
    }
}
function addReposToCard(repos){
    const reposEl = document.getElementById('repos')
    repos
        //showing only 5 repos
        .slice(0, 5)
        .forEach(repo =>{
        const repoEl = document.createElement('a')
            //add class repo
        repoEl.classList.add('repo')
            //point to actual url in data
        repoEl.href = repo.html_url
            //this will opens in new window
        repoEl.target = '_blank'
            //show name of repositories
        repoEl.innerText = repo.name
            //add repoEl in reposEl
        reposEl.appendChild(repoEl)
    })
}
function createErrorCard(message){
    const cardHTML =`
    <div class="card">
    <h1>${message}</h1>
    </div>
    `
    main.innerHTML = cardHTML
}
function createUserCard (user) {
    const cardHTML = `
    <div class="card">
    <div>
    <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
    </div>
    <div class="user-info">
    <h2>${user.login}</h2>
    <p>${user.name}</p>
    <ul>
        <li>${user.followers}<strong>Followers</strong></li>
        <li>${user.following}<strong>Following</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>
    <div id="repos">


    </div>
    </div>
    </div>`

    main.innerHTML = cardHTML
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const user = search.value
    if(user){
        getUser(user)
        search.value = ''
    }
})

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const user = search.value
    if(user){
        getUser(user)
    }
})
