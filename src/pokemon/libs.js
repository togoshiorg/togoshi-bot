import translateData from '../../data/pokemon.json';
import {
    MAXCP,
    API,
    PATH,
    RES
} from './constants';

export const getRandomUrl = (max) => {
    const pokeSelect = Math.floor(Math.random() * max) + 1;
    return `${API}${pokeSelect}/`;
};

export const getRandomCp = (max) => {
    return Math.floor(Math.random() * max);
};

export const getSpriteUrl = (id, name) => {
    let type = 'default';
    if (id >= 650) type = 'fan';
    return `${PATH[type].url}${name}.${PATH[type].fileType}`;
};

export const getPokeData = ({ id, name }) => {
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, name),
        cp: getRandomCp(MAXCP)
    };
};

export const getSuccessRes = (data) => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

export const evalPokeCpRes = (cp) => {
    if (cp > 1900) {
        return RES.strong;
    } else if (cp < 100) {
        return RES.weak;
    }
    return '';
};