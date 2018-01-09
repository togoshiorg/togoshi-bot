// @flow

interface RequestApi {
    constructor (): RequestApi;
    request (num: number): Object;
};

interface Database {
    constructor (): Database;
    push (data: Object): void;
    getLength (): Object;
    getLengthEqualTo (key: string, value: any): Object;
    getLengthGreaterThan (key: string, value: any): Object;
};

interface GetObject {
    constructor (Request: Class<RequestApi>, user: string): GetObject;
    getRandom (): Object;
    pushData (Database: Class<Database>): void;
    static GO_RES: string;
    static GET_ERROR_RES: string;
    static PUSH_ERROR_RES: string;
    static TIME_FORMAT: string;
};

interface RefObject {
    constructor (Database: Class<Database>): RefObject;
    getLengthTotal (): Object;
    getLengthByName (name: string): Object;
    getLengthByUser (user: string): Object;
    getLengthGreaterThanCp (cp: number): Object;
    getLengthIsShiny (): Object;
    static REF_ERROR_RES: string;
};

interface PokemonImg {
    constructor (object: Object): PokemonImg;
    getImgPath (): string;
};

interface PokemonObj {
    constructor (object: Object): PokemonObj;
    getId (): number;
    getIsShiny (): boolean;
    getStrengthLv (): string;
    getCp (): number;
    getName (): string;
    getImg (): string;
}
