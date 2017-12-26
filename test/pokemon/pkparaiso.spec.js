
import assert from 'assert';
import Pkparaiso from '../../src/pokemon/pkparaiso';

describe('pokemon/pkparaiso.js', () => {
    it('constructorにidとnameとisShinyを渡すと正しく処理する', () => {
        const data = {
            id: 0,
            name: 'foo',
            isShiny: true
        };
        const pkparaiso = new Pkparaiso(data);
        assert.equal(pkparaiso.id, 0);
        assert.equal(pkparaiso.name, 'foo');
        assert.equal(pkparaiso.isShiny, true);
        assert.equal(pkparaiso.pkparaisoName, 'foo');
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（idがnull）', () => {
        const data = {
            id: null,
            name: 'foo',
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（idがundefined）', () => {
        const data = {
            id: undefined,
            name: 'foo',
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（idが空）', () => {
        const data = {
            name: 'foo',
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（nameがnull）', () => {
        const data = {
            id: 0,
            name: null,
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（nameがundefined）', () => {
        const data = {
            id: 0,
            name: undefined,
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（nameが空）', () => {
        const data = {
            id: 0,
            isShiny: true
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（isShinyがnull）', () => {
        const data = {
            id: 0,
            name: 'foo',
            isShiny: null
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（isShinyがundefined）', () => {
        const data = {
            id: 0,
            name: 'foo',
            isShiny: undefined
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（isShinyが空）', () => {
        const data = {
            id: 0,
            name: 'foo'
        };
        assert.throws(
            () => { return new Pkparaiso(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（dataが空）', () => {
        assert.throws(
            () => { return new Pkparaiso(); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('ハイフンの入ったnameからハイフンのみを削除する', () => {
        const data = {
            nidoranf: {
                id: 29,
                name: 'nidoran-f',
                isShiny: false
            },
            nidoranm: {
                id: 32,
                name: 'nidoran-m',
                isShiny: false
            }
        };
        const nidoranf = new Pkparaiso(data.nidoranf);
        const nidoranm = new Pkparaiso(data.nidoranm);
        assert.equal(nidoranf.pkparaisoName, 'nidoranf');
        assert.equal(nidoranm.pkparaisoName, 'nidoranm');
    });

    it('ハイフンの入ったnameからハイフンから後ろを削除する', () => {
        const data = {
            deoxysnormal: {
                id: 386,
                name: 'deoxys-normal',
                isShiny: false
            },
            wormadamplant: {
                id: 413,
                name: 'wormadam-plant',
                isShiny: false
            },
            giratinaaltered: {
                id: 487,
                name: 'giratina-altered',
                isShiny: false
            },
            shayminland: {
                id: 492,
                name: 'shaymin-land',
                isShiny: false
            },
            basculinredstriped: {
                id: 550,
                name: 'basculin-red-striped',
                isShiny: false
            },
            darmanitanstandard: {
                id: 555,
                name: 'darmanitan-standard',
                isShiny: false
            },
            tornadusincarnate: {
                id: 641,
                name: 'tornadus-incarnate',
                isShiny: false
            },
            thundurusincarnate: {
                id: 642,
                name: 'thundurus-incarnate',
                isShiny: false
            },
            landorusincarnate: {
                id: 645,
                name: 'landorus-incarnate',
                isShiny: false
            },
            keldeoordinary: {
                id: 647,
                name: 'keldeo-ordinary',
                isShiny: false
            },
            meloettaaria: {
                id: 648,
                name: 'meloetta-aria',
                isShiny: false
            },
            meowsticmale: {
                id: 678,
                name: 'meowstic-male',
                isShiny: false
            },
            aegislashshield: {
                id: 681,
                name: 'aegislash-shield',
                isShiny: false
            },
            pumpkabooaverage: {
                id: 710,
                name: 'pumpkaboo-average',
                isShiny: false
            },
            gourgeistaverage: {
                id: 711,
                name: 'gourgeist-average',
                isShiny: false
            }
        };
        const deoxysnormal = new Pkparaiso(data.deoxysnormal);
        const wormadamplant = new Pkparaiso(data.wormadamplant);
        const giratinaaltered = new Pkparaiso(data.giratinaaltered);
        const shayminland = new Pkparaiso(data.shayminland);
        const basculinredstriped = new Pkparaiso(data.basculinredstriped);
        const darmanitanstandard = new Pkparaiso(data.darmanitanstandard);
        const tornadusincarnate = new Pkparaiso(data.tornadusincarnate);
        const thundurusincarnate = new Pkparaiso(data.thundurusincarnate);
        const landorusincarnate = new Pkparaiso(data.landorusincarnate);
        const keldeoordinary = new Pkparaiso(data.keldeoordinary);
        const meloettaaria = new Pkparaiso(data.meloettaaria);
        const meowsticmale = new Pkparaiso(data.meowsticmale);
        const aegislashshield = new Pkparaiso(data.aegislashshield);
        const pumpkabooaverage = new Pkparaiso(data.pumpkabooaverage);
        const gourgeistaverage = new Pkparaiso(data.gourgeistaverage);
        assert.equal(deoxysnormal.pkparaisoName, 'deoxys');
        assert.equal(wormadamplant.pkparaisoName, 'wormadam');
        assert.equal(giratinaaltered.pkparaisoName, 'giratina');
        assert.equal(shayminland.pkparaisoName, 'shaymin');
        assert.equal(basculinredstriped.pkparaisoName, 'basculin');
        assert.equal(darmanitanstandard.pkparaisoName, 'darmanitan');
        assert.equal(tornadusincarnate.pkparaisoName, 'tornadus');
        assert.equal(thundurusincarnate.pkparaisoName, 'thundurus');
        assert.equal(landorusincarnate.pkparaisoName, 'landorus');
        assert.equal(keldeoordinary.pkparaisoName, 'keldeo');
        assert.equal(meloettaaria.pkparaisoName, 'meloetta');
        assert.equal(meowsticmale.pkparaisoName, 'meowstic');
        assert.equal(aegislashshield.pkparaisoName, 'aegislash');
        assert.equal(pumpkabooaverage.pkparaisoName, 'pumpkaboo');
        assert.equal(gourgeistaverage.pkparaisoName, 'gourgeist');
    });

    it('画像パスを正しく返却する', () => {
        const data = {
            shiny: {
                id: 0,
                name: 'hoge',
                isShiny: true
            },
            normal: {
                id: 1,
                name: 'foo',
                isShiny: false
            }
        };
        const pokestadiumShiny = new Pkparaiso(data.shiny);
        const pokestadiumNormal = new Pkparaiso(data.normal);
        assert.equal(pokestadiumShiny.getImgPath(), 'http://www.pokestadium.com/sprites/xy/shiny/hoge.gif');
        assert.equal(pokestadiumNormal.getImgPath(), 'http://www.pokestadium.com/sprites/xy/foo.gif');
    });
});
