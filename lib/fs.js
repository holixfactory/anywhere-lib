const anything = require('./anything');

exports.copy = async (fromFileInfo, toFileInfo) => {
  const readStream = anything.parse(fromFileInfo).readStream();
  const writeStream = anything.parse(toFileInfo).writeStream();
  return await readStream.pipe(writeStream);
};

exports.remove = async (fileInfo) => {
  return await anything.parse(fileInfo).remove();
};
