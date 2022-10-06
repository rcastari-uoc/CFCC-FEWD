<script setup>

import { ref } from 'vue';

const props = defineProps({
  pokemon: {type: Object,  required: true}
})

const pokemon = ref(props.pokemon);

</script>

<template>
    <div class="poke-card" v-bind:data-id="pokemon.id" :class="{ selected: pokemon.selected }">
        <div class="poke-card-content">
            <div class="poke-card-front">
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
            </div>
            <div class="poke-card-back"></div>
        </div>      
    </div>

</template>

<style scoped>

.poke-card {
  width: 12em;
  height: 18em;
}

.poke-card-front {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:flex-end;
  text-align: center;
  background-color: var(--card-background-color);
  color: var(--card-color);
}

.poke-name {
  flex: 1;
  font-weight: bold;
  font-size: large;
  background-color: var(--card-label-background);
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.poke-stats {
  display: flex;
  flex-direction: column;
}

.poke-stats-item {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.poke-stats-item > div {
  width: 100%;
}

.poke-stats-label {
  font-size: small;
  font-weight: bold;
}

.poke-stats-value {
  font-size: medium;
  font-weight: bold;
}

.poke-card {
  background-color: transparent;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  cursor: pointer;
}

.poke-card-content {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform-origin: 5.5em;
}

.selected .poke-card-content {
  transform: rotateY(180deg);
}

.poke-card-front, .poke-card-back {
  position: absolute;
  --webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 0.5em solid var(--card-border-color);
  border-radius: 1em;
}

.poke-card-front {
  transform: rotateY(180deg);
}

.poke-card-back {
  width: 100%;
  height: 100%;
  border-radius: 1em;
  background: repeating-linear-gradient(-45deg, var(--card-background-color), var(--card-background-color) 1em, var(--card-label-background) 1em, var(--card-label-background) 2em);
}

.poke-card-content:hover .poke-card-back {
  background: repeating-linear-gradient(-45deg, var(--card-label-background), var(--card-label-background) 1em, var(--card-color) 1em, var(--card-color) 2em);
}

</style>