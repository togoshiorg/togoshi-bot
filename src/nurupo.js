module.exports = (robot) => {
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
