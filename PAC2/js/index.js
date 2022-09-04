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

        let cardTemplate = document.querySelector("#pokedex-html-templates>div.poke-card");

        let cardElement = cardTemplate.cloneNode(true);

        cardElement.dataset.id = this.id;

        cardElement.querySelector(".poke-name").appendChild(document.createTextNode(this.name));
        cardElement.querySelector(".poke-front-image").src = this.frontImage;
        cardElement.querySelector(".poke-front-image").alt = this.frontImage;
        cardElement.querySelector(".poke-attack").appendChild(document.createTextNode(this.attack));
        cardElement.querySelector(".poke-defense").appendChild(document.createTextNode(this.defense));
        cardElement.querySelector(".poke-more-details").href = "index.html?pokeID="+this.id;

        return cardElement;

    }

    toHTMLAdvancedView(){

        let cardTemplate = document.querySelector("#pokedex-html-templates>div.poke-card-details");

        let cardElement = cardTemplate.cloneNode(true);

        cardElement.dataset.id = this.id;

        cardElement.querySelector(".poke-name").appendChild(document.createTextNode(this.name));
        cardElement.querySelector(".poke-front-image").src = this.frontImage;
        cardElement.querySelector(".poke-front-image").alt = this.frontImage;
        cardElement.querySelector(".poke-back-image").src = this.backImage;
        cardElement.querySelector(".poke-back-image").alt = this.backImage;
        cardElement.querySelector(".poke-attack").appendChild(document.createTextNode(this.attack));
        cardElement.querySelector(".poke-defense").appendChild(document.createTextNode(this.defense));
        
        let typesULElement = cardElement.querySelector(".poke-types-values > ul");

        this.types.forEach(pokeType => {
            let typeLIElement = document.createElement("li");
            typeLIElement.appendChild(document.createTextNode(pokeType.type.name));
            typesULElement.appendChild(typeLIElement);
        });

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
        let detailedInfoDiv = document.getElementById("pokedex-pokemon-detailed-info");
        detailedInfoDiv.innerHTML="";
        detailedInfoDiv.appendChild(pokeCard);
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