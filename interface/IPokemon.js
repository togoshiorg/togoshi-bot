// @flow

// pokemon.js
interface PokemonObj {
    constructor (): PokemonObj;
    getId (): number;
    getIsShiny (): boolean;
    getStrengthLv (): string;
    getCp (): number;
    getDispName (): string;
    getImg (): string;
}

// pokestadium.js
interface PokemonImg {
    constructor (object: Object): PokemonImg;
    getImgPath (): string;
};
