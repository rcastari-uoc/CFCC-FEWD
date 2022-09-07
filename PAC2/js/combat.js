var combatDeck = new Map();

function loadTheRestOfTheCombatPage(isNewDeck = false){

    let deckDiv = document.getElementById("pokedex-deck");

    let cardList = Array.from(combatDeck.values());

    cardList.forEach(card => {
        let cardHTMLCombatView = card.toHTMLCombatView();
        deckDiv.appendChild(cardHTMLCombatView);
        cardHTMLCombatView.addEventListener("click", combatCardOnClickHandler, false);
    });

    if(isNewDeck){
        sessionStorage.removeItem("attackingId");
        sessionStorage.removeItem("defendingId");
    }else{
        let attackingId = sessionStorage.getItem("attackingId");
        let defendingId = sessionStorage.getItem("defendingId");

        if(attackingId !== null){
            document.querySelector("div.poke-combat-card[data-id='"+attackingId+"']").classList.add("selected");
        }
        
        if(defendingId !== null){
            document.querySelector("div.poke-combat-card[data-id='"+defendingId+"']").classList.add("selected");
        }

        if(attackingId !== null && defendingId !== null){
            doTheCombat(attackingId, defendingId);
        }
        
    }

}

function doTheCombat(attackingId, defendingId){
    let attackingPokemon = combatDeck.get(parseInt(attackingId));
    let defendingPokemon = combatDeck.get(parseInt(defendingId));
    let resultMsg = undefined;

    if(attackingPokemon.attack > defendingPokemon.defense){
        resultMsg = attackingPokemon.name + " ataca i guanya a " + defendingPokemon.name;
    }else{
        resultMsg = attackingPokemon.name + " ataca i perd contra " + defendingPokemon.name;
    }

    let resultMsgDiv = document.getElementById("pokedex-combat-result");
    resultMsgDiv.innerHTML = resultMsg;

    document.getElementById("pokedex-combat-reset-button").disabled = false;
    document.getElementById("pokedex-combat-reset-button").addEventListener("click", resetButtonHandler, false);

}

function resetButtonHandler(){
    let attackingId = sessionStorage.getItem("attackingId");
    let defendingId = sessionStorage.getItem("defendingId");

    document.querySelector("div.poke-combat-card[data-id='"+attackingId+"']").classList.remove("selected");
    document.querySelector("div.poke-combat-card[data-id='"+defendingId+"']").classList.remove("selected");

    document.getElementById("pokedex-combat-result").innerHTML = "";

    let resetButton = document.getElementById("pokedex-combat-reset-button");
    resetButton.disabled = true;
    resetButton.removeEventListener("click", resetButtonHandler, false);

    sessionStorage.removeItem("attackingId");
    sessionStorage.removeItem("defendingId");
}

function combatCardOnClickHandler(event){

    let attackingId = sessionStorage.getItem("attackingId");
    let defendingId = sessionStorage.getItem("defendingId");

    if(attackingId === null){

        event.currentTarget.classList.add("selected");
        sessionStorage.setItem("attackingId", event.currentTarget.dataset.id);

    }else if(defendingId === null){

        event.currentTarget.classList.add("selected");
        defendingId = event.currentTarget.dataset.id;
        sessionStorage.setItem("defendingId", defendingId);

        doTheCombat(attackingId, defendingId);

    }else{
        /** If combat has alredy happened, do nothing */
    }
    
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