// @flow

import {
    STRENGTH,
    API,
    PATH,
    RES,
    CHANGE_NAME_ARR
} from './constants';

// APIのランダムなURLを返却する
export const getRandomUrl = (): string => {
    const pokeSelect = Math.floor(Math.random() * MAX) + 1;
    return `${API}${pokeSelect}/`;
};

export const getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const strengthSort = (arr: Array<string>): Array<string> => {
    return arr.sort((aArr, bArr) => {
        const cpA = STRENGTH[aArr].cp;
        const cpB = STRENGTH[bArr].cp;
        if (cpA > cpB) {
            return -1;
        } else if (cpA < cpB) {
            return 1;
        }
        return 0;
    });
};

export const getStrength = (obj: Object): string => {
    let strengthLv = '';
    let probabilityTotal = 0;
    const parameter = getRandomNum(100) + 1; // 0〜100%
    for (let [key, val] of Object.entries(obj)) {
        // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
        probabilityTotal += val.probability;
        if (probabilityTotal >= parameter) {
            strengthLv = key;
            break;
        }
    }
    return strengthLv;
};

export const getCp = (strengthLv: string): number => {
    const cpMin = STRENGTH[strengthLv].cp;
    const strengthArr = Object.keys(STRENGTH);
    const strengthSortedArr = strengthSort(strengthArr);
    if (strengthSortedArr[0] === strengthLv) {
        return cpMin;
    } else {
        const index = strengthSortedArr.indexOf(strengthLv);
        const strengthUpLv = strengthSortedArr[index - 1];
        const cpMax = STRENGTH[strengthUpLv].cp - 1;
        return Math.floor(Math.random() * (cpMax - cpMin + 1) + cpMin);
    }
};

export const isShiny = (): boolean => {
    const shinyPossibility = getRandomNum(4096); // 色違いの確率は1/4096
    return shinyPossibility < 1;
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
    if (CHANGE_NAME_ARR.deletHyphen.indexOf(id) !== -1) {
        return name.replace(/-/, '');
    } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(id) !== -1) {
        return name.replace(/(-)(.*)/, '');
    }
    return name;
};

export const getPokeData = ({ id, name }: Object, isShiny: boolean = false): Object => {
    const convName = nameConvert(id, name);
    const strengthLv = getStrength(STRENGTH);
    return {
        id,
        name: translateData[id - 1].ja,
        img: getSpriteUrl(id, convName, isShiny),
        strength: strengthLv,
        cp: getCp(strengthLv)
    };
};

export const getSaveData = ({ id, cp }: Object, user: string, isShiny: boolean = false) => {
    const time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    return { id, user, time, cp, isShiny };
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

export const getShinyRes = (isShiny: boolean = false): string => {
    return isShiny ? RES.shiny : '';
};

export const evalPokeCpRes = (strength: string): string => {
    return STRENGTH[strength].res;
};
