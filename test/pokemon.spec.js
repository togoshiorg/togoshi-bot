import assert from 'assert';
import Libs from '../src/pokemon/libs';
import translateData from '../data/pokemon.json';
import {
    MAXCP,
    STRENGTH,
    API,
    PATH,
    RES
} from '../src/pokemon/constants';

describe('pokemon.js', () => {
    it('指定の文字列を含んだURLが返ってくる', () => {
        const randomUrl = Libs.getRandomUrl();
        assert.equal(randomUrl.indexOf(API), 0);
    });

    it('指定の範囲内の数値が返ってくる', () => {
        const randomCp1 = Libs.getRandomNum(MAXCP);
        const randomCp2 = Libs.getRandomNum(MAXCP);
        const randomCp3 = Libs.getRandomNum(MAXCP);
        const randomCp4 = Libs.getRandomNum(MAXCP);
        const randomCp5 = Libs.getRandomNum(MAXCP);
        assert(randomCp1 < MAXCP);
        assert(randomCp2 < MAXCP);
        assert(randomCp3 < MAXCP);
        assert(randomCp4 < MAXCP);
        assert(randomCp5 < MAXCP);
    });

    it('指定の名前を含むURLが成形される', () => {
        const name = 'foo';
        const spriteUrl = Libs.getSpriteUrl(1, name);
        assert.equal(spriteUrl, `${PATH.url}${name}.${PATH.fileType}`);
    });

    it('フラグを渡すと色違いのURLが成形される', () => {
        const name = 'foo';
        const spriteUrl = Libs.getSpriteUrl(1, name, true);
        assert.equal(spriteUrl, `${PATH.url}${PATH.shiny}${name}.${PATH.fileType}`);
    });

    it('指定のidと名前を使ったObjectが返ってくる', () => {
        const data = {
            id: 1,
            name: 'foo'
        };
        const libs = new Libs(data);
        const pokeData = libs.getPokeData();
        assert.equal(pokeData.id, data.id);
        assert.equal(pokeData.name, translateData[data.id - 1].ja);
        assert.equal(pokeData.img, Libs.getSpriteUrl(data.id, data.name));
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
        const bulbasaurData = new Libs(data.bulbasaur).getPokeData();
        const nidranData = new Libs(data.nidoranf).getPokeData();
        const deoxysData = new Libs(data.deoxys).getPokeData();
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
        const successRes = new Libs(data).getSuccessRes();
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
