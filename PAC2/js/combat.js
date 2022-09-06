var combatDeck = new Map();

function loadTheRestOfTheCombatPage(){

    let deckDiv = document.getElementById("pokedex-deck");

    let cardList = Array.from(combatDeck.values());

    cardList.forEach(card => {
        let cardHTMLCombatView = card.toHTMLCombatView();
        deckDiv.appendChild(cardHTMLCombatView);
    })

}

/**
 * 
 * Main script
 * 
 */

function pokedexCombatPageOnLoadHandler(){

    loadCards(combatDeck, "combatDeck", loadTheRestOfTheCombatPage);
}

/**
 * Attach this script into the loaded page
 */

window.addEventListener("load", pokedexCombatPageOnLoadHandler, false);