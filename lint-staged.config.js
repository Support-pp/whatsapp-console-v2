// eslint-disable-next-line no-undef
module.exports = {
  '*.{ts,tsx}': () => ['npm run prettier:fix', 'npm run eslint'],
};
