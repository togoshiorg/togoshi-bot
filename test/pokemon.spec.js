import assert from 'assert';
import proxyquire from 'proxyquire';

// robotのMock
const robot = {
    respond: (pattern, func) => {
        robot[new RegExp(pattern)] = func;
    }
};

// resのMock
const res = {
    message: {
        user: {
            name: 'admin'
        }
    },
    messages: [],
    send: (message) => {
        // 検証用にmessageを格納
        res.messages.push(message);
    }
};

// GetObjectのMockクラス
class GetObjectMock {
    getRandom () { return '捕獲成功'; };
    pushData (Database) { GetObjectMock.db = Database; };
    static get GO_RES () { return '捕獲開始'; };
}
class GetObjectMockConstructorError {
    constructor () { throw new Error('捕獲失敗'); };
    static get GO_RES () { return '捕獲開始'; };
}
class GetObjectMockGetRandomError {
    getRandom () { throw new Error('捕獲失敗'); };
    static get GO_RES () { return '捕獲開始'; };
}
class GetObjectMockPushDataError {
    getRandom () { return '捕獲成功'; };
    pushData () { throw new Error('保存失敗'); };
    static get GO_RES () { return '捕獲開始'; };
}

// RefObjectのMockクラス
class RefObjectMock {
    constructor (Database) { RefObjectMock.db = Database; };
    getLengthTotal () { return '0匹'; };
    getLengthByName (name) { return `${name}は0匹`; };
    getLengthByUser (user) { return `${user}は0匹`; };
    getLengthGreaterThanCp (cp) { return `${cp}以上は0匹`; };
    getLengthIsShiny () { return `色違いは0匹`; };
}
class RefObjectMockConstructorError {
    constructor (Database) { throw new Error('調査失敗'); };
}
class RefObjectMockGetLengthTotalError {
    getLengthTotal () { throw new Error('調査失敗'); };
}
class RefObjectMockGetLengthByNameError {
    getLengthByName (name) { throw new Error('調査失敗'); };
}
class RefObjectMockGetLengthByUserError {
    getLengthByUser () { throw new Error('調査失敗'); };
}
class RefObjectMockGetLengthGreaterThanCpError {
    getLengthGreaterThanCp () { throw new Error('調査失敗'); };
}
class RefObjectMockGetLengthIsShinyError {
    getLengthIsShiny () { throw new Error('調査失敗'); };
}

// RequestApiのMockクラス
class RequestApiMock {
    request (num) {};
}

// DatabaseのMockクラス
class DatabaseMock {
    push (data) {};
    getLength () { return 1; };
    getLengthEqualTo (key, value) { return 1; };
    getLengthGreaterThan (key, value) { return 1; };
}

describe('pokemon.js', () => {
    it('get pokemonを呼ぶと正しく処理する', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // get pokemon呼び出し
        res.messages = [];
        await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕獲開始');
        assert.equal(res.messages[1], '捕獲成功');
        assert.equal(typeof res.messages[2], 'undefined');
        assert.notEqual(GetObjectMock.db, null);
        assert.notEqual(GetObjectMock.db, undefined);
    });

    it('get pokemon内でエラーが発生すると正しく処理する（GetObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMockConstructorError },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // get pokemon呼び出し
        res.messages = [];
        await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕獲開始');
        assert.equal(res.messages[1], '捕獲失敗');
        assert.equal(typeof res.messages[2], 'undefined');
    });

    it('get pokemon内でエラーが発生すると正しく処理する（getRandom()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMockGetRandomError },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // get pokemon呼び出し
        res.messages = [];
        await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕獲開始');
        assert.equal(res.messages[1], '捕獲失敗');
        assert.equal(typeof res.messages[2], 'undefined');
    });

    it('get pokemon内でエラーが発生すると正しく処理する（pushData()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMockPushDataError },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // get pokemon呼び出し
        res.messages = [];
        await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕獲開始');
        assert.equal(res.messages[1], '捕獲成功');
        assert.equal(res.messages[2], '保存失敗');
        assert.equal(typeof res.messages[3], 'undefined');
    });

    it('zukan pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.message.text = 'togoshi-bot zukan pokemon';
        res.messages = [];
        await robot['/zukan pokemon/'](res);
        res.message.text = '@togoshi-bot zukan pokemon';
        await robot['/zukan pokemon/'](res);

        assert.equal(res.messages[0], '0匹');
        assert.equal(res.messages[1], '0匹');
        assert.equal(typeof res.messages[2], 'undefined');
        assert.notEqual(RefObjectMock.db, null);
        assert.notEqual(RefObjectMock.db, undefined);
    });

    it('zukan pokemonが正しく処理される（入力値に数値が付与されている）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.message.text = 'togoshi-bot zukan pokemon 1';
        res.messages = [];
        await robot['/zukan pokemon/'](res);
        res.message.text = '@togoshi-bot zukan pokemon 1';
        await robot['/zukan pokemon/'](res);

        assert.equal(typeof res.messages[0], 'undefined');
    });

    it('zukan pokemon内でエラーが発生すると正しく処理する（RefObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockConstructorError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.message.text = 'togoshi-bot zukan pokemon';
        res.messages = [];
        await robot['/zukan pokemon/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('zukan pokemon内でエラーが発生すると正しく処理する（getLengthTotal()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockGetLengthTotalError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.message.text = 'togoshi-bot zukan pokemon';
        res.messages = [];
        await robot['/zukan pokemon/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('zukan pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.match = [null, 'フシギダネ'];
        res.messages = [];
        await robot['/zukan pokemon (.*)/'](res);

        assert.equal(res.messages[0], 'フシギダネは0匹');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('zukan pokemon (.*)内でエラーが発生すると正しく処理する（RefObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockConstructorError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.match = [null, 'フシギダネ'];
        res.messages = [];
        await robot['/zukan pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('zukan pokemon (.*)内でエラーが発生すると正しく処理する（getLengthByName()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockGetLengthByNameError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // zukan pokemon呼び出し
        res.match = [null, 'フシギダネ'];
        res.messages = [];
        await robot['/zukan pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('user pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // user pokemon呼び出し
        res.match = [null, 'admin'];
        res.messages = [];
        await robot['/user pokemon (.*)/'](res);

        assert.equal(res.messages[0], 'adminは0匹');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('user pokemon (.*)内でエラーが発生すると正しく処理する（RefObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockConstructorError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // user pokemon呼び出し
        res.match = [null, 'admin'];
        res.messages = [];
        await robot['/user pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('user pokemon (.*)内でエラーが発生すると正しく処理する（getLengthByUser()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockGetLengthByUserError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // user pokemon呼び出し
        res.match = [null, 'admin'];
        res.messages = [];
        await robot['/user pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('overcp pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // overcp pokemon呼び出し
        res.match = [null, '1000'];
        res.messages = [];
        await robot['/overcp pokemon (.*)/'](res);

        assert.equal(res.messages[0], '1000以上は0匹');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('overcp pokemon (.*)内でエラーが発生すると正しく処理する（RefObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockConstructorError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // overcp pokemon呼び出し
        res.match = [null, '1000'];
        res.messages = [];
        await robot['/overcp pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('overcp pokemon (.*)内でエラーが発生すると正しく処理する（getLengthGreaterThanCp()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockGetLengthGreaterThanCpError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // overcp pokemon呼び出し
        res.match = [null, '1000'];
        res.messages = [];
        await robot['/overcp pokemon (.*)/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('shiny pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // shiny pokemon呼び出し
        res.messages = [];
        await robot['/shiny pokemon/'](res);

        assert.equal(res.messages[0], '色違いは0匹');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('shiny pokemon内でエラーが発生すると正しく処理する（RefObject生成エラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockConstructorError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // shiny pokemon呼び出し
        res.messages = [];
        await robot['/shiny pokemon/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('shiny pokemon内でエラーが発生すると正しく処理する（getLengthIsShiny()メソッドエラー）', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMockGetLengthIsShinyError },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // shiny pokemon呼び出し
        res.messages = [];
        await robot['/shiny pokemon/'](res);

        assert.equal(res.messages[0], '調査失敗');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('h pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', {
            './pokemon/get-pokemon': { default: GetObjectMock },
            './pokemon/ref-pokemon': { default: RefObjectMock },
            './pokemon/pokeapi-v2': { default: RequestApiMock },
            './pokemon/firebase': { default: DatabaseMock }
        })(robot);
        // h pokemon呼び出し
        res.messages = [];
        await robot['/h pokemon/'](res);

        assert.equal(res.messages[0], `
:heavy_check_mark: \`get pokemon\` : ポケモンを1匹捕まえます
:heavy_check_mark: \`zukan pokemon\` : 今までに捕まえたポケモンの総数を表示
:heavy_check_mark: \`zukan pokemon {name: string}\` : 指定の日本語名の捕まえたポケモンの数を表示
:heavy_check_mark: \`user pokemon {username: string}\` : 指定のusernameが捕まえたポケモンの数を表示
:heavy_check_mark: \`overcp pokemon {cp: number}\` : 指定したCPよりも強いポケモンの数を表示
:heavy_check_mark: \`shiny pokemon\` : 今までに捕まえた色違いポケモンの数を表示
        `);
        assert.equal(typeof res.messages[1], 'undefined');
    });
});
