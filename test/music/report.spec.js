/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music/report.js（music/url.report.js）
 *   - index返却
 *   - 動画ID返却
 *   - パラメータ返却
 *   - URL返却
*/
import assert from 'assert';
import ReportMusic from '../../src/music/report';

describe('music/report.js', () => {
    let json;
    let playlistId;
    let playUrl;
    let index;
    let reportMusic;
    const videoId = 'baSDFqTuIKM';
    beforeEach(() => {
        json = {
            'items': [
                { 'contentDetails': { 'videoId': videoId } }
            ]
        };
        playlistId = '12345';
        playUrl = 'http://example.com/';
        index = 0;
        reportMusic = new ReportMusic(json, playlistId, playUrl, index);
    });
    it('jsonからIDが返される', () => {
        assert.equal(typeof reportMusic.createId(), 'string');
        assert.equal(reportMusic.createId(), 'baSDFqTuIKM');
    });
    it('パラメータがオブジェクトで返される', () => {
        const params = {
            'v': videoId,
            'list': playlistId
        };
        assert.equal(typeof reportMusic.createParams(), 'object');
        assert.equal(reportMusic.createParams().v, params.v);
        assert.equal(reportMusic.createParams().list, params.list);
    });
    it('パラメータがついたURLが返される', () => {
        const playUrl = `http://example.com/?v=${videoId}&list=${playlistId}`;
        assert.equal(typeof reportMusic.movieUrl(), 'string');
        assert.equal(reportMusic.movieUrl(), playUrl);
    });
});
