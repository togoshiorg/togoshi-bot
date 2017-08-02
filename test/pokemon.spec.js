import assert from 'assert';
import proxyquire from 'proxyquire';

describe('pokemon.js', () => {
    // ダミーデータ（共通）
    const dummyCommon = {
        './pokemon/get-pokemon': {
            default: class GetPokemon {
                getSaveData () { return {}; }
                getSuccessRes () { return '成功したゴシ'; }
            }
        },
        './firebase/': { pushData: () => {} },
        './pokemon/constants': {
            RES: {
                go: '捕まえてくるゴシ',
                miss: '失敗したゴシ'
            }
        }
    };
    // ダミーrobot
    const robot = {
        respond: (pattern, func) => {
            robot[new RegExp(pattern)] = func;
        }
    };
    // ダミーres
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

    it('get pokemonが正しく処理される（正常系）', async () => {
        // ダミーデータ（正常系）
        const dummySuccess = {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => {
                        return { id: 1, name: 'bulbasaur' };
                    }
                };
            }
        };
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', Object.assign(dummyCommon, dummySuccess))(robot);
        // get pokemon呼び出し
        res.messages = [];
        await await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕まえてくるゴシ');
        assert.equal(res.messages[1], '成功したゴシ');
    });

    it('get pokemonが正しく処理される（異常系）', async () => {
        // ダミーデータ（異常系）
        const dummyError = {
            'node-fetch': () => {
                return {
                    status: 404,
                    json: () => {
                        return { id: 1, name: 'bulbasaur' };
                    }
                };
            }
        };
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', Object.assign(dummyCommon, dummyError))(robot);
        // get pokemon呼び出し
        res.messages = [];
        await await robot['/get pokemon/'](res);

        assert.equal(res.messages[0], '捕まえてくるゴシ');
        assert.equal(res.messages[1], '失敗したゴシ');
        assert.equal(typeof res.messages[2], 'undefined');
    });
});
