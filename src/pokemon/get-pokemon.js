// @flow

import Img from './pokestadium';
import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
import * as libs from './libs';

export default class GetPokemon {
    constructor ({ id, name }: Object, user: string) {
        this.id = (id !== undefined) ? id : 1; // APIから取得したポケモンid
        this.name = (name !== undefined) ? name : 'bulbasaur'; // APIから取得したポケモンname
        this.user = (user !== undefined) ? user : 'admin'; // ユーザー

        this.isShiny = this.lotShiny(); // 色違い
        this.strengthLv = this.lotStrength(); // ポケモンの強さ
        this.cp = this.lotCp(); // CP

        this.jpName = this.createJpName(); // ポケモンの日本語名
        this.img = this.createImgPath(); // 画像パス
        this.time = this.createGetPokemon(); // 捕まえた時間
    }

    // 色違いかどうかを抽選する
    lotShiny (): boolean {
        // 確率 1/4096
        return libs.getRandomNum(4096) < 1;
    }

    // 強さを抽選する
    lotStrength (): string {
        let probabilityTotal = 0;
        const parameter = (libs.getRandomNum(10000) + 1) / 100; // 0.01〜100%
        for (let [key, val] of Object.entries(GetPokemon.STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            probabilityTotal += val.probability;
            if (probabilityTotal >= parameter) {
                return key;
            }
        }
        return '';
    };

    // CPを抽選する
    lotCp (): boolean {
        const cpMin = GetPokemon.STRENGTH[this.strengthLv].cp;
        const strengthSortedArr = Object.keys(GetPokemon.STRENGTH).sort((aArr, bArr) => {
            const cpA = GetPokemon.STRENGTH[aArr].cp;
            const cpB = GetPokemon.STRENGTH[bArr].cp;
            if (cpA > cpB) {
                return -1;
            } else if (cpA < cpB) {
                return 1;
            }
            return 0;
        });
        if (strengthSortedArr[0] === this.strengthLv) {
            return cpMin;
        } else {
            const index = strengthSortedArr.indexOf(this.strengthLv);
            const strengthUpLv = strengthSortedArr[index - 1];
            const cpMax = GetPokemon.STRENGTH[strengthUpLv].cp - 1;
            return Math.floor(Math.random() * (cpMax - cpMin + 1) + cpMin);
        }
    }

    // ポケモンの日本語名を作成する
    createJpName (): string {
        return translateData[this.id - 1].ja;
    }

    // 画像パスを作成する
    createImgPath (): string {
        return new Img(this).getImgPath();
    }

    // ポケモン捕獲時間を作成する
    createGetPokemon (): string {
        return format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    }

    // 保存用データを返却する（public）
    getSaveData (): Object {
        return {
            id: this.id,
            user: this.user,
            time: this.time,
            cp: this.cp,
            isShiny: this.isShiny
        };
    }

    // 成功時のメッセージを返却する（public）
    getSuccessRes (): string {
        let res = '';
        const strengthRes = GetPokemon.STRENGTH[this.strengthLv].res;
        res += (strengthRes !== '') ? `${strengthRes}\n` : ''; // 強さに応じたメッセージ
        res += this.isShiny ? `色違いを捕まえたゴシィィィ！！！？\n` : ''; // 色違いだった場合のメッセージ
        res += `CP${this.cp}の${this.jpName}を捕まえたゴシ！\n${this.img}`;
        return res;
    }

    // サポートするポケモンの数（0からカウントするので最大数-1）
    static get MAX (): number {
        return 720;
    }

    // サポートするポケモンの強さ（CP）
    static get MAXCP (): number {
        return 4000;
    }

    // ポケモンの強さレベルと出現確率、レスポンスコメント
    static get STRENGTH (): Object {
        return {
            god: { // 神 CP4000のみ
                cp: GetPokemon.MAXCP,
                res: ':god:',
                probability: 0.01
            },
            strongest: { // 最強 CP3500以上3999以下
                cp: 3500,
                res: 'コイツは空前絶後のつよさゴシ！！',
                probability: 1
            },
            stronger: { // 強い CP2000以上3499以下
                cp: 2000,
                res: 'コイツはつよいゴシ！！',
                probability: 5
            },
            normal: { // 普通 CP100以上1999以下
                cp: 100,
                res: '',
                probability: 83.49
            },
            weaker: { // 弱い CP2以上99以下
                cp: 2,
                res: 'コイツはよわいゴシ…。',
                probability: 10
            },
            weakest: { // 最弱 CP1のみ
                cp: 1,
                res: 'コイツは超絶孤高によわすぎるゴシ…。',
                probability: 0.5
            }
        };
    }
}
