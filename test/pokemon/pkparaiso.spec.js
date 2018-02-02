
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

    it('29/32はハイフンをアンダースコアに置き換える', () => {
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
        assert.equal(nidoranf.pkparaisoName, 'nidoran_f');
        assert.equal(nidoranm.pkparaisoName, 'nidoran_m');
    });

    it('ハイフンだけを削除する', () => {
        const data = {
            typenull: {
                id: 772,
                name: 'type-null',
                isShiny: false
            },
            tapukoko: {
                id: 785,
                name: 'tapu-koko',
                isShiny: false
            },
            tapulele: {
                id: 786,
                name: 'tapu-lele',
                isShiny: false
            },
            tapubulu: {
                id: 787,
                name: 'tapu-bulu',
                isShiny: false
            },
            tapufini: {
                id: 788,
                name: 'tapu-fini',
                isShiny: false
            }
        };
        const typenull = new Pkparaiso(data.typenull);
        const tapukoko = new Pkparaiso(data.tapukoko);
        const tapulele = new Pkparaiso(data.tapulele);
        const tapubulu = new Pkparaiso(data.tapubulu);
        const tapufini = new Pkparaiso(data.tapufini);
        assert.equal(typenull.pkparaisoName, 'typenull');
        assert.equal(tapukoko.pkparaisoName, 'tapukoko');
        assert.equal(tapulele.pkparaisoName, 'tapulele');
        assert.equal(tapubulu.pkparaisoName, 'tapubulu');
        assert.equal(tapufini.pkparaisoName, 'tapufini');
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
            },
            oricoriobaile: {
                id: 741,
                name: 'oricorio-baile',
                isShiny: false
            },
            lycanrocmidday: {
                id: 745,
                name: 'lycanroc-midday',
                isShiny: false
            },
            wishiwashisolo: {
                id: 746,
                name: 'wishiwashi-solo',
                isShiny: false
            },
            miniorredmeteor: {
                id: 774,
                name: 'minior-red-meteor',
                isShiny: false
            },
            mimikyudisguised: {
                id: 778,
                name: 'mimikyu-disguised',
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
        const oricoriobaile = new Pkparaiso(data.oricoriobaile);
        const lycanrocmidday = new Pkparaiso(data.lycanrocmidday);
        const wishiwashisolo = new Pkparaiso(data.wishiwashisolo);
        const miniorredmeteor = new Pkparaiso(data.miniorredmeteor);
        const mimikyudisguised = new Pkparaiso(data.mimikyudisguised);
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
        assert.equal(oricoriobaile.pkparaisoName, 'oricorio');
        assert.equal(lycanrocmidday.pkparaisoName, 'lycanroc');
        assert.equal(wishiwashisolo.pkparaisoName, 'wishiwashi');
        assert.equal(miniorredmeteor.pkparaisoName, 'minior');
        assert.equal(mimikyudisguised.pkparaisoName, 'mimikyu');
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
            },
            gen6shiny: {
                id: 721,
                name: 'gen6',
                isShiny: true
            },
            gen6normal: {
                id: 721,
                name: 'gen6',
                isShiny: false
            },
            gen7shiny: {
                id: 722,
                name: 'gen7',
                isShiny: true
            },
            gen7normal: {
                id: 722,
                name: 'gen7',
                isShiny: false
            }
        };
        const pokestadiumShiny = new Pkparaiso(data.shiny);
        const pokestadiumNormal = new Pkparaiso(data.normal);
        const pokestadiumGen6Shiny = new Pkparaiso(data.gen6shiny);
        const pokestadiumGen6Normal = new Pkparaiso(data.gen6normal);
        const pokestadiumGen7Shiny = new Pkparaiso(data.gen7shiny);
        const pokestadiumGen7Normal = new Pkparaiso(data.gen7normal);
        assert.equal(pokestadiumShiny.getImgPath(), 'https://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/hoge.gif');
        assert.equal(pokestadiumNormal.getImgPath(), 'https://www.pkparaiso.com/imagenes/xy/sprites/animados/foo.gif');

        // 722を境界に画像パスが変わる
        assert.equal(pokestadiumGen6Shiny.getImgPath(), 'https://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/gen6.gif');
        assert.equal(pokestadiumGen6Normal.getImgPath(), 'https://www.pkparaiso.com/imagenes/xy/sprites/animados/gen6.gif');
        assert.equal(pokestadiumGen7Shiny.getImgPath(), 'https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados-shiny/gen7.gif');
        assert.equal(pokestadiumGen7Normal.getImgPath(), 'https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/gen7.gif');
    });
});
