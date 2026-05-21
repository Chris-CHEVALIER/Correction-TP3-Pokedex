const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'

const pokemonList = document.getElementById('pokemon-list')
const errorMsg = document.getElementById('error-msg')
const searchInput = document.getElementById('search')

function searchByName (event) {
  const searchValue = event.target.value
  const pokemonCards = document.querySelectorAll('.pokemon-card')
  pokemonCards.forEach(pokemonCard => {
    const pokemonName = pokemonCard.querySelector('.pokemon-name')
    if (
      !pokemonName.innerText.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      pokemonCard.style.display = 'none'
    } else {
      pokemonCard.style.display = 'block'
    }
  })
}

async function loadPokemons () {
  try {
    const response = await fetch(API_URL, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Code de statut : ${response.status}`)
    }
    const data = await response.json()
    const pokemons = data.results
    renderPokemons(pokemons)
  } catch (error) {
    errorMsg.textContent = error.message
  }
}

async function renderPokemons (pokemons) {
  try {
    let i = 0
    for (const pokemon of pokemons) {
      const response = await fetch(pokemon.url)
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
      const pokemonDetails = await response.json()
      renderPokemon(i + 1, pokemon.name, pokemonDetails)
      i++
    }
  } catch (error) {
    errorMsg.textContent = error.message
  }
}

function renderPokemon (number, pokemon, pokemonDetails) {
  const pokemonCard = document.createElement('div')
  pokemonCard.className = 'pokemon-card'
  const pokemonImg = document.createElement('img')
  pokemonImg.className = 'pokemon-img'
  pokemonImg.src =
    pokemonDetails.sprites.other['official-artwork'].front_default
  pokemonImg.alt = pokemon
  const pokemonName = document.createElement('h3')
  pokemonName.className = 'pokemon-name'
  pokemonName.textContent = `#${number} - ${pokemon}`
  pokemonCard.appendChild(pokemonName)
  pokemonCard.appendChild(pokemonImg)
  pokemonList.appendChild(pokemonCard)
}

function toggleBurgerMenu () {
  const burgerMenu = document.querySelector('.burger-menu')
  if (burgerMenu.style.display === 'none') {
    burgerMenu.style.display = 'block'
  } else {
    burgerMenu.style.display = 'none'
  }
}

function changeTheme () {
  const links = document.querySelectorAll('header nav ul li a')
  const sunIcon = document.querySelector('.fa-sun')
  const moonIcon = document.querySelector('.fa-moon')
  if (sunIcon.style.display === 'none') {
    sunIcon.style.display = 'block'
    moonIcon.style.display = 'none'
  } else {
    sunIcon.style.display = 'none'
    moonIcon.style.display = 'block'
  }
  links.forEach(link => {
    if (link.style.color === 'white') {
      link.style.color = 'black'
    } else {
      link.style.color = 'white'
    }
  })
  document.body.classList.toggle('dark-theme')
}

loadPokemons()
