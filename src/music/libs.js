// @flow

// パラメータからURLを生成
export const createUrl = (inputUrl: string, params: Object) => {
    let url = inputUrl;
    for (let key in params) {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += key + '=' + params[key];
    };
    return url;
};

// // 50曲引っ張ってくるので、0~49までの数字をランダムで返す
export const createIndex = () => {
    return Math.floor(Math.random() * 50);
};
