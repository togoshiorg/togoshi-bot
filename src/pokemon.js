/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

const request = require('request');
import translateData from '../data/pokemon.json';
import * as libs from './pokemon/libs';
import { MAX, RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        const randomUrl = libs.getRandomUrl(MAX);

        request.get({ url: randomUrl, json: true }, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = libs.getPokeData(body);

                res.send(libs.getSuccessRes(pokeData));
                res.send(libs.evalPokeCpRes(pokeData.cp));
            } else {
                res.send(RES.miss);
            }
        })
    });
}