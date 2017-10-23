// @flow

import fetch from 'node-fetch';

// API path
const PATH: string = 'http://pokeapi.co/api/v2/pokemon/';

export default class PokeapiV2 {
    async request (num: number): Object {
        let data = {};
        const response = await fetch(`${PATH}${num}/`);
        if (response.status !== 200) throw new Error(response.statusText);
        data = await response.json();
        return data;
    }
}
