import assert from 'assert';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import MockDate from 'mockdate';
const GetPokemon = proxyquire('../../src/pokemon/get-pokemon', {
    // get-pokemon.js内のimportをダミーに差し替え
    './pokestadium': {
        default: class Pokestadium {
            constructor ({ id, name, isShiny }) {
                this.id = id;
                this.name = name;
                this.isShiny = isShiny;
            }
            getImgPath () {
                // コンストラクタの引数を元にダミーURLを返却
                if (this.isShiny) {
                    return `http://example.com/shiny/${this.id}/${this.name}.png`;
                } else {
                    return `http://example.com/${this.id}/${this.name}.png`;
                }
            }
        }
    },
    './libs': {
        getRandomNum: (max) => {
            return Math.floor(Math.random() * max);
        }
    }
}).default;

describe('pokemon/get-pokemon.js.js', () => {
    // Math.random上書き前に退避
    const random = Math.random;
    afterEach(() => {
        // Math.randomを戻す
        Math.random = random;
    });

    it('idとnameとuserを渡すとインスタンス作成が正しくされる', () => {
        const json = {
            id: 0,
            name: 'foo'
        };
        const getPokemon = new GetPokemon(json, 'foo-user');
        assert.equal(getPokemon.id, 0);
        assert.equal(getPokemon.name, 'foo');
        assert.equal(getPokemon.user, 'foo-user');
    });

    it('idとnameとuserを渡さないとデフォルトの設定でインスタンス作成される', () => {
        const getPokemon = new GetPokemon();
        assert.equal(getPokemon.id, 1);
        assert.equal(getPokemon.name, 'bulbasaur');
        assert.equal(getPokemon.user, 'admin');
    });

    it('1/4096の確率で色違いが抽選される', () => {
        Math.random = () => { return 0; };
        const getPokemon1 = new GetPokemon();

        Math.random = () => { return 1 / 4096 - 0.0000000001; };
        const getPokemon2 = new GetPokemon();

        Math.random = () => { return 1 / 4096; };
        const getPokemon3 = new GetPokemon();

        Math.random = () => { return 0.9999999999; };
        const getPokemon4 = new GetPokemon();

        assert.equal(getPokemon1.isShiny, true);
        assert.equal(getPokemon2.isShiny, true);
        assert.equal(getPokemon3.isShiny, false);
        assert.equal(getPokemon4.isShiny, false);
    });

    it('決められた確率で強さが抽選される', () => {
        Math.random = () => { return 0; };
        const getPokemon1 = new GetPokemon();

        Math.random = () => { return 0.01 / 100 - 0.0000000001; };
        const getPokemon2 = new GetPokemon();

        Math.random = () => { return 0.01 / 100; };
        const getPokemon3 = new GetPokemon();

        Math.random = () => { return (0.01 + 1) / 100 - 0.0000000001; };
        const getPokemon4 = new GetPokemon();

        Math.random = () => { return (0.01 + 1) / 100; };
        const getPokemon5 = new GetPokemon();

        Math.random = () => { return (1.01 + 5) / 100 - 0.0000000001; };
        const getPokemon6 = new GetPokemon();

        Math.random = () => { return (1.01 + 5) / 100; };
        const getPokemon7 = new GetPokemon();

        Math.random = () => { return (6.01 + 83.49) / 100 - 0.0000000001; };
        const getPokemon8 = new GetPokemon();

        Math.random = () => { return (6.01 + 83.49) / 100; };
        const getPokemon9 = new GetPokemon();

        Math.random = () => { return (89.5 + 10) / 100 - 0.0000000001; };
        const getPokemon10 = new GetPokemon();

        Math.random = () => { return (89.5 + 10) / 100; };
        const getPokemon11 = new GetPokemon();

        Math.random = () => { return 0.9999999999; };
        const getPokemon12 = new GetPokemon();

        assert.equal(getPokemon1.strengthLv, 'god');
        assert.equal(getPokemon2.strengthLv, 'god');
        assert.equal(getPokemon3.strengthLv, 'strongest');
        assert.equal(getPokemon4.strengthLv, 'strongest');
        assert.equal(getPokemon5.strengthLv, 'stronger');
        assert.equal(getPokemon6.strengthLv, 'stronger');
        assert.equal(getPokemon7.strengthLv, 'normal');
        assert.equal(getPokemon8.strengthLv, 'normal');
        assert.equal(getPokemon9.strengthLv, 'weaker');
        assert.equal(getPokemon10.strengthLv, 'weaker');
        assert.equal(getPokemon11.strengthLv, 'weakest');
        assert.equal(getPokemon12.strengthLv, 'weakest');
    });

    it('強さレベルに応じてCPが正しく抽選される', () => {
        // 強さ抽選メソッドをstubに差し替えてstrengthLvを固定
        const stub = sinon.stub(GetPokemon.prototype, 'lotStrength');
        stub.returns('god');
        Math.random = () => { return 0; };
        const god1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const god2 = new GetPokemon();

        stub.returns('strongest');
        Math.random = () => { return 0; };
        const strongest1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const strongest2 = new GetPokemon();

        stub.returns('stronger');
        Math.random = () => { return 0; };
        const stronger1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const stronger2 = new GetPokemon();

        stub.returns('normal');
        Math.random = () => { return 0; };
        const normal1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const normal2 = new GetPokemon();

        stub.returns('weaker');
        Math.random = () => { return 0; };
        const weaker1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const weaker2 = new GetPokemon();

        stub.returns('weakest');
        Math.random = () => { return 0; };
        const weakest1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const weakest2 = new GetPokemon();

        assert.equal(god1.cp, 4000);
        assert.equal(god2.cp, 4000);
        assert(strongest1.cp >= 3500 && strongest1.cp < 4000);
        assert(strongest2.cp >= 3500 && strongest2.cp < 4000);
        assert(stronger1.cp >= 2000 && stronger1.cp < 3500);
        assert(stronger2.cp >= 2000 && stronger2.cp < 3500);
        assert(normal1.cp >= 100 && normal1.cp < 2000);
        assert(normal2.cp >= 100 && normal2.cp < 2000);
        assert(weaker1.cp >= 2 && weaker1.cp < 100);
        assert(weaker2.cp >= 2 && weaker2.cp < 100);
        assert.equal(weakest1.cp, 1);
        assert.equal(weakest2.cp, 1);

        // stubを戻す
        stub.restore();
    });

    it('強さレベルの順番が変わってもCPが正しく抽選される', () => {
        // ポケモンの強さレベルと出現確率、レスポンスコメントを順番を変えたstubに差し替え
        const stubStrength = sinon.stub(GetPokemon, 'STRENGTH');
        stubStrength.get(() => {
            return {
                stronger: { cp: 2000 },
                weaker: { cp: 2 },
                strongest: { cp: 3500 },
                weakest: { cp: 1 },
                normal: { cp: 100 },
                god: { cp: 4000 }
            };
        });

        // 強さ抽選メソッドをstubに差し替えてstrengthLvを固定
        const stubLotStrength = sinon.stub(GetPokemon.prototype, 'lotStrength');
        stubLotStrength.returns('god');
        Math.random = () => { return 0; };
        const god1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const god2 = new GetPokemon();

        stubLotStrength.returns('strongest');
        Math.random = () => { return 0; };
        const strongest1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const strongest2 = new GetPokemon();

        stubLotStrength.returns('stronger');
        Math.random = () => { return 0; };
        const stronger1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const stronger2 = new GetPokemon();

        stubLotStrength.returns('normal');
        Math.random = () => { return 0; };
        const normal1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const normal2 = new GetPokemon();

        stubLotStrength.returns('weaker');
        Math.random = () => { return 0; };
        const weaker1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const weaker2 = new GetPokemon();

        stubLotStrength.returns('weakest');
        Math.random = () => { return 0; };
        const weakest1 = new GetPokemon();
        Math.random = () => { return 0.999999999; };
        const weakest2 = new GetPokemon();

        assert.equal(god1.cp, 4000);
        assert.equal(god2.cp, 4000);
        assert(strongest1.cp >= 3500 && strongest1.cp < 4000);
        assert(strongest2.cp >= 3500 && strongest2.cp < 4000);
        assert(stronger1.cp >= 2000 && stronger1.cp < 3500);
        assert(stronger2.cp >= 2000 && stronger2.cp < 3500);
        assert(normal1.cp >= 100 && normal1.cp < 2000);
        assert(normal2.cp >= 100 && normal2.cp < 2000);
        assert(weaker1.cp >= 2 && weaker1.cp < 100);
        assert(weaker2.cp >= 2 && weaker2.cp < 100);
        assert.equal(weakest1.cp, 1);
        assert.equal(weakest2.cp, 1);

        // stubを戻す
        stubStrength.restore();
        stubLotStrength.restore();
    });

    it('正しいidを渡すとポケモンの日本語名が正しく作成される', () => {
        const json = {
            id: 5
        };
        const getPokemon = new GetPokemon(json);
        assert.equal(getPokemon.jpName, 'リザード');
    });

    it('正しくないidを渡すとnameがそのまま日本語名として作成される', () => {
        const json = {
            id: 9999,
            name: 'foo'
        };
        const getPokemon = new GetPokemon(json);
        assert.equal(getPokemon.jpName, 'foo');
    });

    it('画像PATHが正しく作成される', () => {
        // 色違い抽選メソッドをstubに差し替えてisShinyを固定
        const stubLotShiny = sinon.stub(GetPokemon.prototype, 'lotShiny');
        stubLotShiny.returns(true);
        const json1 = {
            id: 1,
            name: 'hoge'
        };
        const getPokemon1 = new GetPokemon(json1);
        stubLotShiny.returns(false);
        const json2 = {
            id: 2,
            name: 'foo'
        };
        const getPokemon2 = new GetPokemon(json2);
        assert.equal(getPokemon1.img, 'http://example.com/shiny/1/hoge.png');
        assert.equal(getPokemon2.img, 'http://example.com/2/foo.png');

        // stubを戻す
        stubLotShiny.restore();
    });

    it('捕まえた時間が正しく作成される', () => {
        // new Date()をMockに差し替え(※タイムゾーン0)
        MockDate.set('1/1/2017 12:34:56', 0);
        const getPokemon = new GetPokemon();
        assert.equal(getPokemon.time, '2017-01-01T12:34:56+00:00');

        // new Date()を戻す
        MockDate.reset();
    });

    it('保存用データが正しく返却される', () => {
        // new Date()をMockに差し替え(※タイムゾーン0)
        MockDate.set('1/1/2017 12:34:56', 0);
        // 色違い抽選メソッドをstubに差し替えてisShinyを固定
        const stubLotShiny = sinon.stub(GetPokemon.prototype, 'lotShiny');
        stubLotShiny.returns(true);
        // CP抽選メソッドをstubに差し替えてCPを固定
        const stubLotCp = sinon.stub(GetPokemon.prototype, 'lotCp');
        stubLotCp.returns(100);

        const json = {
            id: 2,
            name: 'Ivysaur'
        };
        const saveData = new GetPokemon(json, 'foo').getSaveData();
        assert.equal(saveData.id, 2);
        assert.equal(saveData.user, 'foo');
        assert.equal(saveData.time, '2017-01-01T12:34:56+00:00');
        assert.equal(saveData.cp, 100);
        assert.equal(saveData.isShiny, true);

        // new Date()を戻す
        MockDate.reset();
        // stubを戻す
        stubLotShiny.restore();
        stubLotCp.restore();
    });

    it('成功時のメッセージが正しく返却される', () => {
        // 色違い抽選メソッドをstubに差し替えてisShinyを固定
        const stubLotShiny = sinon.stub(GetPokemon.prototype, 'lotShiny');
        stubLotShiny.returns(true);
        // 強さ抽選メソッドをstubに差し替えてstrengthLvを固定
        const stubLotStrength = sinon.stub(GetPokemon.prototype, 'lotStrength');
        stubLotStrength.returns('god');
        // CP抽選メソッドをstubに差し替えてCPを固定
        const stubLotCp = sinon.stub(GetPokemon.prototype, 'lotCp');
        stubLotCp.returns(100);
        // 日本語名作成メソッドをstubに差し替えて日本語名を固定
        const stubCreateJpName = sinon.stub(GetPokemon.prototype, 'createJpName');
        stubCreateJpName.returns('フシギダネ');
        // 画像パス作成メソッドをstubに差し替えて画像パスを固定
        const stubCreateImgPath = sinon.stub(GetPokemon.prototype, 'createImgPath');
        stubCreateImgPath.returns('http://example.com/1/foo.png');
        const res1 = new GetPokemon().getSuccessRes();

        stubLotShiny.returns(false);
        stubLotStrength.returns('strongest');
        const res2 = new GetPokemon().getSuccessRes();

        stubLotStrength.returns('stronger');
        const res3 = new GetPokemon().getSuccessRes();

        stubLotStrength.returns('normal');
        const res4 = new GetPokemon().getSuccessRes();

        stubLotStrength.returns('weaker');
        const res5 = new GetPokemon().getSuccessRes();

        stubLotStrength.returns('weakest');
        const res6 = new GetPokemon().getSuccessRes();

        assert.equal(res1, ':god:\n色違いを捕まえたゴシィィィ！！！？\nCP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');
        assert.equal(res2, 'コイツは空前絶後のつよさゴシ！！\nCP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');
        assert.equal(res3, 'コイツはつよいゴシ！！\nCP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');
        assert.equal(res4, 'CP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');
        assert.equal(res5, 'コイツはよわいゴシ…。\nCP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');
        assert.equal(res6, 'コイツは超絶孤高によわすぎるゴシ…。\nCP100のフシギダネを捕まえたゴシ！\nhttp://example.com/1/foo.png');

        // stubを戻す
        stubLotShiny.restore();
        stubLotStrength.restore();
        stubLotCp.restore();
        stubCreateJpName.restore();
        stubCreateImgPath.restore();
    });

    it('定数が正しく返却される', () => {
        assert.equal(GetPokemon.MAX, 720);
        assert.equal(GetPokemon.MAXCP, 4000);
        assert.equal(GetPokemon.STRENGTH.god.cp, 4000);
        assert.equal(GetPokemon.STRENGTH.god.res, ':god:');
        assert.equal(GetPokemon.STRENGTH.god.probability, 0.01);
        assert.equal(GetPokemon.STRENGTH.strongest.cp, 3500);
        assert.equal(GetPokemon.STRENGTH.strongest.res, 'コイツは空前絶後のつよさゴシ！！');
        assert.equal(GetPokemon.STRENGTH.strongest.probability, 1);
        assert.equal(GetPokemon.STRENGTH.stronger.cp, 2000);
        assert.equal(GetPokemon.STRENGTH.stronger.res, 'コイツはつよいゴシ！！');
        assert.equal(GetPokemon.STRENGTH.stronger.probability, 5);
        assert.equal(GetPokemon.STRENGTH.normal.cp, 100);
        assert.equal(GetPokemon.STRENGTH.normal.res, '');
        assert.equal(GetPokemon.STRENGTH.normal.probability, 83.49);
        assert.equal(GetPokemon.STRENGTH.weaker.cp, 2);
        assert.equal(GetPokemon.STRENGTH.weaker.res, 'コイツはよわいゴシ…。');
        assert.equal(GetPokemon.STRENGTH.weaker.probability, 10);
        assert.equal(GetPokemon.STRENGTH.weakest.cp, 1);
        assert.equal(GetPokemon.STRENGTH.weakest.res, 'コイツは超絶孤高によわすぎるゴシ…。');
        assert.equal(GetPokemon.STRENGTH.weakest.probability, 0.5);
    });
});
