/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import fetch from 'node-fetch';
import translateData from '../data/pokemon.json';
import * as libs from './pokemon/libs';
import { MAX, RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        const randomUrl = libs.getRandomUrl(MAX);
        fetch(randomUrl)
            .then(response => {
                if (response.status !== 200) res.send(RES.miss);
                return response.json();
            })
            .then(json => {
                const pokeData = libs.getPokeData(json);
                res.send(libs.getSuccessRes(pokeData));
                res.send(libs.evalPokeCpRes(pokeData.cp));
            })
            .catch(err => {
                throw new Error('API response is invalid');
                res.send(RES.miss);
            });
    });
}