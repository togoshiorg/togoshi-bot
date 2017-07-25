// @flow

import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
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

export const getSaveData = ({ id, cp }: Object, user: string, isShiny: boolean = false) => {
    const time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    return { id, user, time, cp, isShiny };
};

// Response Message
export const getSuccessRes = (data: Object): string => {
    return `CP${data.cp}の${data.name}を捕まえたゴシ！\n${data.img}`;
};

export const getLengthRes = (length: number): string => {
    return `全部で${length}匹捕まえたゴシ！`;
};

export const getLengthIdRes = (length: number, id: number): string => {
    const name = translateData[id - 1].ja;
    return `${name}はこれまでに${length}匹捕まえたゴシ！`;
};

export const getLengthUserRes = (length: number, user: string): string => {
    return `${user}が捕まえたポケモンは${length}匹だゴシ！`;
};

export const getLengthOvercpRes = (length: number, selectCp: number): string => {
    return `今までにCP${selectCp}以上のポケモンは${length}匹捕まえたゴシ！`;
};

export const getLengthShinyRes = (length: number): string => {
    return `今までに色違いポケモンは${length}匹捕まえたゴシ！`;
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
