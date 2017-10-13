/**
 * YouTubeのオススメ曲を教えてくれる
 * YouTubeの音楽チャンネルの日本の上位トラックTOP200の上位50曲から1曲をランダムで取ってくる
*/

import 'babel-polyfill';
import fetch from 'node-fetch';
import CreateApiUrl from './music/api';
import ReportMusic from './music/report';
import * as libs from './music/libs';
import { API, KEY, PLAYLIST_ID, MAX_RESULTS, PLAY_URL, RES } from './music/constants';

module.exports = (robot) => {
    robot.respond(/(オススメ|オヌヌメ|おすすめ|おススメ|おヌヌメ|お勧め|お薦め|お奨め)の曲/, (res) => {
        (async () => {
            try {
                const createApiUrl = new CreateApiUrl(API, KEY, PLAYLIST_ID, MAX_RESULTS);
                const response = await fetch(createApiUrl.createUrl());
                const status = response.status;
                if (status !== 200) throw new Error(response.statusText);
                const json = await response.json();
                const reportMusic = new ReportMusic(json, PLAYLIST_ID, PLAY_URL, libs.createIndex());
                res.send(reportMusic.movieUrl());
                res.send(RES.return);
            } catch (err) {
                res.send(RES.error + err);
            }
        })();
    });
};
