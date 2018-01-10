/**
 * YouTubeのオススメ曲を教えてくれる
 * YouTubeの音楽チャンネルの日本の上位トラックTOP200の上位50曲から1曲をランダムで取ってくる
*/

import 'babel-polyfill';
import RecommendMusic from './music/recommend';

module.exports = (robot) => {
    robot.respond(/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/, (res) => {
        (async () => {
            const getRecommend = await new RecommendMusic().getRecommend();
            res.send(getRecommend.url);
            res.send(getRecommend.text);
        })();
    });
};
