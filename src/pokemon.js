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
        // 入力値に数値が付与されていたら処理しない
        const input = res.message.text;
        const resMention = '@togoshi-bot zukan pokemon';
        const resDirect = 'togoshi-bot zukan pokemon';
        if (input !== resMention && input !== resDirect) return false;

        firebase.readLength()
            .then(length => {
                res.send(libs.getLengthRes(length));
            });
    });
    robot.respond(/zukan pokemon (.*)/, (res) => {
        const name = res.match[1];
        firebase.readLengthName(name)
            .then(length => {
                res.send(libs.getLengthNameRes(length, name));
            });
    });
    robot.respond(/user pokemon (.*)/, (res) => {
        const user = res.match[1];
        firebase.equalUser(user)
            .then(length => {
                if (length === 0) return false;
                res.send(libs.getLengthUserRes(length, user));
            });
    });
    robot.respond(/overcp pokemon (.*)/, (res) => {
        const selectCp = parseInt(res.match[1]);
        firebase.overCp(selectCp)
            .then(length => {
                res.send(libs.getLengthOvercpRes(length, selectCp));
            });
    });
    robot.respond(/shiny pokemon/, (res) => {
        firebase.equalShiny()
            .then(length => {
                res.send(libs.getLengthShinyRes(length));
            });
    });

    // Help Command
    robot.respond(/h pokemon/, (res) => {
        res.send(RES.help);
    });
};
