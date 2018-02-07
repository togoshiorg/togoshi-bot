// @flow
import fetch from 'node-fetch';
import * as libs from './libs';
import { API, KEY, PLAYLIST_ID, MAX_RESULTS, PART } from './constants';

/**
 * YouTube Data APIにつないで日本の再生回数TOP50の曲目を取ってくる。
 */
export default class YouTubeApi {
    createParams (): Object {
        return {
            'part': PART,
            'playlistId': PLAYLIST_ID,
            'maxResults': MAX_RESULTS,
            'key': KEY
        };
    }

    async request (): Object {
        const url = libs.createUrl(API, this.createParams());
        const response = await fetch(url);
        const status = response.status;
        if (status !== 200) throw new Error(response.statusText);
        const data = await response.json();
        return data;
    }
}
