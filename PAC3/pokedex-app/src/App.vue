<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ThemeSelector from './components/ThemeSelector.vue';

</script>

<template>
  <header>
    
    <div class="header-content">
      <h1>Curs Front End Web developer CFCC - UOC</h1>
      <h2>PAC2 - Pokedex</h2>
      <h3>Alumne: Rafel Castaño Ribes</h3>
    </div>
    
    <div class="header-wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/combat">Combat</RouterLink>
      </nav>

      <ThemeSelector />
    </div>

  </header>

  <RouterView />

</template>

<style scoped>

header {
  background-color: var(--header-background);
  color: var(--header-color);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.header-content > * {
  margin: 0em;
  padding: 0.25em 0.5em;
}

.header-wrapper {
  background-color: var(--menu-background);
  display: flex;
  justify-content: space-between;
  font-size: larger;
}

.header-wrapper > nav {
  display: flex;
}

.router-link-active {
  background-color: hsla(160, 100%, 37%, 0.2);
}

</style>
