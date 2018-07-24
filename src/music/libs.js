// @flow

// パラメータからURLを生成
export const createUrl = (inputUrl: string, params: Object) => {
    let url = inputUrl;
    for (const key in params) {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += key + '=' + params[key];
    };
    return url;
};

// 50未満の乱数を生成
export const createRandomNum = () => {
    return Math.floor(Math.random() * 50);
};
