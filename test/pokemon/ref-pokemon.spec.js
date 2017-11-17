import assert from 'assert';
import RefPokemon from '../../src/pokemon/ref-pokemon';

// DatabaseのMockクラス
class DatabaseMock {
    getLength () { return 100; };
    getLengthEqualTo (key, value) {
        DatabaseMock.key = key;
        DatabaseMock.value = value;
        return 10;
    };
    getLengthGreaterThan (key, value) {
        DatabaseMock.key = key;
        DatabaseMock.value = value;
        return 100;
    };
}
class DatabaseMockZero {
    getLength () { return 0; };
    getLengthEqualTo (key, value) {
        DatabaseMock.key = key;
        DatabaseMock.value = value;
        return 0;
    };
    getLengthGreaterThan (key, value) {
        DatabaseMock.key = key;
        DatabaseMock.value = value;
        return 0;
    };
}
class DatabaseMockError {
    getLength () { throw new Error(); };
    getLengthEqualTo (key, value) { throw new Error(); };
    getLengthGreaterThan (key, value) { throw new Error(); };
}

describe('pokemon/ref-pokemon.js', () => {
    it('constructorにDatabaseクラスを渡すと正しく処理する', () => {
        assert.doesNotThrow(
            () => {
                return new RefPokemon(DatabaseMock);
            }
        );
    });

    it('constructorにDatabaseクラスを渡さないとErrorをthrowする（Databaseがnull）', () => {
        assert.throws(
            () => { return new RefPokemon(null); },
            (err) => { assert.equal(err.message, '調べるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにDatabaseクラスを渡さないとErrorをthrowする（Databaseがundefined）', () => {
        assert.throws(
            () => { return new RefPokemon(undefined); },
            (err) => { assert.equal(err.message, '調べるの失敗したゴシ…。'); return true; }
        );
    });

    it('constructorにDatabaseクラスを渡さないとErrorをthrowする（Databaseが空）', () => {
        assert.throws(
            () => { return new RefPokemon(); },
            (err) => { assert.equal(err.message, '調べるの失敗したゴシ…。'); return true; }
        );
    });

    it('getLengthTotal()メソッドを呼ぶと今までに捕まえたポケモンの総数を返却する', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthTotal();
        assert.equal(res, '全部で100匹捕まえたゴシ！');
    });

    it('getLengthTotal()メソッド内でエラーが発生するとErrorをthrowする', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthTotal();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByName()メソッドを呼ぶと指定の日本語名のポケモンを捕まえた数を返却する（引数のポケモンが存在する）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthByName('フシギダネ');
        assert.equal(res, 'フシギダネはこれまでに10匹捕まえたゴシ！');
        assert.equal(DatabaseMock.key, 'id');
        assert.equal(DatabaseMock.value, 1);
    });

    it('getLengthByName()メソッドを呼ぶと指定の日本語名のポケモンを捕まえた数を返却する（引数のポケモンが存在しない）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthByName('foo');
        assert.equal(res, 'fooなんてポケモンはいないゴシ...');
    });

    it('getLengthByName()メソッドを呼ぶと指定の日本語名のポケモンを捕まえた数を返却する（捕まえた数が0）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockZero);
        const res = await refPokemon.getLengthByName('フシギダネ');
        assert.equal(res, 'フシギダネはまだ捕まえてないゴシ...');
    });

    it('getLengthByName()メソッド内でエラーが発生するとErrorをthrowする', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthByName('フシギダネ');
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByName()メソッドにnameを渡さないとErrorをthrowする（nameがnull）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthByName(null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByName()メソッドにnameを渡さないとErrorをthrowする（nameがundefined）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthByName(undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByName()メソッドにnameを渡さないとErrorをthrowする（nameが空）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthByName();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByUser()メソッドを呼ぶと指定のuserが捕まえたポケモンの数を返却する', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthByUser('foo-user');
        assert.equal(res, 'foo-userが捕まえたポケモンは10匹だゴシ！');
        assert.equal(DatabaseMock.key, 'user');
        assert.equal(DatabaseMock.value, 'foo-user');
    });

    it('getLengthByUser()メソッドを呼ぶと指定のuserが捕まえたポケモンの数を返却する（捕まえた数が0）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockZero);
        const res = await refPokemon.getLengthByUser('foo-user');
        assert.equal(res, 'foo-userはまだポケモンを捕まえてないゴシ...');
    });

    it('getLengthByUser()メソッド内でエラーが発生するとErrorをthrowする', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthByUser('foo-user');
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByUser()メソッドにuserを渡さないとErrorをthrowする（nameがnull）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthByUser(null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByUser()メソッドにuserを渡さないとErrorをthrowする（userがundefined）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthByUser(undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthByUser()メソッドにuserを渡さないとErrorをthrowする（userが空）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthByUser();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthGreaterThanCp()メソッドを呼ぶと指定したCPよりも強いポケモンの数を返却する', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthGreaterThanCp(1000);
        assert.equal(res, '今までにCP1000以上のポケモンは100匹捕まえたゴシ！');
        assert.equal(DatabaseMock.key, 'cp');
        assert.equal(DatabaseMock.value, 1000);
    });

    it('getLengthGreaterThanCp()メソッドを呼ぶと指定したCPよりも強いポケモンの数を返却する（捕まえた数が0）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockZero);
        const res = await refPokemon.getLengthGreaterThanCp(1000);
        assert.equal(res, 'CP1000以上のポケモンはまだ捕まえてないゴシ...');
    });

    it('getLengthGreaterThanCp()メソッド内でエラーが発生するとErrorをthrowする', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthGreaterThanCp(1000);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthGreaterThanCp()メソッドにcpを渡さないとErrorをthrowする（cpがnull）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthGreaterThanCp(null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthGreaterThanCp()メソッドにcpを渡さないとErrorをthrowする（cpがundefined）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthGreaterThanCp(undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthGreaterThanCp()メソッドにcpを渡さないとErrorをthrowする（cpが空）', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        try {
            await refPokemon.getLengthGreaterThanCp();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('getLengthIsShiny()メソッドを呼ぶと今までに捕まえた色違いポケモンの数を返却する', async () => {
        const refPokemon = new RefPokemon(DatabaseMock);
        const res = await refPokemon.getLengthIsShiny();
        assert.equal(res, '今までに色違いポケモンは10匹捕まえたゴシ！');
        assert.equal(DatabaseMock.key, 'isShiny');
        assert.equal(DatabaseMock.value, true);
    });

    it('getLengthIsShiny()メソッドを呼ぶと今までに捕まえた色違いポケモンの数を返却する（捕まえた数が0）', async () => {
        const refPokemon = new RefPokemon(DatabaseMockZero);
        const res = await refPokemon.getLengthIsShiny();
        assert.equal(res, 'まだ普通のポケモンしか捕まえてないゴシ...');
    });

    it('getLengthIsShiny()メソッド内でエラーが発生するとErrorをthrowする', async () => {
        const refPokemon = new RefPokemon(DatabaseMockError);
        try {
            await refPokemon.getLengthIsShiny();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '調べるの失敗したゴシ…。');
        }
    });

    it('テキストを正しく返却する（REF_ERROR_RES）', () => {
        assert.equal(RefPokemon.REF_ERROR_RES, '調べるの失敗したゴシ…。');
    });
});
