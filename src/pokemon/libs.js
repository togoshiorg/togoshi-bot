// @flow

import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
import { pushData } from '../firebase/';
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

export const getPokeData = ({ id, name }: Object, isShiny: boolean = false): Object => {
    const convName: string = name.replace(/(-)(.*)/, ''); // 形態変化があるポケモンはPokeAPIでは名前の後ろに'-avarage'等がついて画像名にそのまま使えないので'-'以降は削除
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, convName, isShiny),
        cp: getRandomNum(MAXCP)
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

export const savePokemon = ({ id, cp }: Object, user: string) => {
    const time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    pushData({ id, user, time, cp });
};
