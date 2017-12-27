// @flow

import Pkparaiso from './pkparaiso';
import PokemonJa from './pokemon-ja';
import { format } from 'date-fns';

// サポートするポケモンの数（0からカウントするので最大数-1）
const MAX: number = 801;

export default class GetPokemon {
    requestApi: RequestApi; // APIリクエスト用オブジェクト
    user: string; // ユーザー
    time: string; // 捕まえた時間
    pokemonObj: PokemonObj; // ポケモン

    constructor (RequestApi: Class<RequestApi>, user: string) {
        if (RequestApi == null || user == null) throw new Error(GetPokemon.GET_ERROR_RES);
        this.requestApi = new RequestApi();
        this.user = user;
    }

    // ポケモン捕獲時間を作成する
    createGetTime (): string {
        return format(new Date(), GetPokemon.TIME_FORMAT);
    }

    // 成功時のメッセージを作成する
    createSuccessRes (): string {
        let res = '';
        const strengthRes = this.createStrengthRes();
        res += (strengthRes !== '') ? `${strengthRes}\n` : ''; // 強さに応じたメッセージ
        res += this.pokemonObj.getIsShiny() ? `色違いを捕まえたゴシィィィ！！！？\n` : ''; // 色違いだった場合のメッセージ
        res += `CP${this.pokemonObj.getCp()}の${this.pokemonObj.getName()}を捕まえたゴシ！\n${this.pokemonObj.getImg()}`;
        return res;
    }

    // ポケモンの強さレベルのメッセージを作成する
    createStrengthRes (): string {
        switch (this.pokemonObj.getStrengthLv()) {
            case 'god': return ':god:'; // 神 CP4000のみ
            case 'strongest': return 'コイツは空前絶後のつよさゴシ！！'; // 最強 CP3500以上3999以下
            case 'stronger': return 'コイツはつよいゴシ！！'; // 強い CP2000以上3499以下
            case 'normal': return ''; // 普通 CP100以上1999以下
            case 'weaker': return 'コイツはよわいゴシ…。'; // 弱い CP2以上99以下
            case 'weakest': return 'コイツは超絶孤高によわすぎるゴシ…。'; // 最弱 CP1のみ
            default: return ''; // その他
        }
    }

    // 保存用データを作成する
    createSaveData (): Object {
        return {
            id: this.pokemonObj.getId(),
            user: this.user,
            time: this.time,
            cp: this.pokemonObj.getCp(),
            isShiny: this.pokemonObj.getIsShiny()
        };
    }

    // ランダムにポケモンを返却する（public）
    async getRandom (): Object {
        try {
            const pokeSelect = Math.floor(Math.random() * MAX) + 1;
            const data = await this.requestApi.request(pokeSelect);
            this.pokemonObj = new PokemonJa(data, Pkparaiso);
            this.time = this.createGetTime();
            return this.createSuccessRes();
        } catch (err) {
            throw new Error(GetPokemon.GET_ERROR_RES);
        }
    }

    // ポケモンをDBに保存する（public）
    pushData (Database: Class<Database>): void {
        try {
            const db = new Database();
            db.push(this.createSaveData());
        } catch (err) {
            throw new Error(GetPokemon.PUSH_ERROR_RES);
        }
    }

    // 捕まえてくる時のメッセージを返却する
    static get GO_RES (): string {
        return ':pokeball: 捕まえてくるゴシ。。。。。';
    }

    // 捕獲エラー時のメッセージを返却する
    static get GET_ERROR_RES (): string {
        return '捕まえるの失敗したゴシ…。';
    }

    // 保存エラー時のメッセージを返却する
    static get PUSH_ERROR_RES (): string {
        return '保存するの失敗したゴシ…。';
    }

    // 捕獲時間のフォーマットを返却する
    static get TIME_FORMAT (): string {
        return 'YYYY-MM-DDTHH:mm:ssZ';
    }
}
