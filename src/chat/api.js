// @flow

import fetch from 'node-fetch';
import { KEY } from './constants';

// 共通エラーメッセージ
export const ERR_MSG: string = 'APIエラーゴシ・・・';

export default class AsyncApi {
    api: string;
    msg: string;
    key: string;
    errMsg: string;
    params: Object;
    apiUrl: string;

    constructor (api: string, msg: string) {
        this.api = api;
        this.msg = msg;
        this.key = KEY;
        this.errMsg = ERR_MSG;
        this.params = this.mkParams();
        this.apiUrl = this.mkApiUrl();
    }

    // urlに渡すクエリを生成
    mkParams (): Object {
        return {
            'key': this.key,
            'message': encodeURIComponent(this.msg),
            'character_type': 'custom'
        };
    }

    // たたくurlを作成
    mkApiUrl (): string {
        let url = this.api;
        for (let key in this.params) {
            url += (url.indexOf('?') === -1) ? '?' : '&';
            url += key + '=' + this.params[key];
        };
        return url;
    }

    // APIをたたく
    getMsg (): string {
        // 本来は.http(url).query(queryParameter).get()でAPIたたけるけど勉強のため今回はあえてasyncで
        (async () => {
            try {
                const response = await fetch(this.apiUrl);
                const status = response.status;
                if (status !== 200) throw new Error(response.statusText);
                const data = await response.json();
                return data.result;
            } catch (err) {
                return this.errMsg + err;
            }
        })();
    }
};
