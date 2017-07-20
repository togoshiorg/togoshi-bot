import assert from 'assert';
import * as libs from '../src/pokemon/libs';
import {
    MAX,
    MAXCP,
    API,
    PATH,
    RES
} from '../src/pokemon/constants';

describe('pokemon.js', () => {
    it('evalPokeCpRes', () => {
        const over1900 = libs.evalPokeCpRes(1901);
        const under100 = libs.evalPokeCpRes(99);
        assert.equal(over1900, RES.strong);
        assert.equal(under100, RES.weak);

        const match1900 = libs.evalPokeCpRes(1900);
        const match100 = libs.evalPokeCpRes(100);
        const middle = libs.evalPokeCpRes(500);
        assert.equal(match1900, '');
        assert.equal(match100, '');
        assert.equal(middle, '');
    });
});