const POKEDECK_MAX_COUNT = 10;
var pokeCombatDeck = new Map();

function loadTheRestOfTheCombatPage(){

    let deckDiv = document.getElementById("pokedex-deck");

    let cardList = Array.from(pokeDeck.values());

    cardList.forEach(card => {
        let cardHTMLBasicView = card.toHTMLBasicView();
        deckDiv.appendChild(cardHTMLBasicView);
    })

}

/**
 * 
 * Main script
 * 
 */

function pokedexCombatPageOnLoadHandler(){

    loadCards(loadTheRestOfTheCombatPage);
}

/**
 * Attach this script into the loaded page
 */

window.addEventListener("load", pokedexCombatPageOnLoadHandler, false);