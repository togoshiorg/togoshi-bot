/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

const request = require('request');
import translateData from '../data/pokemon.json';
import {
    MAX,
    API,
    PATH,
    RES
} from './pokemon/constants';

module.exports = (robot) => {

    // request設定・初期値
    let options = {
        url: API + '1/',
        json: true
    };

    robot.respond(/get pokemon/, (res) => {
        res.send(':pokeball: 捕まえてくるゴシ。。。。。');

        // 数値をランダム生成してリクエストURL定義
        const pokeSelect = Math.floor(Math.random() * MAX) + 1;
        options.url = API + pokeSelect + '/';

        const getUrl = (id, name) => {
            if (id >= 650) {
                return PATH.fan.url + name + '.' + PATH.fan.fileType;
            } else {
                return PATH.default.url + name + '.' + PATH.default.fileType;
            }
        };

        request.get(options, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = {
                    id: body.id,
                    name: translateData[body.id - 1].ja,
                    img: getUrl(body.id, body.name)
                };

                // 数値をランダム生成してポケモンの強さ（CP）を定義
                const cpMax = 2000;
                const pokeCp = Math.floor(Math.random() * cpMax);

                res.send('CP' + pokeCp + 'の' + pokeData.name + 'を捕まえたゴシ！\n' + pokeData.img);
                if (pokeCp > 1900) {
                    res.send(RES.strong);
                } else if (pokeCp < 100) {
                    res.send(RES.weak);
                }
            } else {
                res.send(RES.miss);
            }
        })
    });
}