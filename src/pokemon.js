/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import {getPokeComment} from './module/pokemon-module';

module.exports = (robot) => {
    const resultComment = getPokeComment();
    robot.respond(/get pokemon/, (res) => {
        res.send(':pokeball: 捕まえてくるゴシ。。。。。');
        res.send(resultComment);
    });
}
