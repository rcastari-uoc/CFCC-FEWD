<script setup>
import { ref, onMounted } from 'vue';

const availableThemes = ref([
    {id: "ts-light", value: "light", label: "Clar"},
    {id: "ts-dark", value: "dark", label: "Fosc"},
    {id: "ts-system", value: "system", label: "El mateix que el sistema"}
]);

function themeSelectorOnClickEventHandler(event){
    let inputElement = event.currentTarget.querySelector("input");
    try {
        changeThemeTo(inputElement.value);
        localStorage.setItem("pokedex-theme-value", inputElement.value);
        inputElement.checked = true;
    }catch(error){
        alert(error);
    }
}

function pokeOnSystemThemeChanged(event){
    const newColorScheme = event.matches ? "dark" : "light";
    changeThemeTo(newColorScheme);
}

function changeThemeTo(themeName){

    let bodyElementClassList = document.getElementsByTagName("body")[0].classList;

    switch(themeName){
        case "light":
            if(bodyElementClassList.contains("theme-dark")){
                bodyElementClassList.remove("theme-dark");    
            }
            // Eliminem l'escolta als canvis de tema de sistema, si s'escau
            if(window.matchMedia){
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', pokeOnSystemThemeChanged, false);
            }
            break;
        case "dark":
            if(!bodyElementClassList.contains("theme-dark")){
                bodyElementClassList.add("theme-dark")
            }
            // Eliminem l'escolta als canvis de tema de sistema, si s'escau
            if(window.matchMedia){
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', pokeOnSystemThemeChanged, false);
            }
            break;
        case "system":
            // Si el sistema suporta les MediaQueries...
            if(window.matchMedia){
                
                if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                    changeThemeTo("dark");
                }else{
                    changeThemeTo("light");
                }
                
                //afegim un listener per si l'usuari canvia les preferències del sistema
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', pokeOnSystemThemeChanged, false);

            }else{
                throw "Error - your system does not support this option!";
            }
            break;
        default:
            throw "Error - Theme not supported!";
    }
}

function loadTheme(){
    
    let previousStoredTheme = localStorage.getItem("pokedex-theme-value");

    if(!previousStoredTheme){
        previousStoredTheme = "light";
    }

    document.getElementById("ts-"+previousStoredTheme).checked = true;
    changeThemeTo(previousStoredTheme);
    
}

onMounted(() => {
    loadTheme();
});

</script>

<template>
    <div id="themeSelector">
        <legend>Escull el tema de visualització:</legend>
        <div class="ts-item" @click="themeSelectorOnClickEventHandler" v-for="theme in availableThemes">
            <input type="radio" name="themeSelector" v-bind:id="theme.id" v-bind:value="theme.value" />
            <label v-bind:for="theme.value">{{theme.label}}</label>                
        </div>
    </div>
</template>

<style scoped>
#themeSelector {
  display: flex;
}

#themeSelector > legend, #themeSelector .ts-item {
  padding: 0.5em;
}

#themeSelector > legend {
  font-weight: bold;
}

#themeSelector .ts-item {
    display: flex;
    gap: 0.25em;
}

#themeSelector .ts-item:hover {
    background-color: var(--navbar-selectedTab-background);
    cursor: pointer;
}

#themeSelector .ts-item > input:hover, #themeSelector .ts-item > label:hover {
    cursor: inherit;
}
</style>