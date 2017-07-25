/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import Libs from './pokemon/libs';
import { RES } from './pokemon/constants';

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        (async () => {
            try {
                const response = await fetch(libs.getRandomUrl());

                const status = response.status;
                if (status !== 200) res.send(RES.miss);

                const json = await response.json();
                const libs = new Libs(json);
                res.send(libs.getSuccessRes());
            } catch (err) {
                res.send(err);
            }
        })();
    });
};
