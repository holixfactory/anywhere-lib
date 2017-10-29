const AzureBlob = require('./azure-blob');
const LocalFile = require('./local');

exports.parse = fileInfo => {
  let storageClass;
  switch (fileInfo.storage) {
  case 'azure-blob': storageClass = AzureBlob;
  case 'local': storageClass = LocalFile;
  }
  if (!storageClass) { throw new Error('No storage matches.'); }
  return new storageClass(
    fileInfo.dirname,
    fileInfo.filename,
    fileInfo.options
  );
};
