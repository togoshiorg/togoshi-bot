import assert from 'assert';
import proxyquire from 'proxyquire';

describe('pokemon.js', () => {
    let dummyCommon;
    let robot;
    let res;
    beforeEach(() => {
        // ダミーデータ（共通）
        dummyCommon = {
            './pokemon/get-pokemon': {
                default: class GetPokemon {
                    getSaveData () { return {}; }
                    getSuccessRes () { return '成功したゴシ'; }
                }
            },
            './pokemon/libs': {
                getRandomUrl: () => {},
                getLengthRes: (length) => { return `${length}匹ゴシ！`; },
                getLengthNameRes: (length, name) => { return `${name}は${length}匹ゴシ！`; },
                getLengthUserRes: (length, user) => { return `${user}は${length}匹ゴシ！！`; },
                getLengthOvercpRes: (length, selectCp) => { return `${selectCp}以上は${length}匹ゴシ！`; },
                getLengthShinyRes: (length) => { return `色違いは${length}匹ゴシ！`; }
            },
            './firebase/': {
                pushData: () => {},
                readLength: () => {
                    return new Promise(resolve => { resolve(0); });
                },
                readLengthName: () => {
                    return new Promise(resolve => { resolve(0); });
                },
                equalUser: () => {
                    return new Promise(resolve => { resolve(0); });
                },
                overCp: () => {
                    return new Promise(resolve => { resolve(0); });
                },
                equalShiny: () => {
                    return new Promise(resolve => { resolve(0); });
                }
            },
            './pokemon/constants': {
                RES: {
                    go: '捕まえてくるゴシ',
                    miss: '失敗したゴシ',
                    help: 'helpゴシ'
                }
            }
        };
        // ダミーrobot
        robot = {
            respond: (pattern, func) => {
                robot[new RegExp(pattern)] = func;
            }
        };
        // ダミーres
        res = {
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
    });

    /* it('get pokemonが正しく処理される（正常系）', async () => {
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
        assert.equal(typeof res.messages[2], 'undefined');
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

    it('zukan pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // zukan pokemon呼び出し
        res.message.text = 'togoshi-bot zukan pokemon';
        res.messages = [];
        await robot['/zukan pokemon/'](res);
        res.message.text = '@togoshi-bot zukan pokemon';
        await robot['/zukan pokemon/'](res);

        assert.equal(res.messages[0], '0匹ゴシ！');
        assert.equal(res.messages[1], '0匹ゴシ！');
        assert.equal(typeof res.messages[2], 'undefined');
    });

    it('zukan pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // zukan pokemon呼び出し
        res.match = [null, 'フシギダネ'];
        res.messages = [];
        await robot['/zukan pokemon (.*)/'](res);

        assert.equal(res.messages[0], 'フシギダネは0匹ゴシ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('user pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // user pokemon呼び出し
        res.match = [null, 'admin'];
        res.messages = [];
        await robot['/user pokemon (.*)/'](res);

        assert.equal(res.messages[0], 'adminは0匹ゴシ！！');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('overcp pokemon (.*)が正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // overcp pokemon呼び出し
        res.match = [null, '1000'];
        res.messages = [];
        await robot['/overcp pokemon (.*)/'](res);

        assert.equal(res.messages[0], '1000以上は0匹ゴシ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('shiny pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // shiny pokemon呼び出し
        res.messages = [];
        await robot['/shiny pokemon/'](res);

        assert.equal(res.messages[0], '色違いは0匹ゴシ！');
        assert.equal(typeof res.messages[1], 'undefined');
    });

    it('h pokemonが正しく処理される', async () => {
        // pokemon.js内のimportをダミーに差し替え
        proxyquire('../src/pokemon', dummyCommon)(robot);
        // h pokemon呼び出し
        res.messages = [];
        await robot['/h pokemon/'](res);

        assert.equal(res.messages[0], 'helpゴシ');
        assert.equal(typeof res.messages[1], 'undefined');
    }); */
});
