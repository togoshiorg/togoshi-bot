/**
 * # 雑談機能テスト
 * ## テスト項目
 * - chat.js
 *   -
 * - chat/judge.js（chat/judge.spec.js）
 *   - 起動ch判定
 *   - 雑談開始判定
 *   - 雑談フラグ切替
 * - chat/url.js（chat/url.spec.js）
 *   - クエリ生成
 *   - URL生成
 * - chat/api.js（chat/api.spec.js）
 *   - API通信
*/
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('chat.js', () => {
    let dummyCommon;
    let chatRoom;
    let robot;
    let res;

    beforeEach(() => {
        // ダミーデータ（共通）
        dummyCommon = {
            './chat/constants': {
                RES: {
                    start: 'いいゴシよ！',
                    end: '楽しかったゴシ！またお話しようゴシ〜',
                    error: 'ここではお話できないゴシ…'
                }
            }
        };
        // ダミーrobot
        robot = {
            respond: (pattern, func) => {
                robot[new RegExp(pattern)] = func;
            },
            hear: (pattern, func) => {
                robot[new RegExp(pattern)] = func;
            }
        };
        // ダミーチャットルーム
        chatRoom = {
            general: 'C04QLTK0C',
            hubot: 'C0CT4RTQF'
        };
        // ダミーres
        res = {
            message: {
                user: {
                    name: 'admin',
                    room: chatRoom.hubot // ch hubot
                }
            },
            match: [],
            messages: [],
            send: (message) => {
                // 検証用にmessageを格納
                res.messages.push(message);
            },
            finish: () => {
                return false;
            }
        };
    });

    it('「@togoshi-bot お話しよう」が正しく処理される', async () => {
        // chat.js内のimportをダミーに差し替え
        proxyquire('../src/chat', dummyCommon)(robot);
        res.messages = [];
        await robot['/お話しよう/'](res);

        assert.equal(res.messages[0], 'いいゴシよ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });
    it('「@togoshi-bot お話しよう」を別の部屋で話しかける', async () => {
        // chat.js内のimportをダミーに差し替え
        proxyquire('../src/chat', dummyCommon)(robot);
        res.message.user.room = chatRoom.general;
        res.messages = [];
        await robot['/お話しよう/'](res);

        assert.equal(res.messages[0], 'ここではお話できないゴシ…');
        assert.equal(typeof res.messages[1], 'undefined');
    });
    it('「お話おしまい」が正しく処理される', async () => {
        // chat.js内のimportをダミーに差し替え
        const dummyEnd = {
            './chat/judge': {
                default: class ChatJudge {
                    channelJudge () { return true; }
                    chatStartJudge () { return true; }
                    changeChatFlag () { return false; }
                }
            }
        };
        proxyquire('../src/chat', Object.assign(dummyCommon, dummyEnd))(robot);
        res.messages = [];
        await robot['/お話おしまい/'](res);

        assert.equal(res.messages[0], '楽しかったゴシ！またお話しようゴシ〜');
        assert.equal(typeof res.messages[1], 'undefined');
    });
    it('「****」が正しく処理される', async () => {
        // chat.js内のimportをダミーに差し替え
        const dummyMisdst = {
            './chat/judge': {
                default: class ChatJudge {
                    channelJudge () { return true; }
                    chatStartJudge () { return true; }
                    changeChatFlag () { return true; }
                }
            },
            './chat/api': {
                default: class AsyncApi {
                    getMsg () { return '通信成功ゴシ！'; }
                }
            }
        };
        proxyquire('../src/chat', Object.assign(dummyCommon, dummyMisdst))(robot);
        res.match = ['', 'hogehoge'];
        res.messages = [];
        await await robot['/(.*)/i'](res);

        assert.equal(res.messages[0], '通信成功ゴシ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });
});
