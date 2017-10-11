/**
 * 雑談
 * ユーザーローカル社の人工知能ボットAPIを利用してtogoshi-botと雑談ができます。
 * http://ai.userlocal.jp/document/free/top/
*/

import 'babel-polyfill';
import AsyncApi from './chat/api';
import ChatJudge from './chat/judge';
import { CHAT_API, CHARA_API, KEY, RES } from './chat/constants';

module.exports = (robot) => {
    let isChatStart = false;

    // 雑談開始
    robot.respond(/お話しよう/, (res) => {
        const room = res.message.user.room;
        const chatJudge = new ChatJudge(room, isChatStart);
        if (chatJudge.isTogoshiDev() && !chatJudge.isChatting()) {
            res.send(RES.start);
            res.finish();
            isChatStart = chatJudge.isFlagChange();
        } else {
            res.send(RES.error);
            res.finish();
        }
    });

    // 雑談終了
    robot.hear(/お話おしまい/, (res) => {
        const room = res.message.user.room;
        const chatJudge = new ChatJudge(room, isChatStart);
        if (chatJudge.isTogoshiDev() && chatJudge.isChatting()) {
            res.send(RES.end);
            res.finish();
            isChatStart = chatJudge.isFlagChange();
        }
    });

    // 雑談中
    robot.hear(/(.*)/i, (res) => {
        const room = res.message.user.room;
        const chatJudge = new ChatJudge(room, isChatStart);
        if (chatJudge.isTogoshiDev() && chatJudge.isChatting()) {
            // 自動会話APIとキャラクター会話変換APIが別のため2回叩く
            (async () => {
                const midRes = await new AsyncApi(CHAT_API, KEY, res.match[1]).fetchMsg();
                const endRes = await new AsyncApi(CHARA_API, KEY, midRes).fetchMsg();
                res.send(endRes);
            })();
        }
    });
};
