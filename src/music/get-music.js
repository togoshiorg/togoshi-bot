// @flow

import * as libs from './libs';
import { PLAYLIST_ID, PLAY_URL, RES } from './constants';

type Request = {
    createParams (): Object;
    request (): Object;
}

export default class GetMusic {
    requestApi: Request;

    constructor (RequestApi: Class<Request>) {
        this.requestApi = new RequestApi();
    }

    createIndex (): number {
        return libs.createRandomNum();
    };

    createParams (id: string): Object {
        return {
            'v': id,
            'list': PLAYLIST_ID
        };
    }

    createObject (data: string, message: string): Object {
        return {
            'data': data,
            'message': message
        };
    }

    async returnData (): Object {
        try {
            const data = await this.requestApi.request();
            const id = data.items[this.createIndex()].contentDetails.videoId;
            const url = libs.createUrl(PLAY_URL, this.createParams(id));
            return this.createObject(url, RES.success);
        } catch (err) {
            return this.createObject(err.message, RES.error);
        }
    }
}
