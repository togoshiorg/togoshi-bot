// @flow

import fetch from 'node-fetch';

export default class PokeapiV2 {
    async request (num: number): Object {
        let data = {};
        const response = await fetch(`${PokeapiV2.getUrl()}${num}/`);
        if (response.status !== 200) throw new Error(response.statusText);
        data = await response.json();
        return data;
    }

    static getUrl (): string {
        return 'http://pokeapi.co/api/v2/pokemon/';
    }
}
