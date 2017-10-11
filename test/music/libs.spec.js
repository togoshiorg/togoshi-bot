/**
 * # おすすめ音楽機能テスト
 * ## テスト項目
 * - music/libs.js（music/libs.spec.js）
 *   - URL生成
 *   - index返却
*/
import assert from 'assert';
import * as libs from '../../src/music/libs';

describe('music/api.js', () => {
    it('オブジェクトを読み込んでパラメータにし、URLを生成する', () => {
        const url = 'http://example.com/'
        const params = {
            'hoge': 123,
            'fuga': 456
        };
        assert.equal(typeof libs.createUrl(url, params), 'string');
        assert.equal(libs.createUrl(url, params), 'http://example.com/?hoge=123&fuga=456');
    });
    it('0〜49の数字が生成される', () => {
        assert.equal(typeof libs.createIndex(), 'number');
        assert(libs.createIndex() >= 0 && libs.createIndex() < 50);
    });
});
