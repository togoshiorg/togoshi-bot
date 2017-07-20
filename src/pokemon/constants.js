// サポートするポケモンの数（0からカウントするので最大数-1）
export const MAX = 720;

// サポートするポケモンの強さ（CP）
export const MAXCP = 4000;

// ポケモンの強さレベルを定義
export const STRENGTH = {
    god: 4000,        //神 4000のみ
    strongest: 3500,  //最強 3500以上3999以下
    stronger: 2000,   //強い 2000以上3499以下
    weaker: 99,       //弱い 99以下2以上
    weakest: 1        //最弱 1のみ
}

// API URL
export const API = 'http://pokeapi.co/api/v2/pokemon/';

// 画像path
export const PATH = {
    default: {
        url: 'http://www.pokestadium.com/sprites/xy/',
        fileType: 'gif'
    },
    shiny: 'shiny/'
};

// レスポンス文
export const RES = {
    god: ':god:',
    strongest: 'コイツは空前絶後のつよさゴシ！！',
    stronger: 'コイツはつよいゴシ！！',
    weaker: 'コイツはよわいゴシ…。',
    weakest: 'コイツは超絶孤高によわすぎるゴシ…。',
    go: ':pokeball: 捕まえてくるゴシ。。。。。',
    miss: '捕まえるの失敗したゴシ…。',
    shiny: '色違いを捕まえたゴシィィィ！！！？'
};