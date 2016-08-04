/**
 * お遊びscript詰め合わせ
*/

module.exports = (robot) => {
    robot.hear(/銀次郎くん！/, (res) => res.send('はいゴシ！'));
    robot.hear(/うるさい/, (res) => res.send('なんだとゴシ！'));

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

    robot.hear(/.*頭高くない.*/, (res) => {
        res.send('どうする兄ちゃん');
        res.send('http://weekly.ascii.jp/elem/000/000/280/280817/1204nabe01_1200x.jpg');
    });

    robot.hear(/ぬるぽ|nurupo|ヌルポ/, (res) => {
        const user = res.message.user.name;
        res.send(`
\`\`\`
   Λ＿Λ     ＼＼
（  ・∀・）  | | ｶﾞｯゴシ！
 と     ）  | |
  Ｙ /ノ     人
   / ）    < >   _Λ  ∩
＿/し'   ／／  Ｖ｀Д´）/
（＿フ彡             / ←>> @${user}
\`\`\`
        `);
    });
}
