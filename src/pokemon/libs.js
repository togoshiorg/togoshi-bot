import translateData from '../../data/pokemon.json';
import {
    MAXCP,
    STRENGTH,
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
    if (isShiny) {
        return `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`;
    } else {
        return `${PATH.url}${name}.${PATH.fileType}`;
    }
};

export const getPokeData = ({ id, name }, isShiny = false) => {
    const convName = name.replace(/(-)(.*)/, ''); //形態変化があるポケモンはPokeAPIでは名前の後ろに'-avarage'等がついて画像名にそのまま使えないので'-'以降は削除
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, convName, isShiny),
        cp: getRandomNum(MAXCP)
    };
};

export const getSuccessRes = (data) => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

export const getShinyRes = (isShiny = false) => {
    return isShiny ? RES.shiny : '';
};

export const evalPokeCpRes = (cp) => {
    for (let [key, val] of Object.entries(STRENGTH)) {
        if (cp >= val) return RES[key];
    }
};