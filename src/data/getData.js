import { Pokedex } from 'pokeapi-js-wrapper';

// Returns Promise to array of size n of random pokemons' names and image src from PokeAPI.
async function getData(n) {
  const P = new Pokedex();
  const nums = new Set();
  while (nums.size !== n) {
    nums.add(Math.floor(Math.random() * 100) + 1);
  }
  const idArr = [...nums];
  return Promise.all(
    idArr.map(async (id) => {
      const { name, sprites } = await P.getPokemonByName(id);
      return {
        id,
        name,
        imgSrc: sprites.other['official-artwork'].front_default,
      };
    })
  );
}

export default getData;
