/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import * as libs from './pokemon/libs';
import * as firebase from './firebase/';
import { MAX, RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        const user = res.message.user.name;
        const randomUrl = libs.getRandomUrl(MAX);
        const isShiny = libs.isShiny();

        (async () => {
            try {
                const response = await fetch(randomUrl);

                const status = response.status;
                if (status !== 200) res.send(RES.miss);

                const json = await response.json();
                const pokeData = libs.getPokeData(json, isShiny);
                res.send(libs.getSuccessRes(pokeData));
                res.send(libs.getShinyRes(isShiny));
                res.send(libs.evalPokeCpRes(pokeData.cp));

                const saveData = libs.getSaveData(pokeData, user, isShiny);
                firebase.pushData(saveData);
            } catch (err) {
                res.send(err);
            }
        })();
    });
    robot.respond(/zukan pokemon/, (res) => {
        firebase.readLength()
            .then(length => {
                res.send(libs.getLengthRes(length));
            });
    });
};
