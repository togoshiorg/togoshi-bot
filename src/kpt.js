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

    robot.respond(/kpt k (.*)/i, (res) => {
        if (!mode) return false;

        brainKeep.push(res.match[1]);
        res.send(`「${res.match[1]}」をKEEPに追加したゴシ！`);
    });

    robot.respond(/kpt p (.*)/i, (res) => {
        if (!mode) return false;

        brainProblem.push(res.match[1]);
        res.send(`「${res.match[1]}」をPROBLEMに追加したゴシ！`);
    });

    robot.respond(/kpt list k/i, (res) => {
        if (!mode) return false;

        if (brainKeep.length === 0) {
            res.send('KEEPはまだ0件だゴシ…。');
        } else {
            res.send('現在のKEEPはこれだけ出てるゴシよ。');
            brainKeep.forEach(elm => {
                res.send(`:ok_woman:「${elm}」`);
            });
        }
    });

    robot.respond(/kpt list p/i, (res) => {
        if (!mode) return false;

        if (brainKeep.length === 0) {
            res.send('PROBLEMはまだ0件だゴシ…。');
        } else {
            res.send('現在のPROBLEMはこれだけ出てるゴシよ。');
            brainProblem.forEach(elm => {
                res.send(`:no_good:「${elm}」`);
            });
        }
    });

    robot.respond(/kpt clear/i, (res) => {
        if (!mode) return false;

        brainKeep = [];
        brainProblem = [];
        res.send('KPTをすべてクリアしたゴシ！！');
    });

}
