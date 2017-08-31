// @flow

// 全自動会話API
export const CHAT_API: string = 'https://chatbot-api.userlocal.jp/api/chat';
// キャラクター会話API
export const CHARA_API: string = 'https://chatbot-api.userlocal.jp/api/character';
// API KEY
export const KEY: string = process.env.HUBOT_USERLOCAL_API_KEY;
// レスポンス文
export const RES = {
    start: 'いいゴシよ！',
    end: '楽しかったゴシ！またお話しようゴシ〜'
};
