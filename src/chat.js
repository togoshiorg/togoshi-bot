/**
 * 雑談
 * ユーザーローカル社の人工知能ボットAPIを利用してtogoshi-botと雑談ができます。
 * http://ai.userlocal.jp/document/free/top/
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import roomJson from '../data/room.json';

module.exports = (robot) => {
    const chatApi = 'https://chatbot-api.userlocal.jp/api/chat';
    const charaApi = 'https://chatbot-api.userlocal.jp/api/character';
    const errMsg = 'APIエラーゴシ・・・';
    const key = process.env.HUBOT_USERLOCAL_API_KEY;
    const chatRoom = roomJson.hubot;
    const chatJudge = (res, bool) => {
        bool = chatTerms || !chatTerms;
        return res.message.user.room === chatRoom && bool;
    };
    const apiUrl = (api, paramsArr) => {
        let url = api;
        for (let key in paramsArr) {
            url += (url.indexOf('?') === -1) ? '?' : '&';
            url += key + '=' + paramsArr[key];
        };
        return url;
    };

    let chatTerms = false;

    // 雑談開始
    robot.respond(/お話しよう/, (res) => {
        if (chatJudge(res, chatTerms)) {
            res.send('いいゴシよ！');
            res.finish();
            chatTerms = true;
        }
    });

    // 雑談終了
    robot.hear(/お話おしまい/, (res) => {
        if (chatJudge(res, chatTerms)) {
            res.send('楽しかったゴシ！またお話しようゴシ〜');
            res.finish();
            chatTerms = false;
        }
    });

    // 雑談中
    robot.hear(/(.*)/i, (res) => {
        if (chatJudge(res, chatTerms)) {
            // 本来は.http(url).query(queryParameter).get()でAPIたたけるけど勉強のため今回はあえてasyncで
            const params = (msg) => {
                return {
                    'key': key,
                    'message': encodeURIComponent(msg),
                    'character_type': 'custom'
                };
            };
            const asyncApi = async (api, resMsg) => {
                try {
                    const response = await fetch(apiUrl(api, params(resMsg)));
                    const status = response.status;
                    if (status !== 200) throw new Error(response.statusText);
                    const data = await response.json();
                    return data.result;
                } catch (err) {
                    return errMsg + err;
                }
            };
            // 自動会話APIとキャラクター会話変換APIが別のため2回叩く
            (async () => {
                const midRes = await asyncApi(chatApi, res.match[1]);
                const endRes = await asyncApi(charaApi, midRes);
                res.send(endRes);
            })();
        }
    });
};
