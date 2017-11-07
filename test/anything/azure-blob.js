const assert = require('assert');
const AzureBlob = require('../../lib/anything/azure-blob');

describe('anywhere.anything.AzureBlob', () => {
  it('location', async () => {
    const dirname = 'asdf';
    const filename = 'qwer';
    const options = {
      host: 'http://teststorage.azurestorage.com',
      sasToken: 'unusingkey=invalidtoken'
    };
    const anything = new AzureBlob(dirname, filename, options);
    const location = await anything.location();
    assert.equal(
      location,
      'http://teststorage.azurestorage.com/asdf/qwer?unusingkey=invalidtoken'
    );
  });
});
