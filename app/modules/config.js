module.exports = (rootdir) => 
  Object.assign({}, require(`${rootdir}/setup.js`), {rootdir})
