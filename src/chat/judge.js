// @flow

import roomJson from '../../data/room.json';

export default class ChatJudge {
    room: string;
    isChatStart: boolean;

    constructor (room: string, bool: boolean) {
        this.room = room;
        this.isChatStart = bool;
    }

    // 起動するchを判定
    isTogoshiDev (): boolean {
        const room = roomJson.togoshiDev;
        return room === this.room;
    }

    // 雑談が開始してるか判定
    isChatting (): boolean {
        return this.isChatStart;
    }

    // 雑談フラグの切り替え
    isFlagChange (): boolean {
        return !this.isChatStart || false;
    }
}
