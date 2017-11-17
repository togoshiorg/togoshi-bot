import assert from 'assert';
import sinon from 'sinon';
import rewire from 'rewire';
import PokemonJa from '../../src/pokemon/pokemon-ja';

// PokemonImgのMockクラス
class PokemonImgMock {
    constructor ({id}) { this.id = id; }
    getImgPath () { return `http://example.com/${this.id}/bulbasaur.png`; }
}

describe('pokemon/pokemon-ja.js', () => {
    // Math.random上書き前に退避
    const random = Math.random;
    afterEach(() => {
        // Math.randomを戻す
        Math.random = random;
    });

    it('constructorにidとnameとPokemonImgクラスを渡すと正しく処理する', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        assert.doesNotThrow(
            () => {
                return new PokemonJa(data, PokemonImgMock);
            }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（idがnull）', () => {
        const data = {
            id: null,
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（idがundefined）', () => {
        const data = {
            id: undefined,
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（idが空）', () => {
        const data = {
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（nameがnull）', () => {
        const data = {
            id: 0,
            name: null
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（nameがundefined）', () => {
        const data = {
            id: 0,
            name: undefined
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（nameが空）', () => {
        const data = {
            id: 0
        };

        assert.throws(
            () => { return new PokemonJa(data, PokemonImgMock); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（PokemonImgがnull）', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data, null); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（PokemonImgがundefined）', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data, undefined); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（PokemonImgが空）', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        assert.throws(
            () => { return new PokemonJa(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとPokemonImgクラスを渡さないとErrorをthrowする（dataおよびPokemonImgが空）', () => {
        assert.throws(
            () => { return new PokemonJa(); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('idを作成する', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        const pokemonObj = new PokemonJa(data, PokemonImgMock);
        assert.equal(pokemonObj.getId(), 0);
    });

    it('正しいidを渡すとポケモンの日本語名を正しく作成する', () => {
        const data = {
            id: 5,
            name: 'foo'
        };
        const pokemonObj = new PokemonJa(data, PokemonImgMock);
        assert.equal(pokemonObj.getName(), 'リザード');
    });

    it('正しくないidを渡すとnameをそのまま日本語名として作成する', () => {
        const data = {
            id: 9999,
            name: 'foo'
        };
        const pokemonObj = new PokemonJa(data, PokemonImgMock);
        assert.equal(pokemonObj.getName(), 'foo');
    });

    it('1/4096の確率で色違いを抽選する', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        Math.random = () => { return 0; };
        const pokemonObj1 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 1 / 4096 - 0.0000000001; };
        const pokemonObj2 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 1 / 4096; };
        const pokemonObj3 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 0.9999999999; };
        const pokemonObj4 = new PokemonJa(data, PokemonImgMock);

        assert.equal(pokemonObj1.getIsShiny(), true);
        assert.equal(pokemonObj2.getIsShiny(), true);
        assert.equal(pokemonObj3.getIsShiny(), false);
        assert.equal(pokemonObj4.getIsShiny(), false);
    });

    it('決められた確率で強さを抽選する', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        Math.random = () => { return 0; };
        const pokemonObj1 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 0.01 / 100 - 0.0000000001; };
        const pokemonObj2 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 0.01 / 100; };
        const pokemonObj3 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (0.01 + 1) / 100 - 0.0000000001; };
        const pokemonObj4 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (0.01 + 1) / 100; };
        const pokemonObj5 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (1.01 + 5) / 100 - 0.0000000001; };
        const pokemonObj6 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (1.01 + 5) / 100; };
        const pokemonObj7 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (6.01 + 83.49) / 100 - 0.0000000001; };
        const pokemonObj8 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (6.01 + 83.49) / 100; };
        const pokemonObj9 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (89.5 + 10) / 100 - 0.0000000001; };
        const pokemonObj10 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return (89.5 + 10) / 100; };
        const pokemonObj11 = new PokemonJa(data, PokemonImgMock);

        Math.random = () => { return 0.9999999999; };
        const pokemonObj12 = new PokemonJa(data, PokemonImgMock);

        assert.equal(pokemonObj1.getStrengthLv(), 'god');
        assert.equal(pokemonObj2.getStrengthLv(), 'god');
        assert.equal(pokemonObj3.getStrengthLv(), 'strongest');
        assert.equal(pokemonObj4.getStrengthLv(), 'strongest');
        assert.equal(pokemonObj5.getStrengthLv(), 'stronger');
        assert.equal(pokemonObj6.getStrengthLv(), 'stronger');
        assert.equal(pokemonObj7.getStrengthLv(), 'normal');
        assert.equal(pokemonObj8.getStrengthLv(), 'normal');
        assert.equal(pokemonObj9.getStrengthLv(), 'weaker');
        assert.equal(pokemonObj10.getStrengthLv(), 'weaker');
        assert.equal(pokemonObj11.getStrengthLv(), 'weakest');
        assert.equal(pokemonObj12.getStrengthLv(), 'weakest');
    });

    it('強さレベルに応じてCPを正しく抽選する', () => {
        const data = {
            id: 0,
            name: 'foo'
        };

        // 強さ抽選メソッドをstubに差し替えてstrengthLvを固定
        const stub = sinon.stub(PokemonJa.prototype, 'lotStrength');
        stub.returns('god');
        Math.random = () => { return 0; };
        const god1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const god2 = new PokemonJa(data, PokemonImgMock);

        stub.returns('strongest');
        Math.random = () => { return 0; };
        const strongest1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const strongest2 = new PokemonJa(data, PokemonImgMock);

        stub.returns('stronger');
        Math.random = () => { return 0; };
        const stronger1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const stronger2 = new PokemonJa(data, PokemonImgMock);

        stub.returns('normal');
        Math.random = () => { return 0; };
        const normal1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const normal2 = new PokemonJa(data, PokemonImgMock);

        stub.returns('weaker');
        Math.random = () => { return 0; };
        const weaker1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const weaker2 = new PokemonJa(data, PokemonImgMock);

        stub.returns('weakest');
        Math.random = () => { return 0; };
        const weakest1 = new PokemonJa(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const weakest2 = new PokemonJa(data, PokemonImgMock);

        assert.equal(god1.getCp(), 4000);
        assert.equal(god2.getCp(), 4000);
        assert(strongest1.getCp() >= 3500 && strongest1.getCp() < 4000);
        assert(strongest2.getCp() >= 3500 && strongest2.getCp() < 4000);
        assert(stronger1.getCp() >= 2000 && stronger1.getCp() < 3500);
        assert(stronger2.getCp() >= 2000 && stronger2.getCp() < 3500);
        assert(normal1.getCp() >= 100 && normal1.getCp() < 2000);
        assert(normal2.getCp() >= 100 && normal2.getCp() < 2000);
        assert(weaker1.getCp() >= 2 && weaker1.getCp() < 100);
        assert(weaker2.getCp() >= 2 && weaker2.getCp() < 100);
        assert.equal(weakest1.getCp(), 1);
        assert.equal(weakest2.getCp(), 1);

        // stubを戻す
        stub.restore();
    });

    it('強さレベルの順番が変わってもCPを正しく抽選する', () => {
        // ポケモンの強さレベルと出現確率、レスポンスコメントを順番を変えたstubに差し替え
        const module = rewire('../../src/pokemon/pokemon-ja.js');
        module.__set__({
            'STRENGTH': {
                stronger: { cp: 2000 },
                weaker: { cp: 2 },
                strongest: { cp: 3500 },
                weakest: { cp: 1 },
                normal: { cp: 100 },
                god: { cp: 4000 }
            }
        });
        // stubに差し替えたGetPokemonクラスを再取得
        const PokemonJaRewire = module.__get__('PokemonJa');

        const data = {
            id: 0,
            name: 'foo'
        };

        // 強さ抽選メソッドをstubに差し替えてstrengthLvを固定
        const stubLotStrength = sinon.stub(PokemonJaRewire.prototype, 'lotStrength');
        stubLotStrength.returns('god');
        Math.random = () => { return 0; };
        const god1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const god2 = new PokemonJaRewire(data, PokemonImgMock);

        stubLotStrength.returns('strongest');
        Math.random = () => { return 0; };
        const strongest1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const strongest2 = new PokemonJaRewire(data, PokemonImgMock);

        stubLotStrength.returns('stronger');
        Math.random = () => { return 0; };
        const stronger1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const stronger2 = new PokemonJaRewire(data, PokemonImgMock);

        stubLotStrength.returns('normal');
        Math.random = () => { return 0; };
        const normal1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const normal2 = new PokemonJaRewire(data, PokemonImgMock);

        stubLotStrength.returns('weaker');
        Math.random = () => { return 0; };
        const weaker1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const weaker2 = new PokemonJaRewire(data, PokemonImgMock);

        stubLotStrength.returns('weakest');
        Math.random = () => { return 0; };
        const weakest1 = new PokemonJaRewire(data, PokemonImgMock);
        Math.random = () => { return 0.999999999; };
        const weakest2 = new PokemonJaRewire(data, PokemonImgMock);

        assert.equal(god1.getCp(), 4000);
        assert.equal(god2.getCp(), 4000);
        assert(strongest1.getCp() >= 3500 && strongest1.getCp() < 4000);
        assert(strongest2.getCp() >= 3500 && strongest2.getCp() < 4000);
        assert(stronger1.getCp() >= 2000 && stronger1.getCp() < 3500);
        assert(stronger2.getCp() >= 2000 && stronger2.getCp() < 3500);
        assert(normal1.getCp() >= 100 && normal1.getCp() < 2000);
        assert(normal2.getCp() >= 100 && normal2.getCp() < 2000);
        assert(weaker1.getCp() >= 2 && weaker1.getCp() < 100);
        assert(weaker2.getCp() >= 2 && weaker2.getCp() < 100);
        assert.equal(weakest1.getCp(), 1);
        assert.equal(weakest2.getCp(), 1);
    });

    it('画像PATHを正しく作成する', () => {
        const data = {
            id: 1,
            name: 'hoge'
        };
        const pokemonObj = new PokemonJa(data, PokemonImgMock);
        assert.equal(pokemonObj.getImg(), 'http://example.com/1/bulbasaur.png');
    });
});
