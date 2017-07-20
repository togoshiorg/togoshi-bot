/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

const request = require('request');
import translateData from '../data/pokemon.json';
import {
    MAX,
    MAXCP,
    API,
    PATH,
    RES
} from './pokemon/constants';

const getRandomUrl = (max) => {
    const pokeSelect = Math.floor(Math.random() * max) + 1;
    return `${API}${pokeSelect}/`;
};

const getRandomCp = (max) => {
    return Math.floor(Math.random() * max);
};

const getSpriteUrl = (id, name) => {
    let type = 'default';
    if (id >= 650) type = 'fan';
    return `${PATH[type].url}${name}.${PATH[type].fileType}`;
};

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(':pokeball: 捕まえてくるゴシ。。。。。');

        const randomUrl = getRandomUrl(MAX);

        request.get({ randomUrl, json: true }, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = {
                    id: body.id,
                    name: translateData[body.id - 1].ja,
                    img: getSpriteUrl(body.id, body.name)
                };

                const pokeCp = getRandomCp(MAXCP);

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