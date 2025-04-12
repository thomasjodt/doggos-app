import { API_KEY, API_URL } from '../config/api.js'
import { deleteFavorite } from './deleteFavorite.js'
const $ = (selector, node = document) => node.querySelector(selector)

export async function getFavorites() {
  const $error = $('#error')
  const $favorites = $('#favorites-grid')

  try {
    const res   = await fetch(`${API_URL}/favourites`, { headers: { 'x-api-key': API_KEY } })
    const data  = await res.json()

    console.log('Favourites: ', data)

    if (res.status !== 200) {
      $error.innerText = `Hubo un error ${res.status} \n ${data.message}`
    }
    else {
      $favorites.innerHTML = ''
      data.forEach(dog => {
        const img = document.createElement('img')
        const btn = document.createElement('button')
        const article = document.createElement('article')

        img.src           = dog.image.url
        btn.innerText     = '❌'
        btn.onclick = () => deleteFavorite(dog.id)

        article.appendChild(img)
        article.appendChild(btn)
        img.classList.add('pic')
        $favorites.appendChild(article)
        btn.classList.add('fav-button')
        article.classList.add('pic-container')
      })
    }

  }
  catch(error) { console.error(error) }
}
