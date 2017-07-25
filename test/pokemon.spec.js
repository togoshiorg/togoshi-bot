import assert from 'assert';
import * as libs from '../src/pokemon/libs';
import translateData from '../data/pokemon.json';
import {
    MAX,
    MAXCP,
    STRENGTH,
    API,
    PATH,
    RES,
    CHANGE_NAME_ARR
} from '../src/pokemon/constants';

describe('pokemon.js', () => {
    it('指定の文字列を含んだURLが返ってくる', () => {
        const randomUrl = libs.getRandomUrl(MAX);
        assert.equal(randomUrl.indexOf(API), 0);
    });

    it('指定の範囲内の数値が返ってくる', () => {
        const randomCp1 = libs.getRandomNum(MAXCP);
        const randomCp2 = libs.getRandomNum(MAXCP);
        const randomCp3 = libs.getRandomNum(MAXCP);
        const randomCp4 = libs.getRandomNum(MAXCP);
        const randomCp5 = libs.getRandomNum(MAXCP);
        assert(randomCp1 < MAXCP);
        assert(randomCp2 < MAXCP);
        assert(randomCp3 < MAXCP);
        assert(randomCp4 < MAXCP);
        assert(randomCp5 < MAXCP);
    });

    it('指定の名前を含むURLが成形される', () => {
        const name = 'foo';
        const spriteUrl = libs.getSpriteUrl(1, name);
        assert.equal(spriteUrl, `${PATH.url}${name}.${PATH.fileType}`);
    });

    it('フラグを渡すと色違いのURLが成形される', () => {
        const name = 'foo';
        const spriteUrl = libs.getSpriteUrl(1, name, true);
        assert.equal(spriteUrl, `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`);
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

    it('ハイフンの入ったnameからハイフンが削除される', () => {
        const data = {
            bulbasaur: {
                id: 1,
                name: 'bulbasaur'
            },
            nidoranf: {
                id: 29,
                name: 'nidoran-f'
            },
            deoxys: {
                id: 386,
                name: 'deoxys-normal'
            }
        };
        const bulbasaurData = libs.getPokeData(data.bulbasaur);
        const nidranData = libs.getPokeData(data.nidoranf);
        const deoxysData = libs.getPokeData(data.deoxys);
        assert.equal(bulbasaurData.img, 'http://www.pokestadium.com/sprites/xy/bulbasaur.gif');
        assert.equal(nidranData.img, 'http://www.pokestadium.com/sprites/xy/nidoranf.gif');
        assert.equal(deoxysData.img, 'http://www.pokestadium.com/sprites/xy/deoxys.gif');
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

    it('trueを渡すと文面が返ってくる', () => {
        const shinyRes = libs.getShinyRes(true);
        assert.equal(shinyRes, RES.shiny);
    });

    it('数値によって適当なレスポンスが返ってくる', () => {
        const god = libs.evalPokeCpRes(STRENGTH.god);
        const strongest = libs.evalPokeCpRes(STRENGTH.strongest);
        const stronger = libs.evalPokeCpRes(STRENGTH.stronger);
        const weaker = libs.evalPokeCpRes(STRENGTH.weaker);
        const weakest = libs.evalPokeCpRes(STRENGTH.weakest);
        assert.equal(god, RES.god);
        assert.equal(strongest, RES.strongest);
        assert.equal(stronger, RES.stronger);
        assert.equal(weaker, RES.weaker);
        assert.equal(weakest, RES.weakest);

        const matchStronger = libs.evalPokeCpRes(STRENGTH.stronger - 1);
        const matchNormal = libs.evalPokeCpRes(STRENGTH.normal);
        assert.equal(matchStronger, '');
        assert.equal(matchNormal, '');
    });
});