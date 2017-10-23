// @flow

import PokemonImg from './pokestadium';
import Pokemon from './pokemon';
import { format } from 'date-fns';

interface Request {
    constructor (): Request;
    request (num: number): Object;
    static getUrl (): string;
};

// サポートするポケモンの数（0からカウントするので最大数-1）
const MAX: number = 720;

export default class GetPokemon {
    Request: Class<Request>; // APIリクエスト用オブジェクト
    user: string; // ユーザー
    time: string; // 捕まえた時間
    pokemon: Pokemon; // ポケモン

    constructor (Request: Class<Request>, user: string) {
        if (!Request || !user) throw new Error(GetPokemon.ERROR_RES);
        this.Request = Request;
        this.user = user;
    }

    // ポケモン捕獲時間を作成する
    createGetPokemon (): string {
        return format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    }

    // 成功時のメッセージを作成する
    createSuccessRes (): string {
        let res = '';
        const strengthRes = this.createStrengthRes();
        res += (strengthRes !== '') ? `${strengthRes}\n` : ''; // 強さに応じたメッセージ
        res += this.pokemon.isShiny ? `色違いを捕まえたゴシィィィ！！！？\n` : ''; // 色違いだった場合のメッセージ
        res += `CP${this.pokemon.getCp()}の${this.pokemon.getDispName()}を捕まえたゴシ！\n${this.pokemon.getImg()}`;
        return res;
    }

    // ポケモンの強さレベルのメッセージを作成する
    createStrengthRes (): string {
        switch (this.pokemon.strengthLv) {
            case 'god': return ':god:'; // 神 CP4000のみ
            case 'strongest': return 'コイツは空前絶後のつよさゴシ！！'; // 最強 CP3500以上3999以下
            case 'stronger': return 'コイツはつよいゴシ！！'; // 強い CP2000以上3499以下
            case 'normal': return ''; // 普通 CP100以上1999以下
            case 'weaker': return 'コイツはよわいゴシ…。'; // 弱い CP2以上99以下
            case 'weakest': return 'コイツは超絶孤高によわすぎるゴシ…。'; // 最弱 CP1のみ
            default: return ''; // その他
        }
    }

    // ランダムにポケモンを返却する（public）
    async getRandomPokemon (): Object {
        try {
            const request = new this.Request();
            const pokeSelect = Math.floor(Math.random() * MAX) + 1;
            const data = await request.request(pokeSelect);
            this.pokemon = new Pokemon(data.id, data.name, PokemonImg);
            this.time = this.createGetPokemon();
        } catch (err) {
            throw new Error(GetPokemon.ERROR_RES);
        }
        return this.createSuccessRes();
    }

    // 保存用データを返却する（public）
    getSaveData (): Object {
        return {
            id: this.pokemon.getId(),
            user: this.user,
            time: this.time,
            cp: this.pokemon.getCp(),
            isShiny: this.pokemon.getIsShiny()
        };
    }

    // 捕まえてくる時のメッセージを返却する
    static get GO_RES (): string {
        return ':pokeball: 捕まえてくるゴシ。。。。。';
    }

    // エラー時のメッセージを返却する
    static get ERROR_RES (): string {
        return '捕まえるの失敗したゴシ…。';
    }
}
