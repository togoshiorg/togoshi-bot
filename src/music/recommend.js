// @flow
import 'babel-polyfill';
import fetch from 'node-fetch';
import CreateApiUrl from './api';
import ReportMusic from './report';
import * as libs from './libs';
import { API, KEY, PLAYLIST_ID, MAX_RESULTS, PLAY_URL, RES } from './constants';

export default class RecommendMusic {
    api: string;
    key: string;
    id: string;
    max: number;
    url: string;
    res: Object;
    index: number;

    constructor () {
        this.api = API;
        this.key = KEY;
        this.id = PLAYLIST_ID;
        this.max = MAX_RESULTS;
        this.url = PLAY_URL;
        this.res = RES;
        this.index = libs.createIndex();
    }

    createApiUrl (): string {
        const createApiUrl = new CreateApiUrl(this.api, this.key, this.id, this.max);
        return createApiUrl.createUrl();
    }

    createMovieUrl (json: Object): string {
        const reportMusic = new ReportMusic(json, this.id, this.url, this.index);
        return reportMusic.movieUrl();
    }

    returnObject (url: string, text: string): Object {
        return {
            'url': url,
            'text': text
        };
    }

    async getRecommend (): Promise<any> {
        try {
            const response = await fetch(this.createApiUrl());
            const status = response.status;
            if (status !== 200) throw new Error(response.statusText);
            const json = await response.json();
            return this.returnObject(this.createMovieUrl(json), this.res.return);
        } catch (err) {
            return this.returnObject(err.message, this.res.error);
        }
    }
}
