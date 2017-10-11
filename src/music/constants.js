// @flow

// API URL
export const API: string = 'https://www.googleapis.com/youtube/v3/playlistItems';
// API KEY
export const KEY: any = process.env.HUBOT_YOUTUBE_API_KEY;
// プレイリスト ID
export const PLAYLIST_ID: string = 'PLFgquLnL59alxIWnf4ivu5bjPeHSlsUe9';
// 取ってくる曲数
export const MAX_RESULTS: number = 50;
// 再生 URL
export const PLAY_URL: string = 'https://www.youtube.com/watch';

// レスポンス文
export const RES = {
    return: 'この曲がおすすめゴシ！',
    error: 'おすすめを探せなかったゴシ…'
};
