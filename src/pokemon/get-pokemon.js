// @flow

import PokemonImg from './pokestadium';
import { format } from 'date-fns';
import translateData from '../../data/pokemon.json';
import * as libs from './libs';

// サポートするポケモンの強さ（CP）
const MAXCP: number = 4000;

// ポケモンの強さレベルと出現確率、レスポンスコメント
const STRENGTH: Object = {
    god: { // 神 CP4000のみ
        cp: MAXCP,
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

export default class GetPokemon {
    id: number;
    name: string;
    user: string;
    isShiny: boolean;
    strengthLv: string;
    cp: number;
    dispName: string;
    img: string;
    time: string;

    constructor ({ id, name }: Object = { id: 1, name: 'bulbasaur' }, user: string = 'admin') {
        this.id = id; // APIから取得したポケモンid
        this.name = name; // APIから取得したポケモンname
        this.user = user; // ユーザー

        this.isShiny = this.lotShiny(); // 色違い
        this.strengthLv = this.lotStrength(); // ポケモンの強さ
        this.cp = this.lotCp(); // CP

        this.dispName = this.createDispName(); // ポケモンの表示名
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
        for (let [key, val] of Object.entries(STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            probabilityTotal += val.probability;
            if (probabilityTotal >= parameter) {
                return key;
            }
        }
        return '';
    };

    // CPを抽選する
    lotCp (): number {
        const cpMin = STRENGTH[this.strengthLv].cp;
        const strengthSortedArr = Object.keys(STRENGTH).sort((aArr, bArr) => {
            const cpA = STRENGTH[aArr].cp;
            const cpB = STRENGTH[bArr].cp;
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
            const cpMax = STRENGTH[strengthUpLv].cp - 1;
            return Math.floor(Math.random() * (cpMax - cpMin + 1) + cpMin);
        }
    }

    // ポケモンの表示名を作成する
    createDispName (): string {
        try {
            return translateData[this.id - 1].ja;
        } catch (err) {
            // 該当する日本語名が無かった場合はnameをそのまま返却
            return this.name;
        }
    }

    // 画像パスを作成する
    createImgPath (): string {
        return new PokemonImg(this).getImgPath();
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
        const strengthRes = STRENGTH[this.strengthLv].res;
        res += (strengthRes !== '') ? `${strengthRes}\n` : ''; // 強さに応じたメッセージ
        res += this.isShiny ? `色違いを捕まえたゴシィィィ！！！？\n` : ''; // 色違いだった場合のメッセージ
        res += `CP${this.cp}の${this.dispName}を捕まえたゴシ！\n${this.img}`;
        return res;
    }
}
