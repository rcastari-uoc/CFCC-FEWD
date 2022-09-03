const POKEDECK_MAX_COUNT = 10;
var pokeDeck = new Map();

class PokeCard{
    constructor(pokemon){
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.frontImage = pokemon.sprites.front_default;
        this.backImage = pokemon.sprites.back_default;
        this.attack = pokemon.stats[1].base_stat;
        this.defense = pokemon.stats[2].base_stat;
        this.types = pokemon.types;
    }

    toHTMLBasicView(){

        let cardElement = document.createElement("div");
        cardElement.classList.add("poke-card");
        cardElement.dataset.id = this.id;
        
        let nameElement = document.createElement("div");
        nameElement.classList.add("poke-name");
        nameElement.appendChild(document.createTextNode(this.name));

        let frontImageElement = document.createElement("img");
        frontImageElement.classList.add("poke-front-image");
        frontImageElement.src = this.frontImage;
        frontImageElement.alt = this.frontImage;

        let attackLabelElement = document.createElement("div");
        attackLabelElement.classList.add("poke-attack-label");
        attackLabelElement.classList.add("poke-stats-label");
        attackLabelElement.appendChild(document.createTextNode("ATTACK"));

        let attackElement = document.createElement("div");
        attackElement.classList.add("poke-attack");
        attackElement.classList.add("poke-stats-value");
        attackElement.appendChild(document.createTextNode(this.attack));

        let defenseLabelElement = document.createElement("div");
        defenseLabelElement.classList.add("poke-defense-label");
        defenseLabelElement.classList.add("poke-stats-label");
        defenseLabelElement.appendChild(document.createTextNode("DEFENSE"));

        let defenseElement = document.createElement("div");
        defenseElement.classList.add("poke-defense");
        attackElement.classList.add("poke-stats-value");
        defenseElement.appendChild(document.createTextNode(this.defense));

        let moreDetailsElement = document.createElement("a");
        moreDetailsElement.classList.add("poke-more-details");
        moreDetailsElement.href = "index.html?pokeID="+this.id;
        moreDetailsElement.target = "_self";
        moreDetailsElement.appendChild(document.createTextNode("més info"));

        cardElement.appendChild(nameElement);
        cardElement.appendChild(frontImageElement);
        cardElement.appendChild(attackLabelElement);
        cardElement.appendChild(attackElement);
        cardElement.appendChild(defenseLabelElement);
        cardElement.appendChild(defenseElement);
        cardElement.appendChild(moreDetailsElement);

        return cardElement;

    }

    toHTMLAdvancedView(){

        let cardElement = this.toHTMLBasicView();

        let backImageElement = document.createElement("img");
        backImageElement.classList.add("poke-back-image");
        backImageElement.src = this.backImage;
        backImageElement.alt = this.backImage;

        let typesElement = document.createElement("div");
        typesElement.classList.add("poke-types-container");
        let typesULElement = document.createElement("ul");
        this.types.forEach(pokeType => {
            let typeLIElement = document.createElement("li");
            typeLIElement.appendChild(document.createTextNode(pokeType.type.name));
            typesULElement.appendChild(typeLIElement);
        });
        typesElement.appendChild(typesULElement);

        cardElement.appendChild(backImageElement);
        cardElement.appendChild(typesElement);

        return cardElement;

    }

}

function loadCards(){

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
        fetchCards();
    }

}


function fetchCards(callbackFn){

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1')
        .then(response => response.json()).then(data => {
            
            let maxPokemonNumber = data.count;

            let pokemonNumberList = [];

            for(let n = 0; n < POKEDECK_MAX_COUNT; n++){
                
                let candidateNumber = Math.floor(maxPokemonNumber * Math.random());

                while(pokemonNumberList.includes(candidateNumber)){

                    candidateNumber = Math.floor(maxPokemonNumber * Math.random());
                    
                }

                pokemonNumberList.push(candidateNumber);

            }

            pokemonNumberList.forEach(pokemonNumber => {

                fetch('https://pokeapi.co/api/v2/pokemon/?offset='+pokemonNumber+'&limit=1')
                    .then(response => response.json()).then(data => {

                        let pokeURL = data.results[0].url;

                        fetch(pokeURL).then(response => response.json()).then(data=>{
                        
                            pokeDeck.set(data.id, new PokeCard(data));

                            if(pokeDeck.size == POKEDECK_MAX_COUNT){

                                // Save the Deck in the Session Storage object

                                sessionStorage.setItem("pokeDeck", JSON.stringify(Array.from(pokeDeck.entries())));

                                if(callbackFn){
                                    callbackFn();
                                }

                            }
                        
                        }).catch(console.error);

                    }).catch(error => {
                        
                        console.log(error);

                        /**@TODO Try to load another pokemon, then remove the exception below*/

                        throw "a fatal error has occurred loading your deck, try to reload this page to generate a new deck";

                    });

            });

        }).catch(console.error);

}


function loadTheRestOfTheIndexPage(){

    let deckDiv = document.getElementById("pokedex-deck");

    let cardItemList = Array.from(pokeDeck.values());

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

 function pokedexIndexPageOnLoadHandler(){

    let params = new URLSearchParams(document.location.search);
    let pokeIDParam = params.get("pokeID");
    if (pokeIDParam) {
        loadCards();
        let pokeCard = pokeDeck.get(parseInt(pokeIDParam)).toHTMLAdvancedView();
        let deckDiv = document.getElementById("pokedex-deck");
        let detailsDiv = document.getElementById("pokedex-pokemon-details");
        detailsDiv.innerHTML="";
        detailsDiv.appendChild(pokeCard);
        deckDiv.classList.add("hidden");
        detailsDiv.classList.remove("hidden");
    }else{
        loadCards(loadTheRestOfTheIndexPage);
    }

}

/**
 * Attach this script into the loaded page
 */

window.addEventListener("load", pokedexIndexPageOnLoadHandler, false);