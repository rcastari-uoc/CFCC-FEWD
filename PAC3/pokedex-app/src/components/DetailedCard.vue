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
        <div class="poke-sprites">
            <img class="poke-front-image" v-bind:src="pokemon.frontImage" v-bind:alt="pokemon.frontImage"/>
            <img class="poke-back-image" v-bind:src="pokemon.backImage" v-bind:alt="pokemon.backImage"/>
        </div>
        <div class="poke-stats">
            <div class="poke-stats-item poke-attack">
                <div class="poke-stats-label">ATAC</div>
                <div class="poke-stats-value">{{pokemon.attack}}</div>
            </div>
            <div class="poke-stats-item poke-defense">
                <div class="poke-stats-label">DEFENSA</div>
                <div class="poke-stats-value">{{pokemon.defense}}</div>
            </div>
        </div>
        <div class="poke-types">
          <p class="poke-types-label">TIPUS</p>
          <ul class="poke-types-list">
              <li v-for="poketype in pokemon.types">{{poketype}}</li>
          </ul>
        </div>
    </div>

</template>

<style scoped>

div.poke-card {
  width: 24em;
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

.poke-card .poke-sprites {
  display: flex;
  justify-content: space-evenly;
}

.poke-card .poke-sprites img {
  justify-self: stretch;
  width: 100%;
}

.poke-card .poke-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.poke-card .poke-stats-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 0.2em solid var(--card-border-color);
  border-bottom: 0.2em solid var(--card-border-color);
}
.poke-card .poke-stats-item:first-child {
  border-right: 0.2em solid var(--card-border-color);
}


.poke-card .poke-stats-item > div {
  width: 100%;
}

.poke-card .poke-stats-label, .poke-card .poke-types-label  {
  font-size: small;
  font-weight: bold;
  background-color: var(--card-label-background);
}

.poke-card .poke-stats-value {
  font-size: medium;
  font-weight: bold;
}

.poke-card .poke-types-list {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0;
}

.poke-card .poke-types-list li {
  justify-self: stretch;
  flex: 1;
  font-weight: bold;
}
    
</style>