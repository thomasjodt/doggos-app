import { API_URL } from '../config/api.js'
import { getFavorites } from './getFavorites.js'

export async function saveFavorite(id) {
  await fetch(`${API_URL}/favourites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '19a9b440-df85-4004-8f5c-c95a77466d9e'
    },
    body: JSON.stringify({
      image_id: id
    })
  })
  console.log('Dog saved in favourites')

  await getFavorites()
}
