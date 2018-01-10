// @flow
import * as libs from './libs';

// API
export default class ReportMusic {
    items: Object;
    listId: string;
    playUrl: string;
    index: number;
    playId: string;
    params: Object;

    constructor ({ items }: Object, listId: string, playUrl: string, index: number) {
        this.items = items; // APIから取得した曲一覧

        this.listId = listId;
        this.playUrl = playUrl;
        this.index = index;

        this.playId = this.createId();
        this.params = this.createParams();
    }

    createId ():string {
        return this.items[this.index].contentDetails.videoId;
    }

    createParams ():Object {
        return {
            'v': this.playId,
            'list': this.listId
        };
    }

    movieUrl ():string {
        return libs.createUrl(this.playUrl, this.params);
    }
}
