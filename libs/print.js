module.exports = function(argvs, ...parameter) {
  if (argvs.noTrace) {
    return;
  }

  if (argvs.format.toLowerCase() === 'json') {
    console.log(JSON.stringify(parameter));
    return;
  }

  if (argvs.format.toLowerCase() === 'table') {
    console.log('TODO...');
    return;
  }
};