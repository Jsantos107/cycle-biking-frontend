console.log("biking")

// users in localStorage
const userURL = `localhost:3000/users`
const loginURL = `localhost:3000/login`


// Weather 
const weatherURL = `https://api.darksky.net/forecast/4bb777ada8dd0c5341cacfbcfb6a9225/37.8267,-105.7821`
const cors = `https://cors-anywhere.herokuapp.com`

fetch(`${cors}/${weatherURL}`)
    .then(response => response.json())
    .then(result => {
        currentWeather(result)
        todaysWeather(result)
    })

function currentWeather(result) {
    const itsCurrently = document.getElementById('its-currently')
    const current = document.createElement('h3')

    current.textContent = result.currently.summary

    itsCurrently.appendChild(current)
}

function todaysWeather(result) {
    const today = document.getElementById('today')
    const hourly = document.createElement('h2')

    hourly.textContent = result.hourly.summary

    today.appendChild(hourly)
}


// Post
const postURL = "http://localhost:3000/posts"
const postContainer = document.getElementById('post-container')
const postForm = document.getElementById('create-post')
fetch(postURL)
    .then(response => response.json())
    .then(listPost)

function listPost(object) {
    object.post.map(individualPost => {
        const title = document.createElement('h2')
        const description = document.createElement('li')

        description.textContent = individualPost.description
        title.textContent = individualPost.title

        postContainer.append(title, description)
    })
}

postForm.addEventListener('submit', userPost)

function userPost() {
    event.preventDefault()

    const formData = new FormData(postForm)
    const title = formData.get('title')
    const description = formData.get('description')

    fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description
        })

      })
      .then(response => response.json())
      .then(result => {
          console.log(result)
        appendNewPost(result)
      })
  }

  function appendNewPost(result) {
    postForm.reset()

    const newPostTitle = document.createElement('h2')
    const newPosttDiscription = document.createElement('li')

    newPosttTitle.textContent = result.title
    newPosttDiscription.textContent = result.title


    postContainer.append(newPostTitle, newPosttDiscription)
  }