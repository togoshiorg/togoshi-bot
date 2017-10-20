// @flow

// Response Message
export const getLengthRes = (length: number): string => {
    return `全部で${length}匹捕まえたゴシ！`;
};

export const getLengthNameRes = (length: number, name: string): string => {
    return length ? `${name}はこれまでに${length}匹捕まえたゴシ！` : `${name}はまだ捕まえてないゴシ...`;
};

export const getLengthUserRes = (length: number, user: string): string => {
    return length ? `${user}が捕まえたポケモンは${length}匹だゴシ！` : `${user}はまだポケモンを捕まえてないゴシ...`;
};

export const getLengthOvercpRes = (length: number, selectCp: number): string => {
    return length ? `今までにCP${selectCp}以上のポケモンは${length}匹捕まえたゴシ！` : `CP${selectCp}以上のポケモンはまだ捕まえてないゴシ...`;
};

export const getLengthShinyRes = (length: number): string => {
    return length ? `今までに色違いポケモンは${length}匹捕まえたゴシ！` : `まだ普通のポケモンしか捕まえてないゴシ...`;
};
