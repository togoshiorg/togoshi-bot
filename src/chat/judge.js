// @flow

import roomJson from '../../data/room.json';

export default class ChatJudge {
    room: string;
    isChatting: boolean;

    constructor (room: string, bool: boolean) {
        this.room = room;
        this.isChatting = bool;
    }

    // 起動するchを判定
    channelJudge (): boolean {
        const room = roomJson.hubot;
        return room === this.room;
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
