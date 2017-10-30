const AzureBlob = require('./azure-blob');
const LocalFile = require('./local');

exports.parse = fileInfo => {
  let storageClass;
  switch (fileInfo.storage) {
  case 'azure-blob': storageClass = AzureBlob; break;
  case 'local': storageClass = LocalFile; break;
  }
  if (!storageClass) { throw new Error('No storage matches.'); }
  return new storageClass(
    fileInfo.dirname,
    fileInfo.filename,
    fileInfo.options
  );
};
