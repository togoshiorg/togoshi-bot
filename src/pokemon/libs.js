// @flow
import * as libs from './libs';
import { API } from './constants';

// ランダムな整数を返却する
export const getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * max);
};

// APIのランダムなURLを返却する
export const getRandomUrl = (max: number): string => {
    const pokeSelect = libs.getRandomNum(max) + 1;
    return `${API}${pokeSelect}/`;
};

// Response Message
export const getLengthRes = (length: number): string => {
    return `全部で${length}匹捕まえたゴシ！`;
};

export const getLengthNameRes = (length: number, name: string): string => {
    return length ? `${name}はこれまでに${length}匹捕まえたゴシ！` : `${name}はまだ捕まえてないゴシ...`;
};

export const getLengthUserRes = (length: number, user: string): string => {
    return length ? `${user}が捕まえたポケモンは${length}匹だゴシ！` : `${user}はまだポケモンを捕まえてないゴシ...`;
};

export const getLengthOvercpRes = (length: number, selectCp: number): string => {
    return length ? `今までにCP${selectCp}以上のポケモンは${length}匹捕まえたゴシ！` : `CP${selectCp}以上のポケモンはまだ捕まえてないゴシ...`;
};

export const getLengthShinyRes = (length: number): string => {
    return length ? `今までに色違いポケモンは${length}匹捕まえたゴシ！` : `まだ普通のポケモンしか捕まえてないゴシ...`;
};
