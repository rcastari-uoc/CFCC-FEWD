// comentari: molt bona feina amb la selecció de theme, especialment el treball amb el sistema de mediaqueries natives segons sistema operatiu
function loadTheme(){
    
    let previousStoredTheme = localStorage.getItem("pokedex-theme-value");

    if(previousStoredTheme){
        document.getElementById("ts-"+previousStoredTheme).checked = true;
        changeThemeTo(previousStoredTheme);
    }

}

function changeThemeTo(themeName){

    let becl = document.getElementsByTagName("body")[0].classList;
    
    switch(themeName){
        case "light":
            if(becl.contains("theme-dark")){
                becl.remove("theme-dark");    
            }
            // Eliminem l'escolta als canvis de tema de sistema, si s'escau
            if(window.matchMedia){
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', pokedexOnSystemThemeChanged, false);
            }
            break;
        case "dark":
            if(!becl.contains("theme-dark")){
                becl.add("theme-dark")
            }
            // Eliminem l'escolta als canvis de tema de sistema, si s'escau
            if(window.matchMedia){
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', pokedexOnSystemThemeChanged, false);
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
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', pokedexOnSystemThemeChanged, false);

            }else{
                throw "Error - your system does not support this option!";
            }
            break;
        default:
            throw "Error - Theme not supported!";
    }
}

/**
 * Event Handlers
 */

function pokedexOnThemeSelected(event){

    let target = event.target;

    try {
        changeThemeTo(target.value);
        localStorage.setItem("pokedex-theme-value", target.value);
    }catch(error){
        alert(error);
    }

}

function pokedexOnSystemThemeChanged(event){
    const newColorScheme = event.matches ? "dark" : "light";
    changeThemeTo(newColorScheme);
}

/**
 * 
 * Main script
 * 
 */

function pokedexPageOnLoadHandler(){
    
    loadTheme();

    document.getElementById("themeSelector").addEventListener("change", pokedexOnThemeSelected, false);

}

/**
 * Attach this script into the loaded page
 */

window.addEventListener("load", pokedexPageOnLoadHandler, false);