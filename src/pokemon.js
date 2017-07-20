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

const getPokeData = ({ id, name }) => {
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, name),
        cp: getRandomCp(MAXCP)
    };
};

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(':pokeball: 捕まえてくるゴシ。。。。。');

        const randomUrl = getRandomUrl(MAX);

        request.get({ randomUrl, json: true }, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = getPokeData(body);

                res.send('CP' + pokeData.cp + 'の' + pokeData.name + 'を捕まえたゴシ！\n' + pokeData.img);
                if (pokeData.cp > 1900) {
                    res.send(RES.strong);
                } else if (pokeData.cp < 100) {
                    res.send(RES.weak);
                }
            } else {
                res.send(RES.miss);
            }
        })
    });
}