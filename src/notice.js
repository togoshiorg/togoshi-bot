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
    // 定時のお知らせ
    // 平日19:00
    /*
    const ordinary = new CronJob('0 0 19 * * 1-5', () => {
        const room = { room: roomJson.general };
        const post = Response.prototype.random([
            '<!channel> 19時になったゴシ。業務が終わった方は早く帰るゴシ。まだまだ仕事がある方はもうちょっと頑張ろうゴシ！',
            '<!channel> 19時ゴシ！19時ゴシ！19時ゴシ！19時ゴシ！19時ゴシ！帰るゴシ！',
            '<!channel> 19時になりました。これからお帰りの方も、残業する方もお疲れ様です。',
            '<!channel> 19時…ゴシ…ﾊﾞﾀｯ',
            '<!channel> お疲れ様ゴシ。もう19時になったゴシ。早いゴシねぇ…',
            '<!channel> http://serif.hatelabo.jp/images/cache/7cabedfe81e8e328aa930388fad4dbe95fe36aa9/c5673d089fdbb895ce57518bd7502a298a6f42aa.gif',
            '<!channel> http://bw-ok.co.jp/wp-content/uploads/2016/01/c1daaff496b86c1f9a4bfdfe2405e88e.jpg',
            '<!channel> https://retrip.s3.amazonaws.com/article/2994/images/2994bc7535af-301a-4f6d-b5a1-d2237c02ff21_m.jpg',
            '<!channel> 1分遅れのhttp://ss.bokete.jp/3372262.jpg',
            'http://p.twpl.jp/show/large/KSVKl',
            'http://stat.ameba.jp/user_images/20141119/00/chiko-mikan/d8/d6/p/o0555041413133517439.png',
            'http://thumbnail.image.rakuten.co.jp/@0_mall/t-time/cabinet/new_rms2/teijitaishakyoko_tm.jpg?_ex=200x200&s=2&r=1#.png'
        ]);
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    ordinary.start();
    */

    // カンパニー提出リマインド（前日）
    // 毎月10日19:00
    /*
    const companyDailyClose = new CronJob('0 0 19 10 * *', () => {
        const room = { room: roomJson.general };
        const post = '<!channel> 明日はカンパニーの月次提出日ゴシ。日時提出は今のうち終わらせておくゴシ。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    companyDailyClose.start();
    */

    // カンパニー提出リマインド（当日）
    // 毎月11日9:55
    /*
    const companyMonthlyClose = new CronJob('0 55 9 11 * *', () => {
        const room = { room: roomJson.general };
        const post = '<!channel> 今日はカンパニーの月次提出日ゴシ。朝のうちに出しておくゴシ。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    companyMonthlyClose.start();
    */

    // 大晦日
    // 12/31 23:00
    const newyearsEve = new CronJob('0 0 23 31 12 *', () => {
        const room = { room: roomJson.general };
        const post = '<!channel> 今年もお世話になったゴシ。みなさま良いお年をゴシ。さて、「笑ってはいけない」見よっと。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    newyearsEve.start();

    // 新年
    // 1/1 8:00
    const newyear = new CronJob('0 0 8 1 1 *', () => {
        const room = { room: roomJson.general };
        const post = '<!channel> あけましておめでとうゴシ。今年もよろしくお願いしまゴシ。';
        robot.send(room, post);
    }, null, true, 'Asia/Tokyo');
    newyear.start();
};
