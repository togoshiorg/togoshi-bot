import assert from 'assert';
import { isToday } from 'date-fns';
import sinon from 'sinon';
import * as libs from '../src/pokemon/libs';
import translateData from '../data/pokemon.json';
import {
    MAXCP,
    STRENGTH,
    PATH,
    RES
} from '../src/pokemon/constants';

describe('pokemon/libs.js', () => {
    const random = Math.random;
    afterEach(() => {
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
});

describe('pokemon.js', () => {
    it('強さレベルの順番がかならずCPの高い順になる', () => {
        const STRENGTH1 = {
            god: { cp: MAXCP },
            strongest: { cp: 3500 },
            stronger: { cp: 2000 },
            normal: { cp: 100 },
            weaker: { cp: 2 },
            weakest: { cp: 1 }
        };
        const STRENGTH2 = {
            stronger: { cp: 2000 },
            weaker: { cp: 2 },
            strongest: { cp: 3500 },
            weakest: { cp: 1 },
            normal: { cp: 100 },
            god: { cp: MAXCP },
        };
        const STRENGTH3 = {
            stronger: { cp: 2000 },
            god: { cp: MAXCP },
            normal: { cp: 100 },
            weakest: { cp: 1 },
            weaker: { cp: 2 },
            strongest: { cp: 3500 },

        };
        const strengthArr1 = Object.keys(STRENGTH1);
        const strengthSortedArr1 = libs.strengthSort(strengthArr1);
        const strengthArr2 = Object.keys(STRENGTH2);
        const strengthSortedArr2 = libs.strengthSort(strengthArr2);
        const strengthArr3 = Object.keys(STRENGTH3);
        const strengthSortedArr3 = libs.strengthSort(strengthArr3);
        const testArr = ['god', 'strongest', 'stronger', 'normal', 'weaker', 'weakest'];
        let i;
        for (i = 0; strengthSortedArr1.length > i; i++) {
            assert.equal(strengthSortedArr1[i], testArr[i]);
        }
        for (i = 0; strengthSortedArr2.length > i; i++) {
            assert.equal(strengthSortedArr2[i], testArr[i]);
        }
        for (i = 0; strengthSortedArr3.length > i; i++) {
            assert.equal(strengthSortedArr3[i], testArr[i]);
        }
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
        const saveData = new Libs(data.pokeData, data.user).getSaveData();
        assert.equal(saveData.id, data.pokeData.id);
        assert.equal(saveData.cp, data.pokeData.cp);
        assert.equal(saveData.user, data.user);
        assert.ok(isToday(saveData.time));
    });
});
