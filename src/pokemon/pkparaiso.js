// @flow

// 画像path
const PATH: Object = {
    url: {
        intro: 'https://www.pkparaiso.com/imagenes/',
        outro: 'sprites/animados'
    },
    fileType: 'gif',
    shiny: '-shiny',
    gen: {
        earlier6: 'xy/',
        later7: 'sol-luna/'
    }
};

// 名前変換が必要なポケモンの種類分け
const CHANGE_NAME_ARR: Object = {
    replaceHyphen: [ // ハイフンをアンダースコアに変換
        29, // ニドラン♀
        32 // ニドラン♂
    ],
    deleteHyphen: [ // ハイフンだけを削除
        772, // タイプ：ヌル
        785, // カプ・コケコ
        786, // カプ・テテフ
        787, // カプ・ブルル
        788 // カプ・レヒレ
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
        711, // パンプジン
        745, // ルガルガン
        746 // ヨワシ
    ]
};

export default class Pkparaiso {
    id: number; // ポケモンid
    name: string; // ポケモンname
    isShiny: boolean; // 色違い
    genPath: string; // 世代判定
    pkparaisoName: string; // pkparaiso.com用の名前

    constructor ({ id, name, isShiny }: Object = {}) {
        if (id == null || name == null || isShiny == null) throw new Error('Invalid constructor argument.');
        this.id = id;
        this.name = name;
        this.isShiny = isShiny;
        this.pkparaisoName = this.createPkparaisoName();
    }

    // 例外的な名称を持つポケモンの名前をpkparaiso.com用に成形する
    createPkparaisoName (): string {
        if (CHANGE_NAME_ARR.replaceHyphen.indexOf(this.id) !== -1) {
            return this.name.replace(/-/, '_');
        } else if (CHANGE_NAME_ARR.deleteHyphen.indexOf(this.id) !== -1) {
            return this.name.replace(/-/, '');
        } else if (CHANGE_NAME_ARR.deleteHyphenBack.indexOf(this.id) !== -1) {
            return this.name.replace(/(-)(.*)/, '');
        }
        return this.name;
    }

    // 画像パスを返却する（public）
    getImgPath (): string {
        // idが722以降の場合は第7世代用のPathになる
        const genPath = this.id >= 722 ? PATH.gen.later7 : PATH.gen.earlier6;

        const shinyPath = this.isShiny ? PATH.shiny : '';
        return `${PATH.url.intro}${genPath}${PATH.url.outro}${shinyPath}/${this.pkparaisoName}.${PATH.fileType}`;
    }
}
