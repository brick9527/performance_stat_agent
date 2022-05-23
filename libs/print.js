module.exports = function(argvs, ...parameter) {
  if (!argvs.trace) {
    return;
  }

  if (argvs.format.toLowerCase() === 'json') {
    console.log(JSON.stringify(parameter, null, 2));
    return;
  }

  if (argvs.format.toLowerCase() === 'table') {
    console.log('TODO...');
    return;
  }
};