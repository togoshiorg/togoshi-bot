// @flow

import * as firebase from 'firebase';
import { isAfter, format } from 'date-fns';
import * as libs from '../pokemon/libs';

// initialize firebase
const app = firebase.initializeApp({
    apiKey: 'AIzaSyDHvmfrV1H1AVR4eWfyRFE87VJ0PS3DFIw',
    authDomain: 'getpokemon-99eed.firebaseapp.com',
    databaseURL: 'https://getpokemon-99eed.firebaseio.com/',
    storageBucket: 'getpokemon-99eed.appspot.com'
});

const getlist = app.database().ref('/getlist');
const tmp = app.database().ref('/tmp');
const initialize = (tmp, getlist) => {
    // 初回起動時タイムスタンプ
    const starttime = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    tmp.set({ starttime });

    tmp.once('value', tSnapshot => {
        // タイムスタンプ取得
        const START_TIME = tSnapshot.val().starttime;

        // イベント登録
        getlist.on('child_added', mSnapshot => {
            const snapshotData = mSnapshot.val();
            if (isAfter(snapshotData.time, START_TIME)) {
                const pokeData = libs.getPokeData(snapshotData);
                console.log(libs.getSuccessRes(pokeData));
            }
        });
    });
};

initialize(tmp, getlist);

export const pushData = (data: Object) => {
    getlist.push(data);
};
