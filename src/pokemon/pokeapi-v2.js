// @flow

import fetch from 'node-fetch';

// API path
const PATH: string = 'http://pokeapi.co/api/v2/pokemon/';

export default class PokeapiV2 {
    async request (num: number): Object {
        if (num == null) throw new Error('Invalid request argument.');
        const response = await fetch(`${PATH}${num}/`);
        if (response.status !== 200) throw new Error(response.statusText);
        const data = response.json();
        return data;
    }
}
