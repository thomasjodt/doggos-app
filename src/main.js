import { getFavorites, getRandomDogs, uploadDog } from './utils'

const $ = (selector, node = document) => node.querySelector(selector)

const $app = $('#app')
$app.innerHTML = `
<h1 class="app-title">Doggos App</h1>
<section class="section-container" id="randomDoggos">
    <h2 class="title">Random Doggos</h2>
    <span id="error"></span>
    <div id='random-doggos' class="pic-grid"></div>
    
    <button id="random-dogs-button" class="button">
      Get Random Image
    </button>
  </section>

  <section id="uploadingDogo">
    <h2 class="title" >Upload your Doggo picture</h2>

    <form id="uploadingForm" >
      <input type="file" id="file" name="file" />
      <button type="button" class="button upload" onclick="uploadDog()">
        Upload
      </button>
    </form>
  </section>

  <section class="section-container" id="favouriteDoggos">
      <h2 class="title">Favorite Doggos</h2>
      <div class="pic-grid" id="favorites-grid"></div>
  </section>
`

;(async () => {
  await getRandomDogs()
  await getFavorites()
  $('#random-dogs-button').onclick = () => getRandomDogs()
})()
