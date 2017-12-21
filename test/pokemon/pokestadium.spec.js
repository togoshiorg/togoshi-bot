
import assert from 'assert';
import Pokestadium from '../../src/pokemon/pokestadium';

describe('pokemon/pokestadium.js', () => {
    it('constructorにidとnameとisShinyを渡すと正しく処理する', () => {
        const data = {
            id: 0,
            name: 'foo',
            isShiny: true
        };
        const pokestadium = new Pokestadium(data);
        assert.equal(pokestadium.id, 0);
        assert.equal(pokestadium.name, 'foo');
        assert.equal(pokestadium.isShiny, true);
        assert.equal(pokestadium.pokestudiumName, 'foo');
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（idがnull）', () => {
        const data = {
            id: null,
            name: 'foo',
            isShiny: true
        };
        assert.throws(
            () => { return new Pokestadium(data); },
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
            () => { return new Pokestadium(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（idが空）', () => {
        const data = {
            name: 'foo',
            isShiny: true
        };
        assert.throws(
            () => { return new Pokestadium(data); },
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
            () => { return new Pokestadium(data); },
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
            () => { return new Pokestadium(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（nameが空）', () => {
        const data = {
            id: 0,
            isShiny: true
        };
        assert.throws(
            () => { return new Pokestadium(data); },
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
            () => { return new Pokestadium(data); },
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
            () => { return new Pokestadium(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（isShinyが空）', () => {
        const data = {
            id: 0,
            name: 'foo'
        };
        assert.throws(
            () => { return new Pokestadium(data); },
            (err) => { assert.equal(err.message, 'Invalid constructor argument.'); return true; }
        );
    });

    it('constructorにidとnameとisShinyを渡さないとErrorをthrowする（dataが空）', () => {
        assert.throws(
            () => { return new Pokestadium(); },
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
        const nidoranf = new Pokestadium(data.nidoranf);
        const nidoranm = new Pokestadium(data.nidoranm);
        assert.equal(nidoranf.pokestudiumName, 'nidoranf');
        assert.equal(nidoranm.pokestudiumName, 'nidoranm');
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
        const deoxysnormal = new Pokestadium(data.deoxysnormal);
        const wormadamplant = new Pokestadium(data.wormadamplant);
        const giratinaaltered = new Pokestadium(data.giratinaaltered);
        const shayminland = new Pokestadium(data.shayminland);
        const basculinredstriped = new Pokestadium(data.basculinredstriped);
        const darmanitanstandard = new Pokestadium(data.darmanitanstandard);
        const tornadusincarnate = new Pokestadium(data.tornadusincarnate);
        const thundurusincarnate = new Pokestadium(data.thundurusincarnate);
        const landorusincarnate = new Pokestadium(data.landorusincarnate);
        const keldeoordinary = new Pokestadium(data.keldeoordinary);
        const meloettaaria = new Pokestadium(data.meloettaaria);
        const meowsticmale = new Pokestadium(data.meowsticmale);
        const aegislashshield = new Pokestadium(data.aegislashshield);
        const pumpkabooaverage = new Pokestadium(data.pumpkabooaverage);
        const gourgeistaverage = new Pokestadium(data.gourgeistaverage);
        assert.equal(deoxysnormal.pokestudiumName, 'deoxys');
        assert.equal(wormadamplant.pokestudiumName, 'wormadam');
        assert.equal(giratinaaltered.pokestudiumName, 'giratina');
        assert.equal(shayminland.pokestudiumName, 'shaymin');
        assert.equal(basculinredstriped.pokestudiumName, 'basculin');
        assert.equal(darmanitanstandard.pokestudiumName, 'darmanitan');
        assert.equal(tornadusincarnate.pokestudiumName, 'tornadus');
        assert.equal(thundurusincarnate.pokestudiumName, 'thundurus');
        assert.equal(landorusincarnate.pokestudiumName, 'landorus');
        assert.equal(keldeoordinary.pokestudiumName, 'keldeo');
        assert.equal(meloettaaria.pokestudiumName, 'meloetta');
        assert.equal(meowsticmale.pokestudiumName, 'meowstic');
        assert.equal(aegislashshield.pokestudiumName, 'aegislash');
        assert.equal(pumpkabooaverage.pokestudiumName, 'pumpkaboo');
        assert.equal(gourgeistaverage.pokestudiumName, 'gourgeist');
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
        const pokestadiumShiny = new Pokestadium(data.shiny);
        const pokestadiumNormal = new Pokestadium(data.normal);
        assert.equal(pokestadiumShiny.getImgPath(), 'http://www.pokestadium.com/sprites/xy/shiny/hoge.gif');
        assert.equal(pokestadiumNormal.getImgPath(), 'http://www.pokestadium.com/sprites/xy/foo.gif');
    });
});
