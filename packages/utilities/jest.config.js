module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
