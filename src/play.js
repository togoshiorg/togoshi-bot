module.exports = (robot) => {
    robot.hear(/.*調子.*/, (res) => {
        const post = res.random([
            ':very_good:',
            ':good:',
            ':normal:',
            ':bad:',
            ':very_bad:'
        ]);
        res.send(post);
    });

    robot.hear(/銀次郎くん！/, (res) => {
        res.send('はいゴシ！');
    });

    robot.hear(/うるさい/, (res) => {
        res.send('なんだとゴシ！');
    });

    robot.hear(/.*頭高くない.*/, (res) => {
        res.send('どうする兄ちゃん');
        res.send('http://weekly.ascii.jp/elem/000/000/280/280817/1204nabe01_1200x.jpg');
    });

    robot.hear(/@togoshi-bot Hello/, (res) => {
        const user = res.message.user.name;
        res.send('Hello, ' + user);
    });
}
