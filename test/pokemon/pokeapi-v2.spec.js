
import assert from 'assert';
import proxyquire from 'proxyquire';

describe('pokemon/pokeapi-v2.js', () => {
    it('request()メソッドを呼ぶと正しく処理する', async () => {
        // pokeapi-v2.js内のimportをダミーに差し替え
        const PokeapiV2 = proxyquire('../../src/pokemon/pokeapi-v2', {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => { return { name: 'foo' }; }
                };
            }
        }).default;

        const pokeapiV2 = new PokeapiV2();
        const data = await pokeapiV2.request(0);
        assert.equal(data.name, 'foo');
    });

    it('request()メソッドにnumを渡さないとErrorをthrowする（numがnull）', async () => {
        // pokeapi-v2.js内のimportをダミーに差し替え
        const PokeapiV2 = proxyquire('../../src/pokemon/pokeapi-v2', {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => { return { name: 'foo' }; }
                };
            }
        }).default;

        const pokeapiV2 = new PokeapiV2();
        try {
            await pokeapiV2.request(null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('request()メソッドにnumを渡さないとErrorをthrowする（numがundefined）', async () => {
        // pokeapi-v2.js内のimportをダミーに差し替え
        const PokeapiV2 = proxyquire('../../src/pokemon/pokeapi-v2', {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => { return { name: 'foo' }; }
                };
            }
        }).default;

        const pokeapiV2 = new PokeapiV2();
        try {
            await pokeapiV2.request(undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('request()メソッドにnumを渡さないとErrorをthrowする（numが空）', async () => {
        // pokeapi-v2.js内のimportをダミーに差し替え
        const PokeapiV2 = proxyquire('../../src/pokemon/pokeapi-v2', {
            'node-fetch': () => {
                return {
                    status: 200,
                    json: () => { return { name: 'foo' }; }
                };
            }
        }).default;

        const pokeapiV2 = new PokeapiV2();
        try {
            await pokeapiV2.request();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('request()メソッド内でエラーが発生するとErrorをthrowする（レスポンスステータスが200以外）', async () => {
        // pokeapi-v2.js内のimportをダミーに差し替え
        const PokeapiV2 = proxyquire('../../src/pokemon/pokeapi-v2', {
            'node-fetch': () => {
                return {
                    status: 500,
                    statusText: '500 Internal Server Error'
                };
            }
        }).default;

        const pokeapiV2 = new PokeapiV2();
        try {
            await pokeapiV2.request(0);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, '500 Internal Server Error');
        }
    });
});
