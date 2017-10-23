// @flow

import translateData from '../../data/pokemon.json';

interface PokemonImg {
    constructor (object: Object): PokemonImg;
    getImgPath (): string;
};

// サポートするポケモンの強さ（CP）
const MAXCP: number = 4000;

// ポケモンの強さレベルと出現確率、レスポンスコメント
const STRENGTH: Object = {
    god: { // 神 CP4000のみ
        cp: MAXCP,
        probability: 0.01
    },
    strongest: { // 最強 CP3500以上3999以下
        cp: 3500,
        probability: 1
    },
    stronger: { // 強い CP2000以上3499以下
        cp: 2000,
        probability: 5
    },
    normal: { // 普通 CP100以上1999以下
        cp: 100,
        probability: 83.49
    },
    weaker: { // 弱い CP2以上99以下
        cp: 2,
        probability: 10
    },
    weakest: { // 最弱 CP1のみ
        cp: 1,
        probability: 0.5
    }
};

export default class Pokemon {
    id: number; // ポケモンid
    name: string; // ポケモンname
    PokemonImg: Class<PokemonImg>; // ポケモン画像クラス
    isShiny: boolean; // 色違い
    strengthLv: string; // ポケモンの強さ
    cp: number; // CP（strengthLvより決定）
    dispName: string; // ポケモンの表示名
    img: string; // 画像パス

    constructor (id: number, name: string, PokemonImg: Class<PokemonImg>) {
        this.id = id;
        this.name = name;
        this.PokemonImg = PokemonImg;

        this.isShiny = this.lotShiny();
        this.strengthLv = this.lotStrength();
        this.cp = this.lotCp();

        this.dispName = this.createDispName();
        this.img = this.createImgPath();
    }

    // 色違いかどうかを抽選する
    lotShiny (): boolean {
        // 確率 1/4096
        return Math.floor(Math.random() * 4096) < 1;
    }

    // 強さを抽選する
    lotStrength (): string {
        let probabilityTotal = 0;
        const parameter = (Math.floor(Math.random() * 10000) + 1) / 100; // 0.01〜100%
        for (let [key, val] of Object.entries(STRENGTH)) {
            // flow-disable-line // val as mixed. https://github.com/facebook/flow/issues/2221
            probabilityTotal += val.probability;
            if (probabilityTotal >= parameter) {
                return key;
            }
        }
        return '';
    };

    // 強さからCPを抽選する
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
        return new this.PokemonImg(this).getImgPath();
    }

    // getter id（public）
    getId (): number {
        return this.id;
    }

    // getter isShiny（public）
    getIsShiny (): boolean {
        return this.isShiny;
    }

    // getter strengthLv（public）
    getStrengthLv (): string {
        return this.strengthLv;
    }

    // getter cp（public）
    getCp (): number {
        return this.cp;
    }

    // getter dispName（public）
    getDispName (): string {
        return this.dispName;
    }

    // getter img（public）
    getImg (): string {
        return this.img;
    }
}
