// @flow

import * as firebase from 'firebase';
import { isAfter, format } from 'date-fns';

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
    const starttime = format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ');
    tmp.set({ starttime });

    tmp.once('value', tSnapshot => {
        const STARTUP_TIMESTAMP = tSnapshot.val().timestamp;
        getlist.on('child_added', mSnapshot => {
            const snapshotData = mSnapshot.val();
            if (isAfter(snapshotData.time, STARTUP_TIMESTAMP)) {
                console.log(snapshotData);
            }
        });
    });
};

initialize(tmp, getlist);

export const pushData = (data: Object) => {
    getlist.push(data);
};
