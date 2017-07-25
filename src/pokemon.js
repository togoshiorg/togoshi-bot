/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import Libs from './pokemon/libs';
import * as firebase from './firebase/';
import { RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        (async () => {
            try {
                const response = await fetch(Libs.getRandomUrl());

                const status = response.status;
                if (status !== 200) res.send(RES.miss);

                const json = await response.json();
                const libs = new Libs(json, res.message.user.name);
                res.send(libs.getSuccessRes());
                res.send(libs.getShinyRes());
                res.send(libs.evalPokeCpRes());

                const saveData = libs.getSaveData();
                firebase.pushData(saveData);
            } catch (err) {
                res.send(err);
            }
        })();
    });
    robot.respond(/zukan pokemon/, (res) => {
        // 入力値に数値が付与されていたら処理しない
        const input = res.message.text;
        if (input !== 'togoshi-bot zukan pokemon') return false;

        firebase.readLength()
            .then(length => {
                res.send(Libs.getLengthRes(length));
            });
    });
    robot.respond(/zukan pokemon (.*)/, (res) => {
        // 0指定の場合は処理しない
        const id = parseInt(res.match[1]);
        if (id === 0) return false;

        firebase.readLengthId(id)
            .then(length => {
                res.send(Libs.getLengthIdRes(length, id));
            });
    });
    robot.respond(/user pokemon (.*)/, (res) => {
        const user = res.match[1];
        firebase.equalUser(user)
            .then(length => {
                if (length === 0) return false;
                res.send(Libs.getLengthUserRes(length, user));
            });
    });
    robot.respond(/overcp pokemon (.*)/, (res) => {
        const selectCp = parseInt(res.match[1]);
        firebase.overCp(selectCp)
            .then(length => {
                res.send(Libs.getLengthOvercpRes(length, selectCp));
            });
    });
    robot.respond(/shiny pokemon/, (res) => {
        firebase.equalShiny()
            .then(length => {
                res.send(Libs.getLengthShinyRes(length));
            });
    });

    // Help Command
    robot.respond(/h pokemon/, (res) => {
        res.send(RES.help);
    });
};
