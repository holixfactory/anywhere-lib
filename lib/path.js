const anything = require('./anything');

exports.location = (fileInfo) => {
  return anything.parse(fileInfo).location();
};

exports.join = (directoryInfo, filename) => {
  return {
    storage: directoryInfo.storage,
    dirname: directoryInfo.dirname,
    filename: filename
  };
};
