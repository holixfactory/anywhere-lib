const AzureBlob = require('./azure-blob');
const LocalFile = require('./local');

exports.parse = fileInfo => {
  switch (fileInfo.storage) {
  case 'azure-blob': return new AzureBlob(fileInfo.dirname,
                                          fileInfo.filename);
  case 'local': return new LocalFile(fileInfo.dirname,
                                     fileInfo.filename);
  }
  throw new Error('No storage matches.');
};
