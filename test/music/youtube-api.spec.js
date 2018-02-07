/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music/youtube-api.js（music/youtube-api.spec.js）
 *   - パラメータ返却
 *   - APIリクエストの処理
*/
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('music/youtube-api.js', () => {
    it('パラメータがオブジェクトで返される', () => {
        // youtube-api.js内のimportをダミーに差し替え
        const YouTubeApi = proxyquire('../../src/music/youtube-api', {
            './constants': { KEY: 'test' }
        }).default;
        const youTubeApi = new YouTubeApi();
        const createParams = youTubeApi.createParams();
        const parmas = {
            'part': 'contentDetails',
            'playlistId': 'PLFgquLnL59alxIWnf4ivu5bjPeHSlsUe9',
            'maxResults': 50,
            'key': 'test'
        };
        assert.equal(typeof createParams, 'object');
        assert.deepEqual(createParams, parmas);
    });
    it('request()メソッドを呼ぶと正しく処理する', async () => {
        // youtube-api.js内のimportをダミーに差し替え
        const YouTubeApi = proxyquire('../../src/music/youtube-api', {
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
        }).default;
        const youTubeApi = new YouTubeApi();
        const data = await youTubeApi.request();
        const parmas = {
            'items': [
                {
                    'contentDetails': {
                        'videoId': 'baSDFqTuIKM'
                    }
                }
            ]
        };
        assert.equal(typeof data, 'object');
        assert.deepEqual(data, parmas);
    });
    it('request()メソッド内でエラーが発生するとErrorをthrowする（レスポンスステータスが200以外）', async () => {
        // youtube-api.js内のimportをダミーに差し替え
        const YouTubeApi = proxyquire('../../src/music/youtube-api', {
            'node-fetch': () => {
                return {
                    status: 500,
                    statusText: '500 Internal Server Error'
                };
            }
        }).default;
        const youTubeApi = new YouTubeApi();
        try {
            await youTubeApi.request();
            assert.fail();
        } catch (err) {
            assert.equal(typeof err.message, 'string');
            assert.equal(err.message, '500 Internal Server Error');
        }
    });
});
