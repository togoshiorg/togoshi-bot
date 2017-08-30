import assert from 'assert';
import proxyquire from 'proxyquire';

describe('chat.js', () => {
    let dummyCommon;
    let robot;
    let res;
    beforeEach(() => {
        // ダミーデータ（共通）
        dummyCommon = {
            './chat/constants': {
                RES: {
                    start: 'いいゴシよ！',
                    end: '楽しかったゴシ！またお話しようゴシ〜'
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
        // ダミーres
        res = {
            message: {
                user: {
                    name: 'admin',
                    room: 'C0CT4RTQF' // ch hubot
                }
            },
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

    it('雑談を開始しようとした時に、botが特定の発言をする', async () => {
        proxyquire('../src/chat', dummyCommon)(robot);
        res.messages = [];
        await robot['/お話しよう/'](res);

        assert.equal(res.messages[0], 'いいゴシよ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('雑談を終了した時に、botが特定の発言をする', async () => {
        proxyquire('../src/chat', dummyCommon)(robot);
        res.messages = [];
        await robot['/お話おしまい/'](res);

        assert.equal(res.messages[0], '楽しかったゴシ！またお話しようゴシ〜');
        assert.equal(typeof res.messages[1], 'undefined');
    });
    it('APIが正しく処理される（正常）', async () => {
        // ダミーデータ（正常系）
        const dummySuccess = {
            'node-fetch': () => {
                return {
                    status: 200,
                    result: 'テストやで'
                };
            }
        };
        // chat.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', Object.assign(dummyCommon, dummySuccess))(robot);
        res.messages = [];
        await robot['/hogehoge/'](res);

        assert.equal(res.messages[0], 'テストやで');
        assert.equal(typeof res.messages[1], 'undefined');
    });
    it('APIが正しく処理される（異常）', async () => {
        // ダミーデータ（正常系）
        const dummySuccess = {
            'node-fetch': () => {
                return {
                    status: 404,
                    result: ''
                };
            }
        };
        // chat.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', Object.assign(dummyCommon, dummySuccess))(robot);
        res.messages = [];
        await robot['/hogehoge/'](res);

        assert.equal(res.messages[0], '');
        assert.equal(typeof res.messages[1], 'undefined');

    });
});
