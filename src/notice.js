/**
 * リマインダー系
 * cronで実行タイミングを指定します。
 *
 * cronJob('秒, 分, 時, 日, 月, 曜日', callback);
 * 曜日：{0: 日, 1: 月, 2:火, 3:水, 4:木, 5:金, 6:土}
 *
 * その他細かい指定方法については「crontab」で検索してみてください。
*/

import roomJson from '../data/room.json';
const CronJob = require('cron').CronJob;
// const Response = require('hubot').Response;

module.exports = (robot) => {
    // 大晦日
    // 12/31 23:00
    const newyearsEve = new CronJob('0 0 23 31 12 *', () => {
        const room = { room: roomJson.general };
        const post = '<!channel> 今年もお世話になったゴシ。みなさま良いお年をゴシ。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    newyearsEve.start();

    // 新年
    // 1/1 8:00
    const newyear = new CronJob('0 0 9 1 1 *', () => {
        const room = { room: roomJson.general };
        const post = 'あけましておめでとうゴシ。今年もよろしくお願いしますゴシ。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    newyear.start();
};
