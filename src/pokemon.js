/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import GetPokemon from './pokemon/get-pokemon';
import * as libs from './pokemon/libs';
import * as firebase from './firebase/';
import { RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        (async () => {
            try {
                const response = await fetch(libs.getRandomUrl());
                const status = response.status;
                if (status !== 200) throw new Error(response.statusText);

                const json = await response.json();
                const getPokemon = new GetPokemon(json, res.message.user.name);
                res.send(getPokemon.getSuccessRes());
                firebase.pushData(getPokemon.getSaveData());
            } catch (err) {
                res.send(RES.miss);
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
