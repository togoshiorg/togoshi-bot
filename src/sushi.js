/**
 * 疎通確認用簡易script
 * 「すし」に反応して寿司絵文字を返します。
*/

module.exports = (robot) => {
    robot.hear(/すし/, (res) => {
        res.send(':sushi:');
    });
}
