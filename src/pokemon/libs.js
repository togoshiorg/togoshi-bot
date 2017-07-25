// @flow

import translateData from '../../data/pokemon.json';
import {
    STRENGTH,
    API,
    PATH,
    RES,
    CHANGE_NAME_ARR
} from './constants';

export const getRandomUrl = (max: number): string => {
    const pokeSelect = Math.floor(Math.random() * max) + 1;
    return `${API}${pokeSelect}/`;
};

export const getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const getStrength = (obj: object): string => {
    let probabilityTotal = 0;
    const parameter = getRandomNum(100) + 1; // 0〜100%
    for (let [key, val] of Object.entries(obj)) {
        probabilityTotal += val.probability;
        if (probabilityTotal >= parameter) return key;
    }
};

export const getCp = (strength: string): number => {
    const strengthLv = strength;
    const cpMax = STRENGTH[strengthLv].cpMax;
    const cpMin = STRENGTH[strengthLv].cpMin;
    const cp = Math.floor(Math.random() * (cpMax - cpMin + 1) + cpMin);
    return cp;
};

export const isShiny = (): boolean => {
    const shinyPossibility = getRandomNum(100) + 1;
    return shinyPossibility < ((1 / 4096) * 100); // 色違いの確率は1/4096
};

export const getSpriteUrl = (id: number, name: string, isShiny: boolean = false): string => {
    if (isShiny) {
        return `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`;
    } else {
        return `${PATH.url}${name}.${PATH.fileType}`;
    }
};

// 形態変化があるポケモンはPokeAPIでは名前の後ろに'-'がついて画像名にそのまま使えないので、pokestudium.comに合わせて名前を変換する
export const nameConvert = (id: number, name: string): string => {
    let imgName = name;
    if (CHANGE_NAME_ARR.deletHyphen.indexOf(id) !== -1) {
        imgName = name.replace(/-/, '');
    } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(id) !== -1) {
        imgName = name.replace(/(-)(.*)/, '');
    }
    return imgName;
};

export const getPokeData = ({ id, name }: Object, isShiny: boolean = false): Object => {
    const convName = nameConvert(id, name);
    const strength = getStrength(STRENGTH);
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, convName, isShiny),
        strength: strength,
        cp: getCp(strength)
    };
};

export const getSuccessRes = (data: Object): string => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

export const getShinyRes = (isShiny: boolean = false): string => {
    return isShiny ? RES.shiny : '';
};

export const evalPokeCpRes = (strength: object): string => {
    return RES[strength];
};
