
import assert from 'assert';
import * as libs from '../../src/pokemon/libs';

describe('pokemon/libs.js', () => {
    // Math.random上書き前に退避
    const random = Math.random;
    afterEach(() => {
        // Math.randomを戻す
        Math.random = random;
    });

    it('指定のURLが返ってくる', () => {
        Math.random = () => { return 0.9999999999; };
        assert.equal(libs.getRandomUrl(200), 'http://pokeapi.co/api/v2/pokemon/200/');
    });

    it('指定の範囲内の数値が返ってくる', () => {
        const MAX = 1000;

        Math.random = () => { return 0; };
        const randomCpMin = libs.getRandomNum(MAX);

        Math.random = () => { return 0.9999999999; };
        const randomCpMax = libs.getRandomNum(MAX);

        Math.random = () => { return 0.5; };
        const randomCpMid = libs.getRandomNum(MAX);

        assert(randomCpMin >= 0 && randomCpMin < MAX);
        assert(randomCpMax >= 0 && randomCpMax < MAX);
        assert(randomCpMid >= 0 && randomCpMid < MAX);
    });

    it('lengthを渡すと適切な文字列が返ってくる', () => {
        assert.equal(libs.getLengthRes(100), '全部で100匹捕まえたゴシ！');
    });

    it('lengthとnameを渡すと適切な文字列が返ってくる', () => {
        assert.equal(libs.getLengthNameRes(0, 'foo'), 'fooはまだ捕まえてないゴシ...');
        assert.equal(libs.getLengthNameRes(100, 'foo'), 'fooはこれまでに100匹捕まえたゴシ！');
    });

    it('lengthとuserを渡すと適切な文字列が返ってくる', () => {
        assert.equal(libs.getLengthUserRes(0, 'foo'), 'fooはまだポケモンを捕まえてないゴシ...');
        assert.equal(libs.getLengthUserRes(100, 'foo'), 'fooが捕まえたポケモンは100匹だゴシ！');
    });

    it('lengthとselectCpを渡すと適切な文字列が返ってくる', () => {
        assert.equal(libs.getLengthOvercpRes(0, 1000), 'CP1000以上のポケモンはまだ捕まえてないゴシ...');
        assert.equal(libs.getLengthOvercpRes(100, 1000), '今までにCP1000以上のポケモンは100匹捕まえたゴシ！');
    });

    it('lengthを渡すと適切な文字列が返ってくる（色違い）', () => {
        assert.equal(libs.getLengthShinyRes(0), 'まだ普通のポケモンしか捕まえてないゴシ...');
        assert.equal(libs.getLengthShinyRes(100), '今までに色違いポケモンは100匹捕まえたゴシ！');
    });
});
