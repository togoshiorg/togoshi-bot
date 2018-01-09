import assert from 'assert';
import proxyquire from 'proxyquire';
import MockDate from 'mockdate';

// RequestApiのMockクラス
class RequestApiMock {
    request (num) { return { id: num }; }
}
class RequestApiMockError {
    request (num) { throw new Error(); }
}

// PokemonObjのMockクラス
class PokemonObjMockNormal {
    getId () { return 1; }
    getIsShiny () { return false; }
    getStrengthLv () { return 'normal'; }
    getCp () { return 1000; };
    getName () { return 'フシギダネ'; }
    getImg () { return 'http://example.com/1/bulbasaur.png'; }
}
class PokemonObjMockShinyGod extends PokemonObjMockNormal {
    getIsShiny () { return true; }
    getStrengthLv () { return 'god'; }
}
class PokemonObjMockShiny extends PokemonObjMockNormal {
    getIsShiny () { return true; }
}
class PokemonObjMockGod extends PokemonObjMockNormal {
    getStrengthLv () { return 'god'; }
}
class PokemonObjMockStrongest extends PokemonObjMockNormal {
    getStrengthLv () { return 'strongest'; }
}
class PokemonObjMockStronger extends PokemonObjMockNormal {
    getStrengthLv () { return 'stronger'; }
}
class PokemonObjMockWeaker extends PokemonObjMockNormal {
    getStrengthLv () { return 'weaker'; }
}
class PokemonObjMockWeakest extends PokemonObjMockNormal {
    getStrengthLv () { return 'weakest'; }
}
class PokemonObjMockOther extends PokemonObjMockNormal {
    getStrengthLv () { return 'hoge'; }
}
class PokemonObjMockError {
    constructor () { throw new Error(); }
}

// DatabaseのMockクラス
class DatabaseMock {
    push (data) { DatabaseMock.data = data; };
}
class DatabaseMockError {
    push (data) { throw new Error(); };
}

describe('pokemon/get-pokemon.js', () => {
    it('constructorにRequestApiクラスとuserを渡すと正しく処理する', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.doesNotThrow(
            () => {
                return new GetPokemon(RequestApiMock, 'foo-user');
            }
        );
    });

    it('constructorにRequestApiクラスとuserを渡さないとErrorをthrowする（RequestApiがnull）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.throws(
            () => { return new GetPokemon(null, 'foo-user'); },
            (err) => { assert.equal(err.message, '捕まえるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにRequestApiクラスとuserを渡さないとErrorをthrowする（RequestApiがundefined）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.throws(
            () => { return new GetPokemon(undefined, 'foo-user'); },
            (err) => { assert.equal(err.message, '捕まえるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにRequestApiクラスとuserを渡さないとErrorをthrowする（userがnull）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.throws(
            () => { return new GetPokemon(RequestApiMock, null); },
            (err) => { assert.equal(err.message, '捕まえるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにRequestApiクラスとuserを渡さないとErrorをthrowする（userがundefined）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.throws(
            () => { return new GetPokemon(RequestApiMock, undefined); },
            (err) => { assert.equal(err.message, '捕まえるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにRequestApiクラスとuserを渡さないとErrorをthrowする（RequestApiおよびuserが空）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.throws(
            () => { return new GetPokemon(); },
            (err) => { assert.equal(err.message, '捕まえるの失敗したゴシ…。'); return true; }
        );
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（通常）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'CP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（色違いおよびgod）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockShinyGod }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, ':god:\n色違いを捕まえたゴシィィィ！！！？\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（色違い）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockShiny }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, '色違いを捕まえたゴシィィィ！！！？\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（god）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockGod }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, ':god:\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（strongest）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockStrongest }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'コイツは空前絶後のつよさゴシ！！\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（stronger）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockStronger }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'コイツはつよいゴシ！！\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（weaker）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockWeaker }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'コイツはよわいゴシ…。\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（weakest）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockWeakest }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'コイツは超絶孤高によわすぎるゴシ…。\nCP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッドを呼ぶとランダムにポケモン捕獲テキストを返却する（other）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockOther }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        const res = await getPokemon.getRandom();
        assert.equal(res, 'CP1000のフシギダネを捕まえたゴシ！\nhttp://example.com/1/bulbasaur.png');
    });

    it('getRandom()メソッド内でエラーが発生するとErrorをthrowする（request失敗）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMockError, 'foo-user');
        try {
            await getPokemon.getRandom();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '捕まえるの失敗したゴシ…。');
        }
    });

    it('getRandom()メソッド内でエラーが発生するとErrorをthrowする（PokemonObjインスタンス生成失敗）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockError }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        try {
            await getPokemon.getRandom();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '捕まえるの失敗したゴシ…。');
        }
    });

    it('pushData()メソッドを呼ぶと捕まえたポケモンを保存する', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;
        // new Date()をMockに差し替え(※タイムゾーン0)
        MockDate.set('1/1/2017 12:34:56', 0);

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        await getPokemon.getRandom();
        getPokemon.pushData(DatabaseMock);
        assert.equal(DatabaseMock.data.id, 1);
        assert.equal(DatabaseMock.data.user, 'foo-user');
        assert.equal(DatabaseMock.data.time, '2017-01-01T12:34:56+00:00');
        assert.equal(DatabaseMock.data.cp, 1000);
        assert.equal(DatabaseMock.data.isShiny, false);
    });

    it('pushData()メソッド内でエラーが発生するとErrorをthrowする（push失敗）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        await getPokemon.getRandom();
        assert.throws(
            () => { getPokemon.pushData(DatabaseMockError); },
            (err) => { assert.equal(err.message, '保存するの失敗したゴシ…。'); return true; }
        );
    });

    it('pushData()メソッド内でエラーが発生するとErrorをthrowする（引数無し）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        await getPokemon.getRandom();
        assert.throws(
            () => { getPokemon.pushData(); },
            (err) => { assert.equal(err.message, '保存するの失敗したゴシ…。'); return true; }
        );
    });

    it('pushData()メソッド内でエラーが発生するとErrorをthrowする（捕獲前）', async () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        const getPokemon = new GetPokemon(RequestApiMock, 'foo-user');
        assert.throws(
            () => { getPokemon.pushData(DatabaseMock); },
            (err) => { assert.equal(err.message, '保存するの失敗したゴシ…。'); return true; }
        );
    });

    it('テキストを正しく返却する（GO_RES）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.equal(GetPokemon.GO_RES, ':pokeball: 捕まえてくるゴシ。。。。。');
    });

    it('テキストを正しく返却する（GET_ERROR_RES）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.equal(GetPokemon.GET_ERROR_RES, '捕まえるの失敗したゴシ…。');
    });

    it('テキストを正しく返却する（PUSH_ERROR_RES）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.equal(GetPokemon.PUSH_ERROR_RES, '保存するの失敗したゴシ…。');
    });

    it('テキストを正しく返却する（TIME_FORMAT）', () => {
        // get-pokemon.js内のimportをダミーに差し替え
        const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
            './pokemon-ja': { default: PokemonObjMockNormal }
        }).default;

        assert.equal(GetPokemon.TIME_FORMAT, 'YYYY-MM-DDTHH:mm:ssZ');
    });
});
