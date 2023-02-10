import './App.css';
import { useEffect, useState, useRef} from 'react';
import axios from 'axios';

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [display, setDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);
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
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then((response) => {
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

  useEffect(() => {
    const pokemon = [];
    const promises = new Array(200).fill().map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then((pokemonArr) => {
      return pokemonArr.map(res => res.json().then(({name, sprites: {front_default: sprite}}) => {
        return pokemon.push({name, sprite});
      }))
    })
    setSuggestions(pokemon);
  }, []);

  const setPokeDex = poke => {
    setPokemonName(poke);
    setDisplay(false);
  }

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return() => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  
  const handleInput = event => {
    setPokemonName(event.target.value);
  };

  return (
    <div className='app'>
      <div className='top_container'>
        <h1>Pokemon Stats</h1>
        <input 
          ref={wrapperRef}
          type="text" 
          onClick={() => setDisplay(!display)}
          value={pokemonName}
          placeholder='Type Here' 
          onChange={handleInput} />
          {display && (
            <div className='autoConatiner'>
              {suggestions
                .filter(({ name }) => name.toLowerCase().includes(pokemonName.toLowerCase()))
                .map((v, i) => (
                  <div
                    onMouseDown={() => setPokeDex(v.name)}
                    className='option'
                    key={i}
                    tabIndex='0'
                  >
                    <span>{v.name}</span>
                    <img src={v.sprite} alt='pokemon' />
                  </div>
                ))}
            </div>
          )}
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='display-result'>
        {pokemonChosen ? (
          <>
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h1>
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