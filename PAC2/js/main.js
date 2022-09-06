const DECK_MAX_COUNT = 10;

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

    toHTMLMinimalView(templateRef){
        
        let cardTemplate = document.querySelector(templateRef);

        let cardElement = cardTemplate.cloneNode(true);

        cardElement.dataset.id = this.id;

        cardElement.querySelector(".poke-name").appendChild(document.createTextNode(this.name));
        cardElement.querySelector(".poke-front-image").src = this.frontImage;
        cardElement.querySelector(".poke-front-image").alt = this.frontImage;
        cardElement.querySelector(".poke-attack").appendChild(document.createTextNode(this.attack));
        cardElement.querySelector(".poke-defense").appendChild(document.createTextNode(this.defense));

        return cardElement;
    }

    toHTMLBasicView(){

        let cardElement = this.toHTMLMinimalView("#pokedex-html-templates>div.poke-card");
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

    toHTMLCombatView(){
        return this.toHTMLMinimalView("#pokedex-html-templates>div.poke-combat-card");
    }

}

function loadCards(globalVarToUse, sessionStorageKey = "pokeDeck", callbackFn){

    let stringifiedCardList = sessionStorage.getItem(sessionStorageKey);

    if(stringifiedCardList){

        let rawCardList = JSON.parse(stringifiedCardList);

        let cardList = rawCardList.map(object => {

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
            globalVarToUse.set(card.id, card);
        });

        if(callbackFn){
            callbackFn();
        }

    }else{
        fetchCards(globalVarToUse, sessionStorageKey, callbackFn);
    }

}

function fetchCards(globalVarToUse, sessionStorageKey = "pokeDeck", callbackFn){

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1')
        .then(response => response.json()).then(data => {
            
            let maxPokemonNumber = data.count;

            let pokemonNumberList = [];

            for(let n = 0; n < DECK_MAX_COUNT; n++){
                
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

                            globalVarToUse.set(data.id, new PokeCard(data));

                            if(globalVarToUse.size == DECK_MAX_COUNT){

                                // Save the Deck in the Session Storage object

                                sessionStorage.setItem(sessionStorageKey, JSON.stringify(Array.from(globalVarToUse.entries())));

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