/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music/recommend.js（music/recommend.spec.js）
 *   - APIURL生成
 *   - 動画URL生成
 *   - 発言用オブジェクト生成
 *   - API通信
*/
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('music/recommend.js', () => {
    it('APIのURLが生成される', () => {
        const RecommendMusic = proxyquire('../../src/music/recommend', {
            './api': {
                'default': class CreateApiUrl {
                    createUrl () { return 'http://example.com/api/'; }
                }
            }
        }).default;
        const apiUrl = new RecommendMusic().createApiUrl();
        assert.equal(typeof apiUrl, 'string');
        assert.equal(apiUrl, 'http://example.com/api/');
    });
    it('動画URLが生成される', () => {
        const RecommendMusic = proxyquire('../../src/music/recommend', {
            './report': {
                'default': class ReportMusic {
                    movieUrl () { return 'http://example.com/movie/'; }
                }
            }
        }).default;
        const movieUrl = new RecommendMusic().createMovieUrl();
        assert.equal(typeof movieUrl, 'string');
        assert.equal(movieUrl, 'http://example.com/movie/');
    });
    it('発言用のオブジェクトが生成される', () => {
        const RecommendMusic = proxyquire('../../src/music/recommend', {}).default;
        const url = 'http://example.com/movie/';
        const text = 'hogehoge';
        const returnObject = new RecommendMusic().returnObject(url, text);
        assert.equal(typeof returnObject, 'object');
        assert.deepEqual(returnObject, { url: 'http://example.com/movie/', text: 'hogehoge' });
    });
    it('発言用のオブジェクトが返される(Success)', async () => {
        const RecommendMusic = proxyquire('../../src/music/recommend', {
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
            },
            './report': {
                'default': class ReportMusic {
                    movieUrl () { return 'http://example.com/movie/'; }
                }
            }
        }).default;
        const recommend = await new RecommendMusic().getRecommend();
        assert.equal(typeof recommend, 'object');
        assert.deepEqual(recommend, { url: 'http://example.com/movie/', text: 'この曲がおすすめゴシ！' });
    });
    it('発言用のオブジェクトが返される(Error)', async () => {
        const RecommendMusic = proxyquire('../../src/music/recommend', {
            'node-fetch': () => {
                return {
                    status: 500,
                    statusText: '500 Internal Server Error'
                };
            }
        }).default;
        const recommend = await new RecommendMusic().getRecommend();
        assert.equal(typeof recommend, 'object');
        assert.deepEqual(recommend, { url: '500 Internal Server Error', text: 'おすすめを探せなかったゴシ…' });
    });
});
