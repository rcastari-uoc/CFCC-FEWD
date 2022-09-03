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
            break;
        case "dark":
            if(!becl.contains("theme-dark")){
                becl.add("theme-dark")
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
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                    const newColorScheme = event.matches ? "dark" : "light";
                    changeThemeTo(newColorScheme);
                });

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