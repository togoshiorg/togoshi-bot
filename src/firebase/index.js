import * as firebase from 'firebase';

// initialize firebase
const app = firebase.initializeApp({
    apiKey: 'AIzaSyDHvmfrV1H1AVR4eWfyRFE87VJ0PS3DFIw',
    authDomain: 'getpokemon-99eed.firebaseapp.com',
    databaseURL: 'https://getpokemon-99eed.firebaseio.com/',
    storageBucket: 'getpokemon-99eed.appspot.com'
});

const getlist = app.database().ref('/getlist');

export const pushData = ({ id, cp }) => {
    getlist.push({
        id,
        user: 'ishibashi-keita', // 一旦固定値
        time: '2017-01-01T12:00Z', // 一旦固定値
        cp
    });
};

// getlist.on('value', snapshot => {
//     console.log(snapshot.val());
// });
