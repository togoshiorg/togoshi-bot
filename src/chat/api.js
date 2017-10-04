// @flow

import 'babel-polyfill';
import fetch from 'node-fetch';

// 共通エラーメッセージ
export const ERR_MSG: string = 'APIエラーゴシ・・・';

export default class AsyncApi {
    api: string;
    msg: string;
    key: string;
    errMsg: string;
    params: Object;
    url: string;

    constructor (api: string, key: string, msg: string) {
        this.api = api;
        this.key = key;
        this.msg = msg;
        this.errMsg = ERR_MSG;
        this.params = this.mkParams();
        this.url = this.mkUrl();
    }

    // urlに渡すクエリを生成
    mkParams (): Object {
        return {
            'key': this.key,
            'message': encodeURI(this.msg),
            'character_type': 'custom'
        };
    }

    // たたくurlを作成
    mkUrl (): string {
        let url = this.api;
        for (let key in this.params) {
            url += (url.indexOf('?') === -1) ? '?' : '&';
            url += key + '=' + this.params[key];
        };
        return url;
    }

    // APIをたたく
    // 本来は.http(url).query(queryParameter).get()でAPIたたけるけど勉強のため今回はあえてasyncで
    async getMsg (): Promise<any> {
        try {
            const response = await fetch(this.url);
            const status = response.status;
            if (status !== 200) throw new Error(response.statusText);
            const data = await response.json();
            return data.result;
        } catch (err) {
            return this.errMsg + err;
        }
    }
};
