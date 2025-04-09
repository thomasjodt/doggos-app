const API_URL         = 'https://api.thedogapi.com/v1'
const spanError       = document.getElementById('error')
const favourites      = document.getElementById('favourites-grid')
const API_KEY         = '19a9b440-df85-4004-8f5c-c95a77466d9e'

const API_FAVOURITES_DELETE = (id) => `${API_URL}/favourites/${id}`

async function getRandomDoggoImage() {
  try {
    const res   = await fetch(`${API_URL}/images/search?limit=3`)
    const data  = await res.json()
    
    const img1    = document.getElementById('pic1')
    const img2    = document.getElementById('pic2')
    const img3    = document.getElementById('pic3')
    const btn1    = document.getElementById('random-button-1')
    const btn2    = document.getElementById('random-button-2')
    const btn3    = document.getElementById('random-button-3')

    btn1.onclick  = () => saveFavouriteDoggos(data[0].id)
    btn2.onclick  = () => saveFavouriteDoggos(data[1].id)
    btn3.onclick  = () => saveFavouriteDoggos(data[2].id)
    img1.src      = data[0].url
    img2.src      = data[1].url
    img3.src      = data[2].url
    
    console.log('Random: ', data )
}
catch(error) { console.error('Error: ', error)}
}

async function getFavouriteDoggoImage() {
  try {
    const res   = await fetch(`${API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'x-api-key': '19a9b440-df85-4004-8f5c-c95a77466d9e'
      }
    })
    const data  = await res.json()
    
    console.log('Favourites: ', data)
    
    if (res.status !== 200) {
      spanError.innerText = `Hubo un error ${res.status} \n ${data.message}`
    }
    else {
      favourites.innerHTML = ''
      data.forEach(dog => {
        const article     = document.createElement('article')
        const img         = document.createElement('img')
        const btn         = document.createElement('button')
        img.src           = dog.image.url
        btn.innerText     = '❌' 
        btn.onclick = () => deleteFavouriteDoggo(dog.id)
        
        article.appendChild(img)
        article.appendChild(btn)
        img.classList.add('pic')
        favourites.appendChild(article)
        btn.classList.add('fav-button')
        article.classList.add('pic-container')
      })
    }

  }
  catch(error) { console.error(error) }
}

async function saveFavouriteDoggos(id) {
  const res = await fetch(`${API_URL}/favourites`, {
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

  getFavouriteDoggoImage()
}

async function deleteFavouriteDoggo(id) {
  try {
    const res = await fetch(API_FAVOURITES_DELETE(id), {
      method: 'DELETE',
      headers: {
        'x-api-key': '19a9b440-df85-4004-8f5c-c95a77466d9e'
      }
    })
    console.log('Doggo removed from favourites.')
  }
  catch(error) { console.error('Error: ', error) }

  getFavouriteDoggoImage()
}

async function uploadDoggoPicture() {
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form)

  console.log(formData.get('file'))

  const res = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY
    },
    body: formData
  })
  const data = await res.json()
  console.log('URL: ', data.url)
  saveFavouriteDoggos(data.id)
}

getRandomDoggoImage()
getFavouriteDoggoImage()