// @flow
/**
 * YouTubeのオススメ曲を教えてくれる
 * YouTubeの音楽チャンネルの日本の上位トラックTOP200の上位50曲から1曲をランダムで取ってくる
*/

import 'babel-polyfill';
import GetMusic from './music/get-music';
import YouTubeApi from './music/youtube-api';

module.exports = (robot: Object) => {
    robot.respond(/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/, (res) => {
        (async () => {
            const getMusic = await new GetMusic(YouTubeApi).returnData();
            res.send(getMusic.data);
            res.send(getMusic.message);
        })();
    });
};
