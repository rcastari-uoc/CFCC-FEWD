<script setup>
import { ref, onMounted } from 'vue';
import pokeservice from '@/services/pokeservice.js';
import PokeDeck from '../components/PokeDeck.vue';
import PokeFilter from '../components/PokeFilter.vue';

const pokemons = ref([]);

onMounted(() => {
  if(sessionStorage.getItem("pokemonsViewList")){
    pokemons.value = JSON.parse(sessionStorage.getItem("pokemonsViewList"));
  }else{
    pokeservice.getRandPokemons(10)
    .then( response => {
      /* si la consulta ha anat bé i ens retorna informació */
      /* actualitzem el valor de la variable cards amb les dades
      que interessin de la resposta rebuda */
      pokemons.value = response;
      sessionStorage.setItem("pokemonsViewList", JSON.stringify(pokemons.value));
    })
    .catch( error => {
      /* si la consulta falla i retorna error */
      console.log(error);
    })
  }
});

function pokeFilterEventHandler(pokeNameTest){

  pokemons.value.forEach(pokemon =>{
    pokemon.visible = true;
    if(pokeNameTest && !pokemon.name.includes(pokeNameTest)){
      pokemon.visible = false;
    }
  });

}

</script>

<template>
  <main>
    <PokeFilter @poke-filter-event="pokeFilterEventHandler" />
    <PokeDeck :pokemons="pokemons" />
  </main>
</template>
