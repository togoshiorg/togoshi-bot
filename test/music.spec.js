/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music.js（music.spec.js）
 *   - 返答とURLを返す
 * - music/get-music.js（music/get-music.spec.js）
 *   - API通信
 * - music/youtube-api.js（music/youtube-api.spec.js）
 *   - パラメータ返却
 *   - URL返却
 * - music/libs.js（music/libs.spec.js）
 *   - URL生成
*/
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('music.js', () => {
    let robot;
    let res;
    beforeEach(() => {
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
    it('「"オススメ、オヌヌメ等"の曲」に返答する', async () => {
        // music.js内のimportをダミーに差し替え
        proxyquire('../src/music', {
            './music/get-music': {
                'default': class GetMusic {
                    returnData () {
                        return {
                            data: 'https://example.com/movie/',
                            message: 'この曲がおすすめゴシ！'
                        };
                    }
                }
            }
        })(robot);
        // 「オススメ〜〜曲〜〜〜」の呼び出し
        res.messages = [];
        await await await robot['/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/'](res);

        assert.equal(res.messages[0], 'https://example.com/movie/');
        assert.equal(res.messages[1], 'この曲がおすすめゴシ！');
        assert.equal(typeof res.messages[2], 'undefined');
    });
});
