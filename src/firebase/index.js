// @flow

import * as firebase from 'firebase';

// initialize firebase
const app = firebase.initializeApp({
    apiKey: 'AIzaSyDHvmfrV1H1AVR4eWfyRFE87VJ0PS3DFIw',
    authDomain: 'getpokemon-99eed.firebaseapp.com',
    databaseURL: 'https://getpokemon-99eed.firebaseio.com/',
    storageBucket: 'getpokemon-99eed.appspot.com'
});

const getlist = app.database().ref('/getlist');

export const pushData = (data: Object) => {
    getlist.push(data);
};

export const readLength = () => {
    return getlist.once('value')
        .then(snapshot => {
            return snapshot.numChildren();
        });
};

export const readLengthId = (id: number) => {
    return getlist.orderByChild('id').equalTo(id).once('value')
        .then(snapshot => {
            return snapshot.numChildren();
        });
};

export const equalUser = (user: string) => {
    return getlist.orderByChild('user').equalTo(user).once('value')
        .then(snapshot => {
            return snapshot.numChildren();
        });
};

export const overCp = (selectCp: number) => {
    return getlist.orderByChild('cp').startAt(selectCp).once('value')
        .then(snapshot => {
            return snapshot.numChildren();
        });
};

export const equalShiny = () => {
    return getlist.orderByChild('isShiny').equalTo(true).once('value')
        .then(snapshot => {
            return snapshot.numChildren();
        });
};