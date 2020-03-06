// users in localStorage
const userURL = `http://localhost:3000/users`
const loginURL = `http://localhost:3000/login`
const signupForm = document.getElementById('signup-form')
const loginForm = document.getElementById('login-form')
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

loginForm.addEventListener('submit', loginUser)
signupForm.addEventListener('submit', signupUser)


function signupUser() {
  event.preventDefault()

  const formData = new FormData(signupForm)
  const username = formData.get('username')
  const password = formData.get('password')

  fetch(userURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {
      signupForm.reset()
      localStorage.setItem('token', result.token)
    })

}

function loginUser() {

  event.preventDefault()

  const formData = new FormData(loginForm)
  const username = formData.get('username')
  const password = formData.get('password')

  fetch(loginURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {
      loginForm.reset()
      localStorage.setItem('token', result.token)
    })
}


fetch(userURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json())
  .then(result => {
    result.user.checklist_items.map(appendItem)
    localStorage.setItem('userId', result.user.id)
  })

function appendItem(items) {
  const item = document.createElement('li')

  item.textContent = items.item

  itemContainer.appendChild(item)
  deleteItem(items, item)
}

function deleteItem(items, item) {
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'DELETE'
  deleteButton.addEventListener('click', () => {
    event.preventDefault()
    fetch(`${checklistURL}/${items.id}`, {
      method: 'DELETE'
    }).then(event.target.parentNode.remove())
  })
  item.append(deleteButton)
  deleteButton.className = 'delete-button'
}

function main() {
  //Check local storage for user token
  // if (localStorage.token === "undefined" || !localStorage.token) {
  //   console.log("nothing")
  // } else {
  //   console.log('hit')
  //   mainPageLoad()
  //   logoutButton()
  // }
  // function mainPageLoad() {
  //   const mainPage = document.getElementById('main-page')
  //   // window.location.reload()
  //   mainPage.style.display = 'block'
  // }
}

function logout() {
  // function logoutButton() {
  //   const button = document.createElement('button')

  //   button.textContent = "logout"

  //   button.addEventListener('click', logoutUser)

  //   loginForm.appendChild(button)
  // }

  // function logoutUser() {
  //   event.preventDefault()
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('user')
  //   localStorage.removeItem('userId')
  // }
}



// Checklist

const checklistURL = "http://localhost:3000/checklist_items"
const itemContainer = document.getElementById('items')
const itemForm = document.getElementById('create-item')


itemForm.addEventListener('submit', useritem)

function useritem() {
  event.preventDefault()

  const formData = new FormData(itemForm)
  const item = formData.get('item')

  fetch(checklistURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: item,
        user_id: userId
      })

    })
    .then(response => response.json())
    .then(result => {
      appendNewItem(result)
    })
}

function appendNewItem(result) {
  itemForm.reset()

  var ItemInfo = result.checklist_item

  const newItem = document.createElement('li')

  newItem.textContent = result.checklist_item.item

  itemContainer.append(newItem)
  deleteItem(ItemInfo, newItem)
}


// // My route using Google Maps API
//   function initMap() {
//     var directionsService = new google.maps.DirectionsService();
//     var directionsRenderer = new google.maps.DirectionsRenderer();
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 7,
//       center: {
//         lat: 38.8267,
//         lng: -105.7821
//       }
//     });
//     directionsRenderer.setMap(map);

//     var onChangeHandler = function () {
//       calculateAndDisplayRoute(directionsService, directionsRenderer);
//     };
//     document.getElementById('start').addEventListener('change', onChangeHandler);
//     document.getElementById('end').addEventListener('change', onChangeHandler);
//   }

//   function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//     directionsService.route({
//         origin: {
//           query: document.getElementById('start').value
//         },
//         destination: {
//           query: document.getElementById('end').value
//         },
//         travelMode: 'BICYCLING'
//       },
//       function (response, status) {
//         if (status === 'OK') {
//           directionsRenderer.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       });
//   }


// // Weather 
//   const weatherURL = `https://api.darksky.net/forecast/4bb777ada8dd0c5341cacfbcfb6a9225/37.8267,-105.7821`
//   const cors = `https://cors-anywhere.herokuapp.com`

//   fetch(`${cors}/${weatherURL}`)
//       .then(response => response.json())
//       .then(result => {
//           currentWeather(result)
//           todaysWeather(result)
//       })

//   function currentWeather(result) {
//       const itsCurrently = document.getElementById('its-currently')
//       const current = document.createElement('h3')

//       current.textContent = result.currently.summary

//       itsCurrently.appendChild(current)
//   }

//   function todaysWeather(result) {
//       const today = document.getElementById('today')
//       const hourly = document.createElement('h2')

//       hourly.textContent = result.hourly.summary

//       today.appendChild(hourly)
//   }


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
    deletePost(individualPost, description)

  })
}

postForm.addEventListener('submit', userPost)

function userPost() {
  event.preventDefault()

  const formData = new FormData(postForm)
  const title = formData.get('title')
  const description = formData.get('description')
  console.log(userId)
  fetch(postURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        user_id: userId
      })

    })
    .then(response => response.json())
    .then(result => {
      appendNewPost(result)
    })
}

function appendNewPost(result) {
  postForm.reset()
  const newPostTitle = document.createElement('h2')
  const newPosttDiscription = document.createElement('li')

  newPostTitle.textContent = result.post.title
  newPosttDiscription.textContent = result.post.description
  var postInfo = result.post

  postContainer.append(newPostTitle, newPosttDiscription)
  deletePost(postInfo, newPosttDiscription)
}

function deletePost(post, description) {

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'DELETE'
  deleteButton.addEventListener('click', () => {
    event.preventDefault()
    fetch(`${postURL}/${post.id}`, {
      method: 'DELETE'
    }).then(
      event.target.parentNode.previousSibling.remove(),
      event.target.parentNode.previousSibling.remove())

  })
  description.appendChild(deleteButton)
  deleteButton.className = 'delete-button'

}