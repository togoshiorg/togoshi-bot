// @flow

import { format } from 'date-fns';
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
    constructor ({ id, name, isShiny, cp }: Object, user: string) {
        this.id = (id !== undefined) ? id : 1; // APIから取得したポケモンid
        this.name = (name !== undefined) ? name : 'bulbasaur'; // APIから取得したポケモンname
        this.user = (user !== undefined) ? user : 'admin'; // ユーザー
        this.isShiny = (isShiny !== undefined) ? isShiny : Libs.getRandomNum(100) < 5; // 色違い
        this.cp = (cp !== undefined) ? cp : Libs.getRandomNum(MAXCP); // CP
        this.pokestudiumName = Libs.nameConvert(this.id, this.name); // pokestudium.com使用name
        this.nameJp = translateData[this.id - 1].ja; // ポケモン日本語名
        this.img = Libs.getSpriteUrl(this.id, this.pokestudiumName, this.isShiny); // 画像パス
        this.time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ'); // 時間
    }

    getPokeData (): Object {
        return {
            id: this.id,
            name: this.nameJp,
            img: this.img,
            cp: this.cp
        };
    }

    getSaveData (): Object {
        return {
            id: this.id,
            user: this.user,
            time: this.time,
            cp: this.cp,
            isShiny: this.isShiny
        };
    }

    getSuccessRes (): string {
        return `CP${this.cp}の${this.nameJp}を捕まえたゴシ！\n${this.img}`;
    }

    getShinyRes (): string {
        return this.isShiny ? RES.shiny : '';
    }

    evalPokeCpRes (): string {
        for (let [key, val] of Object.entries(STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            if (this.cp >= val) return RES[key];
        }
        return '';
    }

    static getRandomUrl (): string {
        const pokeSelect = Libs.getRandomNum(MAX) + 1;
        return `${API}${pokeSelect}/`;
    }

    static getRandomNum (max: number): number {
        return Math.floor(Math.random() * max);
    }

    // 形態変化があるポケモンはPokeAPIでは名前の後ろに'-'がついて画像名にそのまま使えないので、pokestudium.comに合わせて名前を変換する
    static nameConvert (id: number, name: string): string{
        let imgName = name;
        if (CHANGE_NAME_ARR.deletHyphen.indexOf(id) !== -1) {
            imgName = name.replace(/-/, '');
        } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(id) !== -1) {
            imgName = name.replace(/(-)(.*)/, '');
        }
        return imgName;
    }

    static getSpriteUrl (id: number, name: string, isShiny: boolean = false): string {
        if (isShiny) {
            return `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`;
        } else {
            return `${PATH.url}${name}.${PATH.fileType}`;
        }
    }

    // Response Message
    static getLengthRes (length: number): string {
        return `全部で${length}匹捕まえたゴシ！`;
    }

    static getLengthNameRes (length: number, name: string): string {
        return length ? `${name}はこれまでに${length}匹捕まえたゴシ！` : `${name}はまだ捕まえてないゴシ...`;
    }

    static getLengthUserRes (length: number, user: string): string {
        return length ? `${user}が捕まえたポケモンは${length}匹だゴシ！` : `${user}はまだポケモンを捕まえてないゴシ...`;
    }

    static getLengthOvercpRes (length: number, selectCp: number): string {
        return length ? `今までにCP${selectCp}以上のポケモンは${length}匹捕まえたゴシ！` : `CP${selectCp}以上のポケモンはまだ捕まえてないゴシ...`;
    }

    static getLengthShinyRes (length: number): string {
        return length ? `今までに色違いポケモンは${length}匹捕まえたゴシ！` : `まだ普通のポケモンしか捕まえてないゴシ...`;
    }
};
