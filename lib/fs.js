const anything = require('./anything');

function createReadStream(fileInfo) {
  return anything.parse(fileInfo).createReadStream();
};

function createWriteStream(fileInfo) {
  return anything.parse(fileInfo).createWriteStream();
};

exports.createReadStream = createReadStream;
exports.createWriteStream = createWriteStream;

exports.copy = async (fromFileInfo, toFileInfo) => {
  const readStream = createReadStream(fromFileInfo);
  const writeStream = createWriteStream(toFileInfo);
  return await readStream.pipe(writeStream);
};

exports.remove = async (fileInfo) => {
  return await anything.parse(fileInfo).remove();
};

exports.size = async (fileInfo, options) => {
  return await anything.parse(fileInfo).size(options);
};
