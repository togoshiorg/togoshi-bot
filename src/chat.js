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

    let key = process.env.HUBOT_USERLOCAL_API_KEY;
    let chatRoom = roomJson.hubot;
    let roomJudge = (res) => {
        const resRoom = res.message.user.room;
        return resRoom === chatRoom;
    };
    let apiUrl = (api, paramsArr) => {
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
        if (roomJudge(res) && !chatTerms) {
            res.send('いいゴシよ！');
            res.finish();
            chatTerms = true;
        }
    });

    // 雑談終了
    robot.hear(/お話おしまい/, (res) => {
        if (roomJudge(res) && chatTerms) {
            res.send('楽しかったゴシ！またお話しようゴシ〜');
            res.finish();
            chatTerms = false;
        }
    });

    // 雑談中
    robot.hear(/(.*)/i, (res) => {
        if (roomJudge(res) && chatTerms) {
            // 本来は.http(url).query(queryParameter).get()でAPIたたけるけど勉強のため今回はあえてasyncで
            let params = (msg) => {
                let obj = {
                    'key': key,
                    'message': encodeURIComponent(msg),
                    'character_type': 'custom'
                };
                return obj;
            };
            let asyncApi = async (api, resMsg) => {
                try {
                    let response = await fetch(apiUrl(api, params(resMsg)));
                    let status = response.status;
                    if (status !== 200) {
                        return errMsg;
                    }
                    let data = await response.json();
                    return data.result;
                } catch (err) {
                    return errMsg;
                }
            };
            // 自動会話APIとキャラクター会話変換APIが別のため2回叩く
            (async () => {
                let midRes = await asyncApi(chatApi, res.match[1]);
                let endRes = await asyncApi(charaApi, midRes);
                res.send(endRes);
            })();
        }
    });
};
