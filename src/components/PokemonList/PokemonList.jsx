import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css'
function PokemonList() {
const [PokemonList1 , setPokimonList]=useState([]);
const [isLoading,setIsLoading]=useState(true);


async function downloadpokemon(){

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const pokemonResults=response.data.results;
    const pokemonResultspromise=pokemonResults.map((pokemon) => axios.get(pokemon.url))
    // console.log(pokemonResultspromise)
    const pokemonData=await axios.all(pokemonResultspromise)
    //    console.log("pokemon data",pokemonData)
       const res=pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data
        // console.log(pokemon)
return {
    id :pokemon.id,
    name :pokemon.name,
    image:pokemon.sprites.front_shiny,
    types: pokemon.types
}

       });
       console.log(res)
       setPokimonList(res)
       setIsLoading(false)


}
useEffect(() =>{
    downloadpokemon()
},[])

  return (
    <div className='pokemon-list-wrapper'>
     <div> Pokemon List</div>
     {(isLoading)?'Loading' : PokemonList1.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} />)}
    </div>
  )
}

export default PokemonList
