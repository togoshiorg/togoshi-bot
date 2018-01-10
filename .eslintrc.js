module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "flow-vars"
    ],
    "env": {
        "node": true,
        "es6": true,
        "mocha": true
    },
    "extends": "standard",
    "rules": {
        "indent": ["error", 4, {"SwitchCase": 1}],
        "semi": ["error", "always"],
        "arrow-body-style": [0],
        "import/no-unresolved": [2, { "ignore": ["log4js"] }],
        "no-useless-escape": [0],
        "class-methods-use-this": [0],
        "no-constant-condition": ["error", { "checkLoops": false }],
        "no-unused-vars": ["error"],
        "id-length": [2, {"exceptions": ["$", "_"]}],
        "no-bitwise": [2, {"allow": ["^"]}],
        "flow-vars/define-flow-type": 1,
        "flow-vars/use-flow-type": 1
    }
};
