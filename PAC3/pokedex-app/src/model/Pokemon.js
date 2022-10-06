const UNDEFINED_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/unknown.png';

export class Pokemon{
    constructor(pokemon){
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.frontImage = pokemon.sprites.front_default !== null ? pokemon.sprites.front_default : UNDEFINED_SPRITE_URL;
        this.backImage = pokemon.sprites.back_default !== null ? pokemon.sprites.back_default : UNDEFINED_SPRITE_URL;
        this.attack = pokemon.stats[1].base_stat;
        this.defense = pokemon.stats[2].base_stat;
        this.types = pokemon.types ? pokemon.types.map(poketype => poketype.type.name) : [];
        this.detailsURL = "./details?pokeID="+pokemon.id;
        this.visible = true;
    }
}