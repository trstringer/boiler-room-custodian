module.exports = (rootdir) => 
  Object.assign({}, require(`${rootdir}/cleanup.js`), {rootdir})
