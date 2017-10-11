// @flow
import * as libs from './libs';

// API
export default class CreateApiUrl {
    api: string;
    key: string;
    listId: string;
    maxNum: number;
    params: Object;

    constructor (api: string, key: string, listId: string, maxNum: number) {
        this.api = api;
        this.key = key;
        this.listId = listId;
        this.maxNum = maxNum;
        this.params = this.createParams();
    }

    createParams ():Object {
        return {
            'part': 'contentDetails',
            'playlistId': this.listId,
            'maxResults': this.maxNum,
            'key': this.key
        };
    }

    createUrl ():string {
        return libs.createUrl(this.api, this.params);
    }
}
