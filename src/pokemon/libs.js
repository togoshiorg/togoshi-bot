// @flow

import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
import * as firebase from '../firebase/';
import {
    MAXCP,
    STRENGTH,
    API,
    PATH,
    RES
} from './constants';

export const getRandomUrl = (max: number): string => {
    const pokeSelect = Math.floor(Math.random() * max) + 1;
    return `${API}${pokeSelect}/`;
};

export const getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const isShiny = (): boolean => {
    const shinyPossibility = getRandomNum(100);
    return shinyPossibility < 5;
};

export const getSpriteUrl = (id: number, name: string, isShiny: boolean = false): string => {
    if (isShiny) {
        return `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`;
    } else {
        return `${PATH.url}${name}.${PATH.fileType}`;
    }
};

export const getPokeData = ({ id, cp, isShiny }: Object): Object => {
    const nameJa = translateData[id - 1].ja;
    const nameEn = translateData[id - 1].en.toLowerCase();
    // const convName: string = name.replace(/(-)(.*)/, ''); // 形態変化があるポケモンはPokeAPIでは名前の後ろに'-avarage'等がついて画像名にそのまま使えないので'-'以降は削除
    return {
        id,
        name: nameJa,
        img: getSpriteUrl(id, nameEn, isShiny),
        cp
    };
};

export const getSuccessRes = (data: Object): string => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

export const getShinyRes = (isShiny: boolean = false): string => {
    return isShiny ? RES.shiny : '';
};

export const evalPokeCpRes = (cp: number): ?string => {
    for (let [key, val] of Object.entries(STRENGTH)) {
        // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
        if (cp >= val) return RES[key];
    }
};

export const getSaveData = ({ id }: Object, user: string, isShiny: boolean) => {
    const time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    const cp = getRandomNum(MAXCP);
    return { id, user, time, cp, isShiny };
};

export const savePokemon = (saveData: Object) => {
    firebase.pushData(saveData);
};
