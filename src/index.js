#!/usr/bin/env node
// Taken from https://github.com/sindresorhus/ansi-escapes
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

const link = (text, url) => {
  return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
};

console.log(
  `superface package is deprecated, use "${link(
    '@superfaceai/cli',
    'https://github.com/superfaceai/cli'
  )}":
  npx @superfaceai/cli`
);
