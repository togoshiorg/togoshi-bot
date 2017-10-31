// @flow

interface RequestApi {
    constructor (): RequestApi;
    request (num: number): Object;
};

interface GetObject {
    constructor (Request: Class<RequestApi>, user: string): GetObject;
    getRandom (): Object;
    getSaveData (): Object;
    static GO_RES: string;
    static ERROR_RES: string;
};
