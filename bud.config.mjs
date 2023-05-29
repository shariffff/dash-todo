/** @param {import('@roots/bud').Bud} bud */
export default (bud) => {
  bud
    .entry(`app`, `@src/index.js`)
    .setUrl(`http://testwp.test:3000`)
    .setProxyUrl(`http://testwp.test`)
};
