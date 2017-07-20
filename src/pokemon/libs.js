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

export const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);
};

export const isShiny = () => {
    const shinyPossibility = getRandomNum(100);
    return shinyPossibility < 5;
};

export const getSpriteUrl = (id, name, isShiny = false) => {
    let type = 'default';
    if (id >= 650) type = 'fan';
    if (isShiny) {
        return `${PATH[type].url}${PATH.shiny}${name}.${PATH[type].fileType}`;
    } else {
        return `${PATH[type].url}${name}.${PATH[type].fileType}`;
    }
};

export const getPokeData = ({ id, name }, isShiny = false) => {
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, name, isShiny),
        cp: getRandomNum(MAXCP)
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