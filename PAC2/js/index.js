const POKEDECK_MAX_COUNT = 10;
var pokeDeck = new Map();

function loadCards(callbackFn){

    let stringifiedCardList = sessionStorage.getItem("pokeDeck");

    if(stringifiedCardList){

        let rawCardList = JSON.parse(stringifiedCardList);

        cardList = rawCardList.map(object => {

            let o = object[1];

            return new PokeCard({
                id: o.id,
                name: o.name,
                sprites: { front_default: o.frontImage, back_default: o.backImage },
                stats: [ null, {base_stat: o.attack}, {base_stat: o.defense} ],
                types: o.types
            });

        })

        cardList.forEach(card => {
            pokeDeck.set(card.id, card);
        });

        loadTheRestOfTheIndexPage();

    }else{
        fetchCards(callbackFn);
    }

}

function loadTheRestOfTheIndexPage(){

    let deckDiv = document.getElementById("pokedex-deck");

    let cardList = Array.from(pokeDeck.values());

    cardList.forEach(card => {
        let cardHTMLBasicView = card.toHTMLBasicView();
        deckDiv.appendChild(cardHTMLBasicView);
    })

}

function filterInputEventHandler(event){

    let inputText = String(event.target.value).toLowerCase();

    let cardElements = Array.from(document.getElementById("pokedex-deck").children);
    
    cardElements.forEach(pokecardElement => {
        pokecardElement.classList.remove("hidden");
        let pokeCardName = String(pokeDeck.get(parseInt(pokecardElement.dataset.id)).name);
        if(!pokeCardName.includes(inputText)){
            pokecardElement.classList.add("hidden");
        }
    });

}

function clearFilterEventHandler(event){
    document.getElementById("pokedex-filter").value = "";
    let cardElements = Array.from(document.getElementById("pokedex-deck").children);
    cardElements.forEach(pokecardElement => pokecardElement.classList.remove("hidden"));
}

/**
 * 
 * Main script
 * 
 */

 function pokedexIndexPageOnLoadHandler(){

    let params = new URLSearchParams(document.location.search);
    let pokeIDParam = params.get("pokeID");
    if (pokeIDParam) {
        loadCards();
        let pokeCard = pokeDeck.get(parseInt(pokeIDParam)).toHTMLAdvancedView();
        let deckContainerDiv = document.getElementById("pokedex-deck-container");
        let detailsContainerDiv = document.getElementById("pokedex-pokemon-details-container");
        let detailedInfoDiv = document.getElementById("pokedex-pokemon-details");
        detailedInfoDiv.innerHTML="";
        detailedInfoDiv.appendChild(pokeCard);
        deckContainerDiv.classList.add("hidden");
        detailsContainerDiv.classList.remove("hidden");
    }else{
        loadCards(loadTheRestOfTheIndexPage);
        document.getElementById("pokedex-filter").addEventListener("input", filterInputEventHandler, false);
        document.getElementById("pokedex-clear-filter").addEventListener("click", clearFilterEventHandler, false);
    }

}

/**
 * Attach this script into the loaded page
 */

window.addEventListener("load", pokedexIndexPageOnLoadHandler, false);