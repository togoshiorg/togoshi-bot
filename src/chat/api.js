// @flow

import 'babel-polyfill';
import fetch from 'node-fetch';

// 共通エラーメッセージ
export const ERR_MSG: string = 'APIエラーゴシ・・・';

export default class AsyncApi {
    api: string;
    errMsg: string;

    constructor (api: string) {
        this.api = api;
        this.errMsg = ERR_MSG;
    }

    // APIをたたく
    // 本来は.http(url).query(queryParameter).get()でAPIたたけるけど勉強のため今回はあえてasyncで
    async getMsg (): string {
        try {
            const response = await fetch(this.api);
            const status = response.status;
            if (status !== 200) throw new Error(response.statusText);
            const data = await response.json();
            return data.result;
        } catch (err) {
            return this.errMsg + err;
        }
    }
};
