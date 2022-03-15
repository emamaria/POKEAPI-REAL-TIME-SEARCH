window.onload = function(){
    init()

  
}


const init = async() => {

    const todosPokemon  =  await pokemons()

    console.log(todosPokemon);

    mappedPokemons(todosPokemon)

    showAllPokemon(todosPokemon)

    inputSearch(todosPokemon)

}



const pokemons = async()=> {

    
        let result = [];

        for(let i = 1; i <= 151; i++ ){
         
         let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    
         let resultPokemon =  await pokemon.json()
    
         result.push(resultPokemon)
    
       }
    
        return result;
    

}


let mappedPokemons = (pokemons) => {

    pokemons.map(pokemon => {

       return  printPokemon({ name: pokemon.name, img: pokemon.sprites.other.home.front_default, height: (pokemon.height)/10}) 
           })

    
}

   let printPokemon = (pokemon) => {

   let pokemonContainer = document.querySelector('#pokemons')

   pokemonContainer.innerHTML += `<div class="allpokemons">
   <h2 class="pokemonName">${pokemon.name.toUpperCase()}</h2>
   <img class="pokemonImage" src=${pokemon.img} alt=${pokemon.name}>
   <p class="pokemonHeight">Height: ${pokemon.height}m</p>
   </div>
   `
   
}


   

 const showAllPokemon = ((pokemons)=> {

   let button = document.querySelector("#showAllButton")

    button.addEventListener("click", function(){

        

        let pokemonContainer = document.querySelector('#pokemons')
    
        pokemonContainer.innerHTML = "";

        printPokemon(pokemons)

    })

 })

//  *****

 const  inputSearch = ((pokemons)=>{

  let input = document.querySelector("#searchInput");

  input.addEventListener("input", function(){

  let inputValue = document.querySelector("#searchInput").value.toLowerCase()
  

  let pokemonContainer = document.querySelector('#pokemons')

  pokemonContainer.innerHTML = "";

  let mappedpokemon = pokemons.map(pokemon => {
    return { name: pokemon.name, img: pokemon.sprites.other.home.front_default, height: (pokemon.height)/10}
   })

   let filteredPokemon = mappedpokemon.filter(pokemon => {
     return  pokemon.name.includes(inputValue)
   })

   filteredPokemon.forEach(pokemon => {
    printPokemon(pokemon) 
   })
    

  })

  
 })