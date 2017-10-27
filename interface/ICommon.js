// @flow

// get-pokemon.js
interface GetObject {
    constructor (): GetObject;
    getRandom (): Object;
    getSaveData (): Object;
    static GO_RES: string;
    static ERROR_RES: string;
};

// pokeapi-v2.js
interface RequestApi {
    constructor (): RequestApi;
    request (num: number): Object;
};
