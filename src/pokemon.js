/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

const request = require('request');
import translateData from '../data/pokemon.json';

module.exports = (robot) => {

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
        }
    };

    // request設定・初期値
    let options = {
        url: config.api + '1/',
        json: true
    };

    robot.respond(/get pokemon/, (res) => {
        res.send(':pokeball: 捕まえてくるゴシ。。。。。');

        // 数値をランダム生成してリクエストURL定義
        const pokeSelect = Math.floor(Math.random() * config.max) + 1;
        options.url = config.api + pokeSelect + '/';

        request.get(options, (err, response, body) => {
            if (response.statusCode === 200) {
                const pokeData = {
                    id: body.id,
                    name: translateData[body.id - 1].ja,
                    img: config.img.url + body.name + '.' + config.img.fileType
                };

                // 数値をランダム生成してポケモンの強さ（CP）を定義
                const cpMax = 2000;
                const pokeCp = Math.floor(Math.random() * cpMax);

                res.send('CP' + pokeCp + 'の' + pokeData.name + 'を捕まえたゴシ！\n' + pokeData.img);
                if (pokeCp > 1900) {
                    res.send('コイツはつよいゴシ！！');
                }

                // ポケモン図鑑に登録ロジック
                let zukanData = robot.brain.get('pokemon-zukan') || [];
                const zukanCheck = zukanData.some(elm => {
                    return elm.id !== pokeData.id;
                });
                if (zukanData.length === 0 || zukanCheck) {
                    zukanData.push({
                        id: pokeData.id,
                        name: pokeData.name,
                        nameEn: body.name,
                        maxCp: pokeCp
                    });
                    robot.brain.set('pokemon-zukan', zukanData);
                }
            } else {
                res.send('捕まえるの失敗したゴシ…。');
            }
        })
    });

    robot.respond(/check zukan/, (res) => {
        const zukanData = robot.brain.get('pokemon-zukan');
        console.log(zukanData);
        let count = 0;
        if (zukanData) {
            count = zukanData.length
        }
        res.send('ポケモン図鑑は' + count + '匹まで埋まったゴシ！！');
    });

    robot.respond(/check pokemon (.*)/i, (res) => {
        const zukanData = robot.brain.get('pokemon-zukan');
        const hitData = zukanData.filter(elm => {
            return elm.name === res.match[1];
        });
        if (hitData.length === 0) {
            res.send(res.match[1] + 'はまだ捕まえてないゴシ…');
        } else {
            const img = config.img.url + hitData[0].nameEn + '.' + config.img.fileType
            res.send(res.match[1] + 'はもう捕まえているゴシよ♪\n' + img);
        }
    });
}
