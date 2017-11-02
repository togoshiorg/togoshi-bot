// @flow

import translateData from '../../data/pokemon.json';

export default class RefPokemon {
    db: Database;

    constructor (Database: Class<Database>) {
        if (Database == null) throw new Error(RefPokemon.REF_ERROR_RES);
        this.db = new Database();
    }

    // 今までに捕まえたポケモンの総数を返却する（public）
    async getLengthTotal (): Object {
        try {
            const length = await this.db.getLength();
            return `全部で${length}匹捕まえたゴシ！`;
        } catch (err) {
            throw new Error(RefPokemon.REF_ERROR_RES);
        }
    }

    // 指定の日本語名のポケモンを捕まえた数を返却する（public）
    async getLengthByName (name: string): Object {
        let id: number;
        translateData.forEach((data, index) => {
            if (data.ja === name) id = (index + 1);
        });
        try {
            const length = await this.db.getLengthEqualTo('id', id);
            return length ? `${name}はこれまでに${length}匹捕まえたゴシ！` : `${name}はまだ捕まえてないゴシ...`;
        } catch (err) {
            throw new Error(RefPokemon.REF_ERROR_RES);
        }
    }

    // 指定のuserが捕まえたポケモンの数を返却する（public）
    async getLengthByUser (user: string): Object {
        try {
            const length = await this.db.getLengthEqualTo('user', user);
            return length ? `${user}が捕まえたポケモンは${length}匹だゴシ！` : `${user}はまだポケモンを捕まえてないゴシ...`;
        } catch (err) {
            throw new Error(RefPokemon.REF_ERROR_RES);
        }
    }

    // 指定したCPよりも強いポケモンの数を返却する（public）
    async getLengthGreaterThanCp (cp: number): Object {
        try {
            const length = await this.db.getLengthGreaterThan('cp', cp);
            return length ? `今までにCP${cp}以上のポケモンは${length}匹捕まえたゴシ！` : `CP${cp}以上のポケモンはまだ捕まえてないゴシ...`;
        } catch (err) {
            throw new Error(RefPokemon.REF_ERROR_RES);
        }
    }

    // 今までに捕まえた色違いポケモンの数を返却する（public）
    async getLengthIsShiny (): Object {
        try {
            const length = await this.db.getLengthEqualTo('isShiny', true);
            return length ? `今までに色違いポケモンは${length}匹捕まえたゴシ！` : `まだ普通のポケモンしか捕まえてないゴシ...`;
        } catch (err) {
            throw new Error(RefPokemon.REF_ERROR_RES);
        }
    }

    // 捕獲時間のフォーマットを返却する
    static get REF_ERROR_RES (): string {
        return '調べるの失敗したゴシ…。';
    }
}
