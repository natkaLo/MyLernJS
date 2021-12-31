module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "babel"
    ],
    "rules": {
        "no-unused-vars": ["error", { "caughtErrorsIgnorePattern": "^ignore" }],
    	"react/jsx-uses-react": 1,
        "react/jsx-uses-vars": "error",

        "linebreak-style": [
            "error",
            "unix"
        ],
        "babel/new-cap": 1,
        "babel/camelcase": 1,
        "babel/no-invalid-this": 1,
        "babel/object-curly-spacing": 1,
        "babel/semi": 1,
        "babel/no-unused-expressions": 1,
        "babel/valid-typeof": 1
    }
};
