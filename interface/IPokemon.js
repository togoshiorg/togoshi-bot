// @flow

interface PokemonImg {
    constructor (object: Object): PokemonImg;
    getImgPath (): string;
};

interface PokemonObj {
    constructor (object: Object, PokemonImg: Class<PokemonImg>): PokemonObj;
    getId (): number;
    getIsShiny (): boolean;
    getStrengthLv (): string;
    getCp (): number;
    getName (): string;
    getImg (): string;
}
