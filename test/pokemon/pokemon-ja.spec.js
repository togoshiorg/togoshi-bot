import assert from 'assert';
import proxyquire from 'proxyquire';

// PokemonImgのMockクラス
class PokemonImgMock {
    constructor ({id}) { this.id = id; }
    getImgPath () { return `http://example.com/${this.id}/bulbasaur.png`; }
}

// pokemon-en.js内のimportをダミーに差し替え
const PokemonEn = proxyquire('../../src/pokemon/pokemon-en', {
    './pkparaiso': { default: PokemonImgMock }
}).default;

// pokemon-ja.js内のimportをダミーに差し替え
const PokemonJa = proxyquire('../../src/pokemon/pokemon-ja', {
    './pokemon-en': { default: PokemonEn }
}).default;

describe('pokemon/pokemon-ja.js', () => {
    it('正しいidを渡すとポケモンの日本語名を正しく作成する', () => {
        const data = {
            id: 5,
            name: 'foo'
        };
        const pokemonObj = new PokemonJa(data);
        assert.equal(pokemonObj.getName(), 'リザード');
    });

    it('正しくないidを渡すとnameをそのまま日本語名として作成する', () => {
        const data = {
            id: 9999,
            name: 'foo'
        };
        const pokemonObj = new PokemonJa(data);
        assert.equal(pokemonObj.getName(), 'foo');
    });
});
