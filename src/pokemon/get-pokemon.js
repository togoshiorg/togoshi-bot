// @flow

import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
import {
    MAX,
    MAXCP,
    STRENGTH,
    PATH,
    RES,
    CHANGE_NAME_ARR
} from './constants';

export default class GetPokemon {
    constructor ({ id, name }: Object, user: string) {
        this.id = (id !== undefined) ? id : 1; // APIから取得したポケモンid
        this.name = (name !== undefined) ? name : 'bulbasaur'; // APIから取得したポケモンname
        this.user = (user !== undefined) ? user : 'admin'; // ユーザー
        this.isShiny = this.lotShiny(); // 色違い
        this.cp = this.lotCp(); // CP
        this.jpName = this.getJpName(); // ポケモンの日本語名
        this.pokestudiumName = this.getPokestudiumName(); // pokestudium.com用の名前
        this.img = this.getImgPath(); // 画像パス
        this.time = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ'); // 捕まえた時間
    }

    // ポケモンIDを抽選する
    lotPokeId (): number {
        return Math.floor(Math.random() * MAX) + 1;
    }

    // 色違いかどうかを抽選する
    lotShiny (): boolean {
        // 確率5%
        return Math.floor(Math.random() * 100) < 5;
    }

    // CPを抽選する
    lotCp (): boolean {
        return Math.floor(Math.random() * MAXCP);
    }

    // ポケモンの日本語名を返却する
    getJpName (): string {
        return translateData[this.id - 1].ja;
    }

    // pokestudium.com用の名前を返却する
    // ※形態変化があるポケモンはPokeAPIでは名前の後ろに'-'がついて画像名にそのまま使えない。
    getPokestudiumName (): string {
        let imgName = this.name;
        if (CHANGE_NAME_ARR.deletHyphen.indexOf(this.id) !== -1) {
            imgName = this.name.replace(/-/, '');
        } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(this.id) !== -1) {
            imgName = this.name.replace(/(-)(.*)/, '');
        }
        return imgName;
    }

    // 画像パスを返却する
    getImgPath (): string {
        if (this.isShiny) {
            return `${PATH.url}${PATH.shiny}${this.name}.${PATH.fileType}`;
        } else {
            return `${PATH.url}${this.name}.${PATH.fileType}`;
        }
    }

    // 保存用データを返却する
    getSaveData (): Object {
        return {
            id: this.id,
            user: this.user,
            time: this.time,
            cp: this.cp,
            isShiny: this.isShiny
        };
    }

    // 成功時レスポンス
    getSuccessRes (): string {
        return `CP${this.cp}の${this.jpName}を捕まえたゴシ！\n${this.img}`;
    }

    // 色違い捕獲時レスポンス
    getShinyRes (): string {
        return this.isShiny ? RES.shiny : '';
    }

    // CPに応じたレスポンス
    evalPokeCpRes (): string {
        for (let [key, val] of Object.entries(STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            if (this.cp >= val) return RES[key];
        }
        return '';
    }
}
