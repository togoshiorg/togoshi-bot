import assert from 'assert';
import { isToday } from 'date-fns';
import * as libs from '../src/pokemon/libs';
import translateData from '../data/pokemon.json';
import {
    MAX,
    MAXCP,
    STRENGTH,
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

    it('指定したパーセンテージの強さが返ってくる', () => {
        const dataGod = {
            god: { probability: 100 },
            strongest: { probability: 0 },
            stronger: { probability: 0 },
            normal: { probability: 0 },
            weaker: { probability: 0 },
            weakest: { probability: 0 }
        };
        const dataStrongest = {
            god: { probability: 0 },
            strongest: { probability: 100 },
            stronger: { probability: 0 },
            normal: { probability: 0 },
            weaker: { probability: 0 },
            weakest: { probability: 0 }
        };
        const dataStronger = {
            god: { probability: 0 },
            strongest: { probability: 0 },
            stronger: { probability: 100 },
            normal: { probability: 0 },
            weaker: { probability: 0 },
            weakest: { probability: 0 }
        };
        const dataNormal = {
            god: { probability: 0 },
            strongest: { probability: 0 },
            stronger: { probability: 0 },
            normal: { probability: 100 },
            weaker: { probability: 0 },
            weakest: { probability: 0 }
        };
        const dataWeaker = {
            god: { probability: 0 },
            strongest: { probability: 0 },
            stronger: { probability: 0 },
            normal: { probability: 0 },
            weaker: { probability: 100 },
            weakest: { probability: 0 }
        };
        const dataWeakest = {
            god: { probability: 0 },
            strongest: { probability: 0 },
            stronger: { probability: 0 },
            normal: { probability: 0 },
            weaker: { probability: 0 },
            weakest: { probability: 100 }
        };
        const strengthGod = libs.getStrength(dataGod);
        const strengthStrongest = libs.getStrength(dataStrongest);
        const strengthStronger = libs.getStrength(dataStronger);
        const strengthNormal = libs.getStrength(dataNormal);
        const strengthWeaker = libs.getStrength(dataWeaker);
        const strengthWeakest = libs.getStrength(dataWeakest);
        assert.equal(strengthGod, 'god');
        assert.equal(strengthStrongest, 'strongest');
        assert.equal(strengthStronger, 'stronger');
        assert.equal(strengthNormal, 'normal');
        assert.equal(strengthWeaker, 'weaker');
        assert.equal(strengthWeakest, 'weakest');
    });

    it('指定した強さのCPの範囲内の数値が返ってくる', () => {
        const cpGod = libs.getCp('god');
        const cpStrongest = libs.getCp('strongest');
        const cpStronger = libs.getCp('stronger');
        const cpNormal = libs.getCp('normal');
        const cpWeaker = libs.getCp('weaker');
        const cpWeakest = libs.getCp('weakest');
        if (cpGod === STRENGTH.god.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
        if (cpStrongest < STRENGTH.god.cp && cpStrongest >= STRENGTH.strongest.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
        if (cpStronger < STRENGTH.strongest.cp && cpStronger >= STRENGTH.stronger.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
        if (cpNormal < STRENGTH.stronger.cp && cpNormal >= STRENGTH.normal.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
        if (cpWeaker < STRENGTH.normal.cp && cpWeaker >= STRENGTH.weaker.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
        if (cpWeakest === STRENGTH.weakest.cp) {
            assert.ok(true);
        } else {
            assert.ok(false);
        }
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

    it('強さレベルによって適当なレスポンスが返ってくる', () => {
        const god = libs.evalPokeCpRes('god');
        const strongest = libs.evalPokeCpRes('strongest');
        const stronger = libs.evalPokeCpRes('stronger');
        const weaker = libs.evalPokeCpRes('weaker');
        const weakest = libs.evalPokeCpRes('weakest');
        assert.equal(god, STRENGTH.god.res);
        assert.equal(strongest, STRENGTH.strongest.res);
        assert.equal(stronger, STRENGTH.stronger.res);
        assert.equal(weaker, STRENGTH.weaker.res);
        assert.equal(weakest, STRENGTH.weakest.res);
    });

    it('渡したデータが保存用のオブジェクトで帰ってくる', () => {
        const data = {
            pokeData: {
                id: 1,
                cp: 100
            },
            user: 'foo'
        };
        const saveData = libs.getSaveData(data.pokeData, data.user);
        assert.equal(saveData.id, data.pokeData.id);
        assert.equal(saveData.cp, data.pokeData.cp);
        assert.equal(saveData.user, data.user);
        assert.ok(isToday(saveData.time));
    });
});
