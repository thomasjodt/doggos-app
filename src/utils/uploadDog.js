import { API_KEY, API_URL } from '../config/api.js'
import { saveFavorite } from './saveFavorite.js'

export async function uploadDog() {
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form)

  console.log(formData.get('file'))

  const res = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: { 'x-api-key': API_KEY },
    body: formData
  })
  const data = await res.json()
  console.log('URL: ', data.url)
  await saveFavorite(data.id)
}
