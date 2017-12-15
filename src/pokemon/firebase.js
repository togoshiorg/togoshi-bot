// @flow

import * as firebase from 'firebase';

// initialize firebase
const APP: any = firebase.initializeApp({
    apiKey: 'AIzaSyDHvmfrV1H1AVR4eWfyRFE87VJ0PS3DFIw',
    authDomain: 'getpokemon-99eed.firebaseapp.com',
    databaseURL: 'https://getpokemon-99eed.firebaseio.com/',
    storageBucket: 'getpokemon-99eed.appspot.com'
});

export default class Firebase {
    ref: any;

    constructor () {
        this.ref = APP.database().ref('/getlist');
    }

    // データを保存
    push (data: Object): void {
        this.ref.push(data);
    }

    // 全データのlengthを取得
    async getLength (): Object {
        const snapshot = await this.ref.once('value');
        return snapshot.numChildren();
    }

    // valueと等しいデータのlengthを取得
    async getLengthEqualTo (key: string, value: any): Object {
        if (key == null || value == null) throw new Error('Invalid request argument.');
        const snapshot = await this.ref.orderByChild(key).equalTo(value).once('value');
        return snapshot.numChildren();
    }

    // valueより大きいデータのlengthを取得
    async getLengthGreaterThan (key: string, value: any): Object {
        if (key == null || value == null) throw new Error('Invalid request argument.');
        const snapshot = await this.ref.orderByChild(key).startAt(value).once('value');
        return snapshot.numChildren();
    }
}
