/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music.js（music.spec.js）
 *   - 返答とURLを返す
 * - music/api.js（music/api.spec.js）
 *   - パラメータ返却
 *   - URL返却
 * - music/report.js（music/url.report.js）
 *   - 動画ID返却
 *   - パラメータ返却
 *   - URL返却
 * - music/libs.js（music/libs.spec.js）
 *   - URL生成
 *   - index返却
*/
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('music.js', () => {
    let dummyCommon;
    let robot;
    let res;
    beforeEach(() => {
        dummyCommon = {
            './music/constants': {
                'RES': {
                    'return': 'この曲がおすすめゴシ！',
                    'error': 'おすすめを探せなかったゴシ…'
                }
            }
        };
        robot = {
            respond: (pattern, func) => {
                robot[new RegExp(pattern)] = func;
            }
        };
        res = {
            'message': {
                'user': {
                    'name': 'hogehoge'
                }
            },
            'messages': [],
            'send': (message) => {
                // 検証用にmessageを格納
                res.messages.push(message);
            }
        };
    });
    it('「"オススメ、オヌヌメ等"の曲」に返答する（Success）', async () => {
        // music.js内のimportをダミーに差し替え
        const dummySuccess = {
            './music/report': {
                'default': class ReportMusic {
                    createId () { return 0; }
                    movieUrl () { return 'https://example.com/movie/'; }
                }
            },
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => {
                        return {
                            'items': [
                                {
                                    'contentDetails': {
                                        'videoId': 'baSDFqTuIKM'
                                    }
                                }
                            ]
                        };
                    }
                };
            }
        };
        proxyquire('../src/music', Object.assign(dummyCommon, dummySuccess))(robot);
        // 「オススメ〜〜曲〜〜〜」の呼び出し
        res.messages = [];
        await await await robot['/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/'](res);

        assert.equal(res.messages[0], 'https://example.com/movie/');
        assert.equal(res.messages[1], 'この曲がおすすめゴシ！');
        assert.equal(typeof res.messages[2], 'undefined');
    });
    it('「"オススメ、オヌヌメ等"の曲」に返答する（Error）', async () => {
        // music.js内のimportをダミーに差し替え
        const dummyError = {
            'node-fetch': () => {
                return {
                    status: 401,
                    json: () => {
                        return {
                            'items': {
                                'contentDetails': {
                                    'videoId': 'baSDFqTuIKM'
                                }
                            }
                        };
                    }
                };
            }
        };
        proxyquire('../src/music', Object.assign(dummyCommon, dummyError))(robot);
        // 「オススメ〜〜曲〜〜〜」の呼び出し
        res.messages = [];
        await await robot['/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/'](res);

        assert.equal(res.messages[0], 'おすすめを探せなかったゴシ…Error');
        assert.equal(typeof res.messages[2], 'undefined');
    });
});
