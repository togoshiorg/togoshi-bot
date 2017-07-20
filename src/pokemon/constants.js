// サポートするポケモンの数（0からカウントするので最大数-1）
export const MAX = 720;

// サポートするポケモンの強さ（CP）
export const MAXCP = 2000;

// API URL
export const API = 'http://pokeapi.co/api/v2/pokemon/';

// 画像path
export const PATH = {
    default: {
        url: 'http://www.pokestadium.com/sprites/black-white/animated/',
        fileType: 'gif'
    },
    fan: {
        url: 'http://www.pokestadium.com/sprites/xy-fan/',
        fileType: 'png'
    },
    shiny: 'shiny/'
};

// レスポンス文
export const RES = {
    strong: 'コイツはつよいゴシ！！',
    weak: 'コイツはよわいゴシ…。',
    go: ':pokeball: 捕まえてくるゴシ。。。。。',
    miss: '捕まえるの失敗したゴシ…。'
};