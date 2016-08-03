/**
 * 星座占い
 * 上位3つ分の星座占いをチャットに流します
*/

const cronJob = require('cron').CronJob;
const request = require('request');

module.exports = (robot) => {

    // 星座占いの無料API
    const api = 'http://api.jugemkey.jp/api/horoscope/free/';

    // 平日の朝10:00に#chattingへ流します
    const horoscope = new cronJob('0 00 10 * * 1-5', () => {
        const room = {room: '#chatting'}

        // 現在の日時を使って必要なデータ生成
        const todayDate = new Date();
        const todayStr = todayDate.getFullYear() + '/' + (('0' + (todayDate.getMonth() + 1)).slice(-2)) + '/' + (('0' + todayDate.getDate()).slice(-2));
        const url = api + todayStr;

        request.get({url, json: true}, (err, response, body) => {
            if (response.statusCode === 200) {
                const data = body.horoscope[todayStr];

                // 上位3つの結果のみを抽出
                let result = [];
                data.map((elm, index) => {
                    switch (elm.rank) {
                    case 1:
                        result[0] = elm;
                        break;
                    case 2:
                        result[1] = elm;
                        break;
                    case 3:
                        result[2] = elm;
                        break;
                    default:
                        break;
                    }
                });

                // 発言文字列作成
                const text = {
                    title: todayStr + 'の運勢ベスト3だゴシ！',
                    one:'*1位 ' + result[0].sign + '*\n' + '金運：' + result[0].money + '　仕事運：' + result[0].job + '　恋愛運：' + result[0].love + '　総合運：' + result[0].total + '\n' + result[0].content,
                    two: '*2位 ' + result[1].sign + '*\n' + '金運：' + result[1].money + '　仕事運：' + result[1].job + '　恋愛運：' + result[1].love + '　総合運：' + result[1].total + '\n' + result[1].content,
                    three: '*3位 ' + result[2].sign + '*\n' + '金運：' + result[2].money + '　仕事運：' + result[2].job + '　恋愛運：' + result[2].love + '　総合運：' + result[2].total + '\n' + result[2].content
                };

                robot.send(room, text.title);
                robot.send(room, text.one);
                robot.send(room, text.two);
                robot.send(room, text.three);
            } else {
                robot.send(room, '今日は占いはお休みゴシ');
            }
        })
    }, null, true, 'Asia/Tokyo');
    horoscope.start();
}
