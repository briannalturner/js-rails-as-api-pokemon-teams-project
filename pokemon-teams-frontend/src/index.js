const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", loadPokemon)

function loadPokemon() {
    fetch("http://localhost:3000/trainers").then(resp => resp.json())
        .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer) {
    let div = document.createElement('div')
    let teams = document.getElementById('teams')
    div.classList += 'card'
    div.dataset.id = trainer.id
    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    
    let addPokemonBtn = document.createElement('button')
    addPokemonBtn.innerText = "Add Pokemon"
    addPokemonBtn.dataset.id = trainer.id
    addPokemonBtn.addEventListener("click", () => addPokemon(trainer))
    
    let pokemonList = createPokemonList(trainer)
    div.append(trainerName, addPokemonBtn, pokemonList)
    teams.append(div)
}

function createPokemonList(trainer) {
    let list = document.createElement('ul')
    list.name = 'list'
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        let releaseBtn = document.createElement('button')
        releaseBtn.innerText = "Release"
        releaseBtn.dataset.id = pokemon.id
        releaseBtn.addEventListener("click", () => releasePokemon(pokemon))
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.append(releaseBtn)
        list.append(li)
    })
    return list
}

function releasePokemon(pokemon) {
    let pokeId = pokemon.id
    console.log(pokeId)
    let element = event.currentTarget.parentNode
    fetch(`http://localhost:3000/pokemons/${pokeId}`, {
        method: "DELETE"
    }).then(resp => {
        element.remove()
    })
}

function addPokemon(trainer) {
    let trainerId = trainer.id
    let teamLength = trainer.pokemons.length

    if (teamLength < 6) {
        fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({trainer_id: trainerId})
        }).then(resp => resp.json()).then(json => renderTrainer(trainer))

        createPokemonList(trainer)
    } else {
        alert("This trainer already has 6 pokemon.")
    }
}