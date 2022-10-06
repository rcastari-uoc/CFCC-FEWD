<script setup>

import { ref } from 'vue';

const emit = defineEmits(['pokeFilterEvent']);

const pokeNameTest = ref("");

function filterInputEventHandler(event){
    emit('pokeFilterEvent', String(pokeNameTest.value).toLowerCase());
}

function clearFilterEventHandler(event){
    pokeNameTest.value = "";
    emit('pokeFilterEvent', "");
}

</script>

<template>

    <div id="pokedex-filter-container">
        <label for="pokedex-filter">Filtrar per nom: </label>
        <input id="pokedex-filter" type="search" name="pokedex-filter" v-model="pokeNameTest" @input="filterInputEventHandler"/>
        <button id="pokedex-clear-filter" @click="clearFilterEventHandler">Netejar filtre</button>
    </div>

</template>

<style scoped>

#pokedex-filter-container {
    display: flex;
    justify-content: center;
    gap: 1em;
    font-size: x-large;
    padding: 0.5em;
}

#pokedex-filter-container input {
    width: 20em;
    font-size: x-large;
}

#pokedex-filter-container button {
    font-size: large;
}

</style>