<script setup>

import { ref } from 'vue';

const props = defineProps({
    pokemon: {type: Object, required: true},
});

const pokemon = ref(props.pokemon);

</script>

<template>
    <div class="poke-card">
        <div class="poke-name">{{pokemon.name}}</div>
        <img class="poke-front-image" v-bind:src="pokemon.frontImage" v-bind:alt="pokemon.frontImage"/>
        <div class="poke-stats">
            <div class="poke-stats-item poke-attack">
                <div class="poke-stats-label">ATAC:</div>
                <div class="poke-stats-value">{{pokemon.attack}}</div>
            </div>
            <div class="poke-stats-item poke-defense">
                <div class="poke-stats-label">DEFENSA:</div>
                <div class="poke-stats-value">{{pokemon.defense}}</div>
            </div>
        </div>
        <a class="poke-more-details" v-bind:href="pokemon.detailsURL" target="_self">Més informació</a>
    </div>
</template>

<style scoped>

div.poke-card {
  width: 12em;
  display: flex;
  flex-direction: column;
  justify-content:flex-end;
  text-align: center;
  background-color: var(--card-background-color);
  color: var(--card-color);
  border: 0.5em solid var(--card-border-color);
  border-radius: 1em;
}

.poke-card .poke-name {
  flex: 1;
  font-weight: bold;
  font-size: large;
  background-color: var(--card-label-background);
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.poke-card .poke-stats {
  display: flex;
  flex-direction: column;
}
.poke-card .poke-stats-item {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.poke-card .poke-stats-item > div {
  width: 100%;
}

.poke-card .poke-stats-label {
  font-size: small;
  font-weight: bold;
}

.poke-card .poke-stats-value {
  font-size: medium;
  font-weight: bold;
}

.poke-card .poke-more-details {
  font-weight: bold;
  text-decoration: none;
  color: var(--card-color);
  background-color: var(--card-label-background);
  border-top: 3px solid #CCC;
  border-right: 3px solid #333;
  border-bottom: 3px solid #333;
  border-left: 3px solid #CCC;
}

.poke-card .poke-more-details:hover {
  background-color: hsla(160, 100%, 37%, 0.2);  
}
    
</style>