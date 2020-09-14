module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true,
    "browser": true,
    "jquery": true
  },
  "rules": {
    "block-spacing": 2,
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "comma-dangle": [2, "never"],
    "comma-style": [2, "last", { exceptions: {ArrayExpression: true, ObjectExpression: true} }],
    "complexity": ["error", 20],
    "curly": 2,
    "eqeqeq": [2, "allow-null"],
    "max-statements": [2, 34],
    "no-shadow-restricted-names": 2,
    "no-undef": 2,
    "no-use-before-define": 2,
    "radix": 2,
    "semi": 2,
    "space-infix-ops": 2,
    "strict": 0,
    "no-console": 0
  },
  "globals": {
    "_": true,
    "watch": true
  }

};
