import './App.css';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "", 
    img: "", 
    type: "",
    hp: "",
    attack: "",
    defence: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName, 
        species: response.data.species.name, 
        img: response.data.sprites.front_default, 
        type: response.data.types[0].type.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
      });
      setPokemonChosen(true);
      console.log(response);
    })
  };

  return (
    <div className='app'>
      <div className='top_container'>
        <h1>Pokemon Stats</h1>
        <input type="text" placeholder='Pikachu' onChange={(event) => {setPokemonName(event.target.value.toLowerCase());}}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='display-result'>
        {pokemonChosen ? (
          <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img}/>
          <h3>Species: {pokemon.species}</h3>
          <h3>Type: {pokemon.type}</h3>
          <h3>Hp: {pokemon.hp}</h3>
          <h3>Attack: {pokemon.attack}</h3>
          <h3>Defense: {pokemon.defence}</h3>
          </>
        ) : (
          <h1>Please type a Pokemon</h1>
        )}
      </div>
    </div>
  )
}

export default App;