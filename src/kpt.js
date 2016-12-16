/**
 * KPT
*/

module.exports = (robot) => {

    // KPTモードのON/OFF
    let mode = false;
    robot.respond(/kpt mode (.*)/i, (res) => {
        console.log(res.match[0], res.match[1]);
        if (res.match[1] === 'on') {
            mode = true;
            res.send('KPTモードがONになったゴシ！振り返るゴシ〜！');
        } else if (res.match[1] === 'off') {
            mode = false;
            res.send('KPTモードがOFFになったゴシ！お疲れ様ゴシ。');
        } else {
            res.send('指定が間違ってるゴシ。 `on` か `off` しか受け付けてないゴシ。');
        }
    });

    let brainKeep = robot.brain.get('keep') || [];
    let brainProblem = robot.brain.get('problem') || [];

    // 追加
    const addItem = (brain, type, msg) => {
        brain.push(msg);
        res.send(`「${msg}」を${type}に追加したゴシ！`);
    };
    robot.respond(/kpt k (.*)/i, (res) => {
        if (!mode) return false;
        addItem(brainKeep, 'KEEP', res.match[1]);
    });
    robot.respond(/kpt p (.*)/i, (res) => {
        if (!mode) return false;
        addItem(brainProblem, 'PROBLEM', res.match[1]);
    });

    // 一覧の確認
    const showList = (brain, type, emoji) => {
        if (brain.length === 0) {
            res.send('${type}はまだ0件だゴシ…。');
        } else {
            res.send('現在の${type}はこれだけ出てるゴシよ。');
            brain.forEach(elm => {
                res.send(`${emoji}「${elm}」`);
            });
        }
    };
    robot.respond(/kpt list k/i, (res) => {
        if (!mode) return false;
        showList(brainKeep, 'KEEP', ':ok_woman:');
    });
    robot.respond(/kpt list p/i, (res) => {
        if (!mode) return false;
        showList(brainProblem, 'PROBLEM', ':no_good:');
    });

    // 一覧のクリア
    robot.respond(/kpt clear/i, (res) => {
        if (!mode) return false;

        brainKeep = [];
        brainProblem = [];
        res.send('KPTをすべてクリアしたゴシ！！');
    });

    // ヘルプ
    robot.respond(/kpt help/i, (res) => {
        res.send(`
KPT機能を紹介するゴシ！

:arrows_counterclockwise: kpt mode {on|off} - KPT機能を有効にするかを切り替え
:heavy_plus_sign: kpt k {*} - KEEPを追加
:heavy_minus_sign: kpt p {*} - PROBLEMを追加
:bookmark: kpt list {k|p} - 今までに追加したKEEP/PROBLEMを参照
:boom: kpt clear - 今までに追加したものをすべて削除
:beginner: kpt help - いま見ているコレ

振り返りが終わったら、clearしてmode offを忘れずにゴシ！
        `);
    });
}
