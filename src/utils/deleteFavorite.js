import { API_KEY, API_URL } from '../config/api.js'
import { getFavorites } from './getFavorites.js'

const API_FAVORITES_DELETE = (id) => `${API_URL}/favourites/${id}`

export async function deleteFavorite(id) {
  try {
    await fetch(API_FAVORITES_DELETE(id), {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY
      }
    })
    console.log('Doggo removed from favourites.')
  }
  catch(error) { console.error('Error: ', error) }

  await getFavorites()
}
