/**
 * get pokemonのロジックファイルです。
*/

const request = require('request');
import translateData from '../../data/pokemon.json';

export const getPokeComment = () => {
    // ポケモンデータ設定
    const config = {
        // サポートするポケモンの数（0からカウントするので最大数-1）
        max: 720,
        // APIURL
        api: 'http://pokeapi.co/api/v2/pokemon/',
        // 画像表示
        img: {
            url: 'http://www.pokestadium.com/sprites/black-white/animated/',
            fileType: 'gif'
        },
        imgFan: {
            url: 'http://www.pokestadium.com/sprites/xy-fan/',
            fileType: 'png'
        }
    };

    // request設定・初期値
    let options = {
        url: config.api + '1/',
        json: true
    };


    // 数値をランダム生成してリクエストURL定義
    const pokeSelect = Math.floor(Math.random() * config.max) + 1;
    options.url = config.api + pokeSelect + '/';

    const getUrl = (id, name) => {
        if (id >= 650) {
            return config.imgFan.url + name + '.' + config.imgFan.fileType;
        } else {
            return config.img.url + name + '.' + config.img.fileType;
        }
    };

    request.get(options, (err, response, body) => {
        const pokeData = {
            id: body.id,
            name: translateData[body.id - 1].ja,
            img: getUrl(body.id, body.name)
        };

        // 強さレベルによってコメントを追加
        const addComment = getAddComment();
        const getAddComment = () => {
            // 数値をランダム生成してポケモンの強さ（CP）を定義
            const cpMax = 4000;
            const pokeCp = Math.floor(Math.random() * cpMax);

            // ポケモンの強さレベルを定義
            const cpGod = 4000;        //神 4000のみ
            const cpStrongest = 3500;  //最強 3500以上3999以下
            const cpStronger = 2000;   //強い 2000以上3499以下
            const cpWeaker = 99;       //弱い 99以下2以上
            const cpWeakest = 1;       //最弱 1のみ

            // 強さレベルによって返すコメントを変える
            const status = judgeLevel();
            switch (status) {
                case 'god':
                    return ':god:\n';
                    break;
                case 'strongest':
                    return 'コイツは空前絶後のつよさゴシ！！\n';
                    break;
                case 'stronger':
                    return 'コイツはつよいゴシ！！\n';
                    break;
                case 'weaker':
                    return 'コイツはよわいゴシ…。\n';
                    break;
                case 'weakest':
                    return 'コイツは超絶孤高によわすぎるゴシ…。\n';
                    break;
                default:
                    return '';
                    break;   
            }

            // 強さレベルによって返すステータスを定義
            const judgeLevel = () => {
                if (pokeCp === cpGod) {
                    return 'god'
                } else if (pokeCp < cpGod && pokeCp >= cpStrongest) {
                    return 'strongest';
                } else if (pokeCp < cpStrongest && pokeCp >= cpStronger) {
                    return 'stronger';
                } else if (pokeCp <= cpWeaker && pokeCp > cpWeakest) {
                    return 'weaker';
                } else if (pokeCp === cpWeakest) {
                    return 'weakest';
                }
            };
        };        

        // ポケモンゲットの結果を返す
        const resultComment = getComment();
        const getComment = () => {
            if (response.statusCode === 200) {
                return addComment + 'CP' + pokeCp + 'の' + pokeData.name + 'を捕まえたゴシ！\n' + pokeData.img;
            } else {
                return '捕まえるの失敗したゴシ…。';
            }
        }
        return resultComment;
    });
};
