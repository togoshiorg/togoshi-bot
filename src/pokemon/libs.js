// @flow

import translateData from '../../data/pokemon.json';
import {
    MAX,
    MAXCP,
    STRENGTH,
    API,
    PATH,
    RES,
    CHANGE_NAME_ARR
} from './constants';

export default class Libs {
    constructor({ id, name, isShiny, cp }: Object) {
        this.id = (id !== undefined) ? id : 1; // APIから取得したポケモンid
        this.name = (name !== undefined) ? name : 'bulbasaur'; // APIから取得したポケモンname
        this.isShiny = (isShiny !== undefined) ? isShiny : Libs.getRandomNum(100) < 5; // 色違い
        this.cp = (cp !== undefined) ? cp : Libs.getRandomNum(MAXCP); // CP
        this.pokestudiumName = Libs.nameConvert(this.id, this.name); // pokestudium.com使用name
        this.nameJp = translateData[this.id - 1].ja; // ポケモン日本語名
        this.img = Libs.getSpriteUrl(this.id, this.pokestudiumName, this.isShiny); // 画像パス
    }

    getPokeData(): Object {
        return {
            id: this.id,
            name: this.nameJp,
            img: this.img,
            cp: this.cp
        };
    }

    getSuccessRes(): string {
        return `CP${this.cp}の${this.nameJp}を捕まえたゴシ！\n${this.img}`;
    }

    getShinyRes(): string {
        return this.isShiny ? RES.shiny : '';
    }

    evalPokeCpRes(): string {
        for (let [key, val] of Object.entries(STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            if (this.cp >= val) return RES[key];
        }
        return '';
    }

    static getRandomUrl(): string {
        const pokeSelect = Libs.getRandomNum(MAX) + 1;
        return `${API}${pokeSelect}/`;
    }

    static getRandomNum(max: number): number {
        return Math.floor(Math.random() * max);
    }

    // 形態変化があるポケモンはPokeAPIでは名前の後ろに'-'がついて画像名にそのまま使えないので、pokestudium.comに合わせて名前を変換する
    static nameConvert(id: number, name: string): string{
        let imgName = name;
        if (CHANGE_NAME_ARR.deletHyphen.indexOf(id) !== -1) {
            imgName = name.replace(/-/, '');
        } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(id) !== -1) {
            imgName = name.replace(/(-)(.*)/, '');
        }
        return imgName;
    }

    static getSpriteUrl(id: number, name: string, isShiny: boolean = false): string {
        if (isShiny) {
            return `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`;
        } else {
            return `${PATH.url}${name}.${PATH.fileType}`;
        }
    }
}
