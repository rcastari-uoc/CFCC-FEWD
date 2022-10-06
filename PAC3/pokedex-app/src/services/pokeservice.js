import axios from "axios";
import { Pokemon } from '@/model/Pokemon.js';

const pokeAPI = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    
    getRandPokemons(count) {
        return pokeAPI.get("/pokemon")
        .then(response =>{
            let maxPokemonNumber = response.data.count;
            let pokemonNumberList = [];
            for(let n = 0; n < count; n++){
                let candidateNumber = Math.floor(maxPokemonNumber * Math.random());
                while(pokemonNumberList.includes(candidateNumber)){
                    candidateNumber = Math.floor(maxPokemonNumber * Math.random());   
                }
                pokemonNumberList.push(candidateNumber);
            }
            let pokemonPromises = [];
            pokemonNumberList.forEach(pokemonNumber => {
                pokemonPromises.push(pokeAPI.get('/pokemon/?offset='+pokemonNumber+'&limit=1'));
            });
            return Promise.all(pokemonPromises).then(responses => {
                let pokemonDetailsPromises=[];
                responses.forEach(response => {
                    let pokemonId = response.data.results[0].url.match(/(?<=\/)\d+(?=\/$)/);
                    pokemonDetailsPromises.push(pokeAPI.get('/pokemon/'+pokemonId+'/'));
                });
                
                return Promise.all(pokemonDetailsPromises).then(responses => {
                    let pokemonList = responses.map(response =>{
                        let pokemon = new Pokemon (response.data);
                        return pokemon;
                    });
                    return pokemonList;
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        })
    },    
};