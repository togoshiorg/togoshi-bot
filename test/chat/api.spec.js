/**
 * # 雑談機能テスト
 * ## テスト項目
 * - chat/api.js（chat/api.spec.js）
 *   - API通信
*/

import assert from 'assert';
import proxyquire from 'proxyquire';
import AsyncApi from '../../src/chat/api';

describe('chat/api.js', () => {
    let api;
    let key;
    let msg;

    beforeEach(() => {
        // URL生成用ダミーデータ
        api = 'http://exapmle.com/';
        key = 'exapmle';
        msg = 'hogehoge';
    });

    it('APIのURLに渡すクエリがオブジェクトとして生成される', () => {
        const obj = new AsyncApi(api, key, msg).mkParams();

        assert.equal(typeof obj, 'object');
        assert.equal(obj.key, 'exapmle');
        assert.equal(obj.message, 'hogehoge');
        assert.equal(obj.character_type, 'custom');
    });

    it('APIのURLが生成される', () => {
        const url = new AsyncApi(api, key, msg).mkUrl();

        assert.equal(typeof url, 'string');
        assert.equal(url, 'http://exapmle.com/?key=exapmle&message=hogehoge&character_type=custom');
    });

    it('API通信が処理される（Success）', async () => {
        const AsyncApi = proxyquire('../../src/chat/api', {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => {
                        return { status: 'success', result: '通信成功ゴシ！' };
                    }
                };
            }
        }).default;
        const returnTxt = await new AsyncApi(api, key, msg).getMsg();
        assert.equal(returnTxt, '通信成功ゴシ！');
    });

    it('API通信が処理される（Error）', async () => {
        const AsyncApi = proxyquire('../../src/chat/api', {
            'node-fetch': () => {
                return {
                    status: 404,
                    json: () => {
                        return { status: '', result: '' };
                    }
                };
            }
        }).default;
        const returnTxt = await new AsyncApi(api, key, msg).getMsg();
        assert.equal(returnTxt, 'APIエラーゴシ・・・Error');
    });
});
