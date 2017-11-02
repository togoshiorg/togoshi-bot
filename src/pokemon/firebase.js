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
    getlist: any;

    constructor () {
        this.getlist = APP.database().ref('/getlist');
    }

    // データを保存
    push (data: any): any {
        this.getlist.push(data);
    }

    // 全データのlengthを取得
    async getLength (): Object {
        const snapshot = await this.getlist.once('value');
        return snapshot.numChildren();
    }

    // valueと等しいデータのlengthを取得
    async getLengthEqualTo (key: string, value: any): Object {
        const snapshot = await this.getlist.orderByChild(key).equalTo(value).once('value');
        return snapshot.numChildren();
    }

    // valueより大きいデータのlengthを取得
    async getLengthGreaterThan (key: string, value: any): Object {
        const snapshot = await this.getlist.orderByChild(key).startAt(value).once('value');
        return snapshot.numChildren();
    }
}
