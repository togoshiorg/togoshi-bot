import assert from 'assert';
import * as libs from '../src/pokemon/libs';
import translateData from '../data/pokemon.json';
import {
    MAX,
    MAXCP,
    API,
    PATH,
    RES
} from '../src/pokemon/constants';

describe('pokemon.js', () => {
    it('指定の文字列を含んだURLが返ってくる', () => {
        const randomUrl = libs.getRandomUrl(MAX);
        assert.equal(randomUrl.indexOf(API), 0);
    });

    it('指定の範囲内の数値が返ってくる', () => {
        const randomCp1 = libs.getRandomCp(MAXCP);
        const randomCp2 = libs.getRandomCp(MAXCP);
        const randomCp3 = libs.getRandomCp(MAXCP);
        const randomCp4 = libs.getRandomCp(MAXCP);
        const randomCp5 = libs.getRandomCp(MAXCP);
        assert(randomCp1 < MAXCP);
        assert(randomCp2 < MAXCP);
        assert(randomCp3 < MAXCP);
        assert(randomCp4 < MAXCP);
        assert(randomCp5 < MAXCP);
    });

    it('指定の名前を含むURLが成形される', () => {
        const name = 'foo';
        const spriteUrl = libs.getSpriteUrl(1, name);
        assert.equal(spriteUrl, `${PATH.default.url}${name}.${PATH.default.fileType}`);
    });

    it('idによって異なるURLが成形される', () => {
        const spriteUrlDefault = libs.getSpriteUrl(1, 'foo');
        const spriteUrlFan1 = libs.getSpriteUrl(650, 'foo');
        const spriteUrlFan2 = libs.getSpriteUrl(651, 'foo');
        assert.equal(spriteUrlDefault, `${PATH.default.url}foo.${PATH.default.fileType}`);
        assert.equal(spriteUrlFan1, `${PATH.fan.url}foo.${PATH.fan.fileType}`);
        assert.equal(spriteUrlFan2, `${PATH.fan.url}foo.${PATH.fan.fileType}`);
    });

    it('指定のidと名前を使ったObjectが返ってくる', () => {
        const data = {
            id: 1,
            name: 'foo'
        };
        const pokeData = libs.getPokeData(data);
        assert.equal(pokeData.id, data.id);
        assert.equal(pokeData.name, translateData[data.id - 1].ja);
        assert.equal(pokeData.img, libs.getSpriteUrl(data.id, data.name));
    });

    it('指定した内容で成形された文面が返ってくる', () => {
        const data = {
            name: 'foo',
            img: 'http://example.com',
            cp: 99
        };
        const successRes = libs.getSuccessRes(data);
        assert.equal(successRes, 'CP99のfooを捕まえたゴシ！\nhttp://example.com');
    });

    it('数値によって適当なレスポンスが返ってくる', () => {
        const over1900 = libs.evalPokeCpRes(1901);
        const under100 = libs.evalPokeCpRes(99);
        assert.equal(over1900, RES.strong);
        assert.equal(under100, RES.weak);

        const match1900 = libs.evalPokeCpRes(1900);
        const match100 = libs.evalPokeCpRes(100);
        const middle = libs.evalPokeCpRes(500);
        assert.equal(match1900, '');
        assert.equal(match100, '');
        assert.equal(middle, '');
    });
});