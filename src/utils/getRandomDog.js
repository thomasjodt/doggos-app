import { saveFavorite } from './saveFavorite.js'
import { API_URL } from '../config/api.js'
import { $ } from '.'

export async function getRandomDogs(limit = 1) {
  const $randomDoggos = $('#random-doggos')

  console.log('star: ', star)
  try {
    const res   = await fetch(`${API_URL}/images/search?limit=${limit}`)
    const data  = await res.json()

    for (const dog of data) {
      const container = document.createElement('article')
      container.classList.add('pic-container')

      const image = document.createElement('img')
      image.classList.add('pic')
      image.src = dog.url
      image.alt = dog.id

      const favoriteButton = document.createElement('button')
      favoriteButton.classList.add('fav-button')
      favoriteButton.innerText = '⭐'
      favoriteButton.onclick = () => saveFavorite(dog.id)

      container.append(image)
      container.append(favoriteButton)

      $randomDoggos.innerHTML = ''
      $randomDoggos.append(container)
    }
  } catch(error) { console.error('Error: ', error)}
}
