/**
 * KPT
*/

module.exports = (robot) => {

    // KPTモードのON/OFF
    let mode = false;
    robot.respond(/kptmode (.*)/i, (res) => {
        if (res.match[0] === 'on') {
            mode = true;
            res.send('KPTモードがONになったゴシ！振り返るゴシ〜！');
        } else if (res.match[0] === 'off') {
            mode = false;
            res.send('KPTモードがOFFになったゴシ！お疲れ様ゴシ。');
        } else {
            res.send('指定が間違ってるゴシ。 `on` か `off` しか受け付けてないゴシ。');
        }
    });

    let brainKeep = robot.brain.get('keep') || [];
    let brainProblem = robot.brain.get('problem') || [];

    robot.respond(/k (.*)/i, (res) => {
        if (!mode) return false;

        brainKeep.push(res.match[0]);
        res.send(res.match[0] + 'をKEEPに追加したゴシ！');
    });

    robot.respond(/p (.*)/i, (res) => {
        if (!mode) return false;

        brainProblem.push(res.match[0]);
        res.send(res.match[0] + 'をPROBLEMに追加したゴシ！');
    });

    robot.respond(/k list/i, (res) => {
        if (!mode) return false;

        res.send('現在のKEEPはこれだけ出てるゴシよ。');
        brainKeep.forEach(elm => {
            res.send(':ok_woman:' + elm);
        });
    });

    robot.respond(/p list/i, (res) => {
        if (!mode) return false;

        res.send('現在のPROBLEMはこれだけ出てるゴシよ。');
        brainProblem.forEach(elm => {
            res.send(':no_good:' + elm);
        });
    });

    robot.respond(/kpt clear/i, (res) => {
        if (!mode) return false;

        brainKeep = [];
        brainProblem = [];
        res.send('KPTをすべてクリアしたゴシ！！');
    });

}
