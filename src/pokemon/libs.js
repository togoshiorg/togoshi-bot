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
    let type = 'default';
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

export const getShinyRes = (isShiny = false) => {
    return isShiny ? RES.shiny : '';
};

export const evalPokeCpRes = (cp) => {
    if (cp === STRENGTH.god) {
        return RES.god;
    } else if (cp < STRENGTH.god && cp >= STRENGTH.strongest) {
        return RES.strongest;
    } else if (cp < STRENGTH.strongest && cp >= STRENGTH.stronger) {
        return RES.stronger;
    } else if (cp <= STRENGTH.weaker && cp > STRENGTH.weakest) {
        return RES.weaker;
    } else if (cp === STRENGTH.weakest) {
        return RES.weakest;
    }
    return '';
};