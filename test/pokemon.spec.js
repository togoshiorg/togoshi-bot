import assert from 'assert';
import { isToday } from 'date-fns';
import sinon from 'sinon';
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
        const stub = sinon.stub(Libs, 'getRandomNum');
        stub.returns(1);
        console.log('test');
        const data = {
            id: 1,
            name: 'foo'
        };
        const libs = new Libs(data);
        const pokeData = libs.getPokeData();
        console.log(libs.isShiny);
        assert.equal(pokeData.id, data.id);
        assert.equal(pokeData.name, translateData[data.id - 1].ja);
        assert.equal(pokeData.img, Libs.getSpriteUrl(data.id, data.name));
        stub.restore();
    });

    it('ハイフンの入ったnameからハイフンが削除される', () => {
        const data = {
            bulbasaur: {
                id: 1,
                name: 'bulbasaur',
                isShiny: false
            },
            nidoranf: {
                id: 29,
                name: 'nidoran-f',
                isShiny: false
            },
            deoxys: {
                id: 386,
                name: 'deoxys-normal',
                isShiny: false
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
            id: 1,
            name: 'bulbasaur',
            isShiny: false,
            cp: 100
        };
        const successRes = new Libs(data).getSuccessRes();
        assert.equal(successRes, 'CP100のフシギダネを捕まえたゴシ！\nhttp://www.pokestadium.com/sprites/xy/bulbasaur.gif');
    });

    it('trueを渡すと文面が返ってくる', () => {
        const shinyRes = new Libs({ isShiny: true }).getShinyRes();
        assert.equal(shinyRes, RES.shiny);
    });

    it('数値によって適当なレスポンスが返ってくる', () => {
        const god = new Libs({ cp: STRENGTH.god }).evalPokeCpRes();
        const strongest = new Libs({ cp: STRENGTH.strongest }).evalPokeCpRes();
        const stronger = new Libs({ cp: STRENGTH.stronger }).evalPokeCpRes();
        const weaker = new Libs({ cp: STRENGTH.weaker }).evalPokeCpRes();
        const weakest = new Libs({ cp: STRENGTH.weakest }).evalPokeCpRes();
        assert.equal(god, RES.god);
        assert.equal(strongest, RES.strongest);
        assert.equal(stronger, RES.stronger);
        assert.equal(weaker, RES.weaker);
        assert.equal(weakest, RES.weakest);

        const matchStronger = new Libs({ cp: STRENGTH.stronger - 1 }).evalPokeCpRes();
        const matchNormal = new Libs({ cp: STRENGTH.normal }).evalPokeCpRes();
        assert.equal(matchStronger, '');
        assert.equal(matchNormal, '');
    });

    it('渡したデータが保存用のオブジェクトで帰ってくる', () => {
        const data = {
            pokeData: {
                id: 1,
                cp: 100
            },
            user: 'foo'
        };
        const saveData = new Libs(data.pokeData, data.user).getSaveData();
        assert.equal(saveData.id, data.pokeData.id);
        assert.equal(saveData.cp, data.pokeData.cp);
        assert.equal(saveData.user, data.user);
        assert.ok(isToday(saveData.time));
    });
});
