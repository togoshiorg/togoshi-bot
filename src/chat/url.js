// @flow

import { KEY } from './constants';

export default class MakeUrl {
    api: string;
    msg: string;
    key: string;
    errMsg: string;
    params: Object;

    constructor (api: string, msg: string) {
        this.api = api;
        this.msg = msg;
        this.key = KEY;
        this.params = this.mkParams();
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
};
