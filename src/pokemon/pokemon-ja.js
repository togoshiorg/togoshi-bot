// @flow

import PokemonEn from './pokemon-en';
import translateData from '../../data/pokemon.json';

export default class PokemonJa extends PokemonEn {
    constructor ({ id, name }: Object = {}) {
        super({ id, name });
        this.name = this.translateName(id, name);
    }

    // ポケモンの表示名を翻訳する
    translateName (id: number, name: string): string {
        try {
            return translateData[id - 1].ja;
        } catch (err) {
            // 該当する日本語名が無かった場合はnameをそのまま返却
            return name;
        }
    }
}
