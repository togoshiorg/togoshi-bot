// @flow

import roomJson from '../../data/room.json';

export default class ChatJudge {
    res: string;
    isChatting: boolean;

    constructor (res: string, bool: boolean) {
        this.res = res;
        this.isChatting = bool;
    }

    // 起動するchを判定
    channelJudge (): boolean {
        const room = roomJson.hubot;
        return room === this.res.message.user.room;
    }

    // 雑談が開始してるか判定
    chatStartJudge (): boolean {
        return this.isChatting;
    }

    // 雑談フラグの切り替え
    changeChatFlag (): boolean {
        return !this.isChatting || false;
    }
}
