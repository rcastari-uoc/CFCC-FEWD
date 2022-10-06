<script setup>

import Card from '@/components/Card.vue';

const props = defineProps({
  pokemons: { type: Array, required: true }
});
 
</script>
    
<template>
  <div class="poke-deck">
    <Card class="poke-deck-item" v-for="pokemon in pokemons.filter(o => o.visible)"
      :pokemon="pokemon"
    ></Card>
  </div>
</template>

<style scoped>
  .poke-deck {
    padding: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    gap: 0.5em;
    justify-content: space-evenly;
  } 
</style>
