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

const getSuccessRes = (data) => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

const evalPokeCpRes = (cp) => {
    if (cp > 1900) {
        return RES.strong;
    } else (cp < 100) {
        return RES.weak;
    }
    return '';
};

module.exports = (robot) => {
    robot.respond(/get pokemon/, (res) => {
        res.send(RES.go);

        const randomUrl = getRandomUrl(MAX);

        request.get({ randomUrl, json: true }, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = getPokeData(body);

                res.send(getSuccessRes(pokeData));
                res.send(evalPokeCpRes(pokeData.cp));
            } else {
                res.send(RES.miss);
            }
        })
    });
}