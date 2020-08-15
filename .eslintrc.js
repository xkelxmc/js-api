module.exports = {
    env: {
        es2020: true,
        node: true,
        mocha: true,
    },
    extends: ['eslint:recommended', 'google', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            { singleQuote: true, parser: 'flow', tabWidth: 4 },
        ],
        'no-unused-vars': 'off',
        'no-invalid-this': 'off',
    },
};
