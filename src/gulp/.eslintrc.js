module.exports = {
  "extends": "eslint:recommended",
  "plugins": [
    "standard"
  ],
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      //"always"
      "never"
    ],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
    "no-console": 0
  }
};
