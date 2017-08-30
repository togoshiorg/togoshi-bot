/**
 * 雑談
 * ユーザーローカル社の人工知能ボットAPIを利用してtogoshi-botと雑談ができます。
 * http://ai.userlocal.jp/document/free/top/
*/

import 'babel-polyfill';
import AsyncApi from './chat/api';
import ChatJudge from './chat/judge';
import { CHAT_API, CHARA_API, RES } from './chat/constants';

module.exports = (robot) => {
    let isChatting = false;
    // 雑談開始
    robot.respond(/お話しよう/, (res) => {
        const chatJudge = new ChatJudge(res, isChatting);
        if (chatJudge.channelJudge() && !chatJudge.chatStartJudge()) {
            res.send(RES.start);
            res.finish();
            isChatting = chatJudge.changeChatFlag();
        }
    });

    // 雑談終了
    robot.hear(/お話おしまい/, (res) => {
        const chatJudge = new ChatJudge(res, isChatting);
        if (chatJudge.channelJudge() && chatJudge.chatStartJudge()) {
            res.send(RES.end);
            res.finish();
            isChatting = chatJudge.changeChatFlag();
        }
    });

    // 雑談中
    robot.hear(/(.*)/i, (res) => {
        const chatJudge = new ChatJudge(res, isChatting);
        if (chatJudge.channelJudge() && chatJudge.chatStartJudge()) {
            // 自動会話APIとキャラクター会話変換APIが別のため2回叩く
            (async () => {
                const midRes = await new AsyncApi(CHAT_API, res.match[1]);
                const endRes = await new AsyncApi(CHARA_API, midRes.getMsg());
                res.send('hogehoge');
                res.send(endRes.getMsg());
            })();
        }
    });
};
