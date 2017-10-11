/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music/api.js（music/api.spec.js）
 *   - パラメータ返却
 *   - URL返却
*/
import assert from 'assert';
import CreateApiUrl from '../../src/music/api';

describe('music/api.js', () => {
    let api;
    let key;
    let playlistId;
    let maxResults;
    let createApiUrl;
    beforeEach(() => {
        api = 'http://example.com/';
        key = 'hogehoge';
        playlistId = '12345';
        maxResults = 50;
        createApiUrl = new CreateApiUrl(api, key, playlistId, maxResults);
    });
    it('パラメータがオブジェクトで返される', () => {
        const params = {
            'part': 'contentDetails',
            'playlistId': playlistId,
            'maxResults': maxResults,
            'key': key
        };
        assert.equal(typeof createApiUrl.createParams(), 'object');
        assert.equal(createApiUrl.createParams().playlistId, params.playlistId);
        assert.equal(createApiUrl.createParams().maxResults, params.maxResults);
        assert.equal(createApiUrl.createParams().key, params.key);
    });
    it('パラメータがついたURLが返される', () => {
        const apiUrl = `http://example.com/?part=contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${key}`;
        assert.equal(typeof createApiUrl.createUrl(), 'string');
        assert.equal(createApiUrl.createUrl(), apiUrl);
    });
});
