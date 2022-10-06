<script setup>
import { ref } from 'vue';
import CombatCard from '@/components/CombatCard.vue';

const emit = defineEmits(['doTheCombat', 'updateCombatState']);

const props = defineProps({
    pokemons: { type: Array, required: true }
});

function combatCardOnClickHandler(event){

    emit('updateCombatState', event.currentTarget.dataset.id);

}
 
</script>
    
<template>
  <div class="poke-deck">
    <CombatCard class="poke-deck-item" v-for="pokemon in pokemons" 
      :pokemon="pokemon"
      @click="combatCardOnClickHandler"
    ></CombatCard>
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
