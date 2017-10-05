/**
 * # 雑談機能テスト
 * ## テスト項目
 * - chat/judge.js（chat/judge.spec.js）
 *   - 起動ch判定
 *   - 雑談開始判定（停止/開始）
 *   - 雑談フラグ切替（停止/開始）
*/

import assert from 'assert';
import ChatJudge from '../../src/chat/judge';

describe('chat/judge.js', () => {
    let chatRoom;
    let res;

    beforeEach(() => {
        // ダミーデータ
        // ダミーチャットルーム
        chatRoom = {
            general: 'C04QLTK0C',
            togoshiDev: 'C0CT4RTQF'
        };
        // ダミーres
        res = {
            message: {
                user: {
                    name: 'admin',
                    room: chatRoom.togoshiDev // ch hubot
                }
            },
            messages: [],
            send: (message) => {
                // 検証用にmessageを格納
                res.messages.push(message);
            },
            finish: () => {
                return false;
            }
        };
    });

    it('指定のchの判定ができている', () => {
        const chJudge = new ChatJudge(res.message.user.room, false).isTogoshiDev();

        assert.equal(typeof chJudge, 'boolean');
        assert.equal(chJudge, true);
    });
    it('雑談フラグの判定ができている（停止時）', () => {
        const chatJudge = new ChatJudge(res.message.user.room, false).isChatting();

        assert.equal(typeof chatJudge, 'boolean');
        assert.equal(chatJudge, false);
    });
    it('雑談フラグの判定ができている（開始時）', () => {
        const chatJudge = new ChatJudge(res.message.user.room, true).isChatting();

        assert.equal(typeof chatJudge, 'boolean');
        assert.equal(chatJudge, true);
    });
    it('雑談フラグの切り替えができる（停止時）', () => {
        const changeFlag = new ChatJudge(res.message.user.room, false).isFlagChange();
        assert.equal(typeof changeFlag, 'boolean');
        assert.equal(changeFlag, true);
    });
    it('雑談フラグの切り替えができる（開始時）', () => {
        const changeFlag = new ChatJudge(res.message.user.room, true).isFlagChange();

        assert.equal(typeof changeFlag, 'boolean');
        assert.equal(changeFlag, false);
    });
});
