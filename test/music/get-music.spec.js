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
import GetMusic from '../../src/music/get-music';

// RequestApiのMockクラス
class RequestApiMock {
    request () {
        return {
            'items': [
                {
                    'contentDetails': {
                        'videoId': 'test'
                    }
                }
            ]
        };
    }
}
class RequestApiMockError {
    request () { throw new Error(); }
}

describe('music/get-music.js', () => {
    it('パラメータがオブジェクトで返される', () => {
        const getMusic = new GetMusic(RequestApiMock);
        const id = 'test';
        const createParams = getMusic.createParams(id);
        assert.equal(typeof createParams, 'object');
        assert.deepEqual(createParams, { 'v': 'test', 'list': 'PLFgquLnL59alxIWnf4ivu5bjPeHSlsUe9' });
    });
    it('発言用のオブジェクトが生成される', () => {
        const getMusic = new GetMusic(RequestApiMock);
        const data = 'hoge';
        const message = 'fuga';
        const createObject = getMusic.createObject(data, message);
        assert.equal(typeof createObject, 'object');
        assert.deepEqual(createObject, { 'data': 'hoge', 'message': 'fuga' });
    });
    it('発言用のオブジェクトが返される(Success)', async () => {
        // get-music.js内のmethodをダミーに差し替え
        const GetMusic = proxyquire('../../src/music/get-music', {
            './libs': {
                createRandomNum () {
                    return 0;
                }
            }
        }).default;
        const getMusic = new GetMusic(RequestApiMock);
        const returnData = await getMusic.returnData();
        assert.equal(typeof returnData, 'object');
        assert.deepEqual(returnData, { data: 'https://www.youtube.com/watch?v=test&list=PLFgquLnL59alxIWnf4ivu5bjPeHSlsUe9', message: 'この曲がおすすめゴシ！' });
    });
    it('発言用のオブジェクトが返される(Error)', async () => {
        const getMusic = new GetMusic(RequestApiMockError);
        const returnData = await getMusic.returnData();
        assert.equal(typeof returnData, 'object');
        assert.deepEqual(returnData, { data: '', message: 'おすすめを探せなかったゴシ…' });
    });
});
