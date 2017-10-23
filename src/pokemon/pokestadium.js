// @flow

// 画像path
const PATH: Object = {
    url: 'http://www.pokestadium.com/sprites/xy/',
    fileType: 'gif',
    shiny: 'shiny/'
};

// 名前変換が必要なポケモンの種類分け
const CHANGE_NAME_ARR: Object = {
    deleteHyphen: [ // ハイフンのみを削除
        29, // ニドラン♀
        32 // ニドラン♂
    ],
    deleteHyphenBack: [ // ハイフンから後ろを削除
        386, // デオキシス
        413, // ミノマダム
        487, // ギラティナ
        492, // シェイミ
        550, // バスラオ
        555, // ヒヒダルマ
        641, // トルネロス
        642, // ボルドロス
        645, // ランドロス
        647, // ケルディオ
        648, // メロエッタ
        678, // ニャオニクス
        681, // ギルガルド
        710, // バケッチャ
        711 // パンプジン
    ]
};

export default class Pokestadium {
    id: number; // ポケモンid
    name: string; // ポケモンname
    isShiny: boolean; // 色違い
    pokestudiumName: string; // pokestudium.com用の名前

    constructor ({ id, name, isShiny }: Object = { id: 1, name: 'bulbasaur', isShiny: false }) {
        this.id = id;
        this.name = name;
        this.isShiny = isShiny;
        this.pokestudiumName = this.createPokestudiumName();
    }

    // pokestudium.com用の名前を作成する
    // ※形態変化があるポケモンはPokeAPIでは名前の後ろに'-'がついて画像名にそのまま使えない。
    createPokestudiumName (): string {
        if (CHANGE_NAME_ARR.deleteHyphen.indexOf(this.id) !== -1) {
            return this.name.replace(/-/, '');
        } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(this.id) !== -1) {
            return this.name.replace(/(-)(.*)/, '');
        }
        return this.name;
    }

    // 画像パスを返却する（public）
    getImgPath (): string {
        const shinyPath = this.isShiny ? PATH.shiny : '';
        return `${PATH.url}${shinyPath}${this.pokestudiumName}.${PATH.fileType}`;
    }
}
