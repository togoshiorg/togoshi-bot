// @flow

/**
 * ポケモンゲットだぜ
 * `get pokemon` というコマンドで、botがランダムに一匹のポケモンを捕獲してきます。
*/

import 'babel-polyfill';
import GetPokemon from './pokemon/get-pokemon';
import RefPokemon from './pokemon/ref-pokemon';
import PokeapiV2 from './pokemon/pokeapi-v2';
import Firebase from './pokemon/firebase';

module.exports = (robot: Object) => {
    // robot.respond(/get pokemon/, (res) => {
    robot.respond(/get poketest/, (res) => {
        res.send(GetPokemon.GO_RES);
        (async () => {
            let getPokemon: GetObject;
            try {
                getPokemon = new GetPokemon(PokeapiV2, res.message.user.name);
                res.send(await getPokemon.getRandom());
                // getPokemon.pushData(Firebase);
            } catch (err) {
                res.send(err.message);
            }
        })();
    });
    // robot.respond(/zukan pokemon/, (res) => {
    robot.respond(/zukan poketest/, (res) => {
        // 入力値に数値が付与されていたら処理しない
        const input = res.message.text;
        const resMention = '@togoshi-bot zukan pokemon';
        const resDirect = 'togoshi-bot zukan pokemon';
        if (input !== resMention && input !== resDirect) return false;
        (async () => {
            try {
                const refPokemon: RefObject = new RefPokemon(Firebase);
                res.send(refPokemon.getLengthTotal());
            } catch (err) {
                res.send(err.message);
            }
        })();
    });
    // robot.respond(/zukan pokemon (.*)/, (res) => {
    robot.respond(/zukan poketest (.*)/, (res) => {
        const name = res.match[1];
        (async () => {
            try {
                const refPokemon: RefObject = new RefPokemon(Firebase);
                res.send(await refPokemon.getLengthByName(name));
            } catch (err) {
                res.send(err.message);
            }
        })();
    });
    // robot.respond(/user pokemon (.*)/, (res) => {
    robot.respond(/user poketest (.*)/, (res) => {
        const user = res.match[1];
        (async () => {
            try {
                const refPokemon: RefObject = new RefPokemon(Firebase);
                res.send(refPokemon.getLengthByUser(user));
            } catch (err) {
                res.send(err.message);
            }
        })();
    });
    // robot.respond(/overcp pokemon (.*)/, (res) => {
    robot.respond(/overcp poketest (.*)/, (res) => {
        const selectCp = parseInt(res.match[1]);
        (async () => {
            try {
                const refPokemon: RefObject = new RefPokemon(Firebase);
                res.send(refPokemon.getLengthGreaterThanCp(selectCp));
            } catch (err) {
                res.send(err.message);
            }
        })();
    });
    // robot.respond(/shiny pokemon/, (res) => {
    robot.respond(/shiny poketest/, (res) => {
        (async () => {
            try {
                const refPokemon: RefObject = new RefPokemon(Firebase);
                res.send(refPokemon.getLengthIsShiny());
            } catch (err) {
                res.send(err.message);
            }
        })();
    });

    // Help Command
    // robot.respond(/h pokemon/, (res) => {
    robot.respond(/h poketest/, (res) => {
        res.send(`
:heavy_check_mark: \`get pokemon\` : ポケモンを1匹捕まえます
:heavy_check_mark: \`zukan pokemon\` : 今までに捕まえたポケモンの総数を表示
:heavy_check_mark: \`zukan pokemon {name: string}\` : 指定の日本語名の捕まえたポケモンの数を表示
:heavy_check_mark: \`user pokemon {username: string}\` : 指定のusernameが捕まえたポケモンの数を表示
:heavy_check_mark: \`overcp pokemon {cp: number}\` : 指定したCPよりも強いポケモンの数を表示
:heavy_check_mark: \`shiny pokemon\` : 今までに捕まえた色違いポケモンの数を表示
        `);
    });
};
