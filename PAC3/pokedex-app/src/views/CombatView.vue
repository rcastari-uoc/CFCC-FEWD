<script setup>
import { ref, onMounted } from 'vue';
import pokeservice from '@/services/pokeservice.js';
import PokeCombatDeck from '../components/PokeCombatDeck.vue';

const pokemons = ref([]);
const attackingPokemon = ref(null);
const defendingPokemon = ref(null);
const resultMsg = ref("");
const resetButtonDisabled = ref(true);

onMounted(() => {
  if(sessionStorage.getItem("pokemonsCombatList")){
    pokemons.value = JSON.parse(sessionStorage.getItem("pokemonsCombatList"));
    let attackingId = sessionStorage.getItem("attackingId");
    if(attackingId !== null){
      updateCombatState(attackingId);
    }
    let defendingId = sessionStorage.getItem("defendingId");
    if(defendingId !== null){
      updateCombatState(defendingId);
    }
  }else{
    pokeservice.getRandPokemons(10)
    .then( response => {
      /* si la consulta ha anat bé i ens retorna informació */
      /* actualitzem el valor de la variable cards amb les dades
      que interessin de la resposta rebuda */
      pokemons.value = response.map( p => {
        p.selected = false;
        return p;
      });
      sessionStorage.setItem("pokemonsCombatList", JSON.stringify(pokemons.value));
    })
    .catch( error => {
      /* si la consulta falla i retorna error */
      console.log(error);
    })
  }
});

function updateCombatState(pokemonId){

  if(attackingPokemon.value === null){

      attackingPokemon.value = pokemons.value.find(p => p.id == pokemonId);
      attackingPokemon.value.selected = true;
      sessionStorage.setItem("attackingId", pokemonId);

  }else if(defendingPokemon.value === null){

      defendingPokemon.value = pokemons.value.find(p => p.id == pokemonId);
      defendingPokemon.value.selected = true;
      sessionStorage.setItem("defendingId", pokemonId);
      doTheCombat();

  }else{
    /** If combat has alredy happened, do nothing */
  }

}

function doTheCombat(){

  if( attackingPokemon.value.attack > defendingPokemon.value.defense ){
      resultMsg.value = attackingPokemon.value.name + " ataca i guanya a " + defendingPokemon.value.name;
  }else{
      resultMsg.value = attackingPokemon.value.name + " ataca i perd contra " + defendingPokemon.value.name;
  }

  resetButtonDisabled.value = false;

}

function resetButtonHandler(){

    attackingPokemon.value.selected = false;
    attackingPokemon.value = null;
    defendingPokemon.value.selected = false;
    defendingPokemon.value = null;

    sessionStorage.removeItem("attackingId");
    sessionStorage.removeItem("defendingId");

    resultMsg.value = "";
    resetButtonDisabled.value = "true";

}

</script>

<template>
  <main>
    <div id="pokedex-combat-instructions">Selecciona dues cartes. La primera serà el Pokemon atacant i la segona el defensor. El resultat del combat es mostrarà en la caixa just a sota d'aquestes instrucions. Per iniciar un nou combat fes clic al botó reinicia un cop finalitzat el combat actual.</div>
    <div id="pokedex-combat-controls">
        <div id="pokedex-combat-result-label">Resultat del combat: </div>
        <div id="pokedex-combat-result">{{ resultMsg }}</div>
        <button id="pokedex-combat-reset-button" 
          :disabled="resetButtonDisabled"
          @click="resetButtonHandler">Reinicia</button>
    </div>
    <PokeCombatDeck :pokemons="pokemons" @do-the-combat="doTheCombat" @update-combat-state="updateCombatState" />
  </main>
</template>

<style scoped>

#pokedex-combat-instructions {
  background-color: var(--combat-instructions-background);
  color: var(--combat-instructions-color);
  padding: 0.5em;
  font-size: larger;
}

#pokedex-combat-controls {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  background-color: var(--combat-controls-background);
  font-size: x-large;
  color: var(--combat-controls-color);
  padding: 0.5em;
}

#pokedex-combat-controls button {
  font-size: large;
}

</style>