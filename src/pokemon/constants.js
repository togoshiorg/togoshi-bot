// @flow

// サポートするポケモンの数（0からカウントするので最大数-1）
export const MAX: number = 720;

// サポートするポケモンの強さ（CP）
export const MAXCP: number = 4000;

// ポケモンの強さレベルと出現確率、レスポンスコメントを定義
export const STRENGTH = {
    god: { // 神 CP4000のみ
        cpMax: MAXCP,
        cpMin: MAXCP,
        res: ':god:',
        probability: 0.01
    },
    strongest: { // 最強 CP3500以上3999以下
        cpMax: 3999,
        cpMin: 3500,
        res: 'コイツは空前絶後のつよさゴシ！！',
        probability: 1
    },
    stronger: { // 強い CP2000以上3499以下
        cpMax: 3499,
        cpMin: 2000,
        res: 'コイツはつよいゴシ！！',
        probability: 5
    },
    normal: { // 普通 CP100以上1999以下
        cpMax: 1999,
        cpMin: 100,
        res: '',
        probability: 83.49
    },
    weaker: { // 弱い CP2以上99以下
        cpMax: 99,
        cpMin: 2,
        res: 'コイツはよわいゴシ…。',
        probability: 10
    },
    weakest: { // 最弱 CP1のみ
        cpMax: 1,
        cpMin: 1,
        res: 'コイツは超絶孤高によわすぎるゴシ…。',
        probability: 0.5
    }
};

// API URL
export const API: string = 'http://pokeapi.co/api/v2/pokemon/';

// 画像path
export const PATH = {
    url: 'http://www.pokestadium.com/sprites/xy/',
    fileType: 'gif',
    shiny: 'shiny/'
};

// レスポンス文
export const RES = {
    god: STRENGTH.god.res,
    strongest: STRENGTH.strongest.res,
    stronger: STRENGTH.stronger.res,
    normal: STRENGTH.normal.res,
    weaker: STRENGTH.weaker.res,
    weakest: STRENGTH.weakest.res,
    go: ':pokeball: 捕まえてくるゴシ。。。。。',
    miss: '捕まえるの失敗したゴシ…。',
    shiny: '色違いを捕まえたゴシィィィ！！！？'
};

// 名前変換が必要なポケモンの種類分け
export const CHANGE_NAME_ARR = {
    deletHyphen: [ // ハイフンのみを削除
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
