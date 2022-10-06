<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router'
    import DetailedCard from '../components/DetailedCard.vue';

    const props = defineProps({
        id: {type: String, required: true}
    });

    let pokemons = JSON.parse(sessionStorage.getItem("pokemonsViewList"));

    const pokemon = ref(pokemons.find( p => p.id === parseInt(props.id) ));

</script>

<template>

    <div class="details-container">
        <DetailedCard :pokemon="pokemon" />
        <RouterLink class="button" to="/">Tornar a la pàgina principal</RouterLink>
    </div>
        
</template>

<style scoped>

.details-container {
    padding: 1em;
    display: flex;
    gap: 1em;
    flex-direction: column;
    align-items: center;
}

</style>