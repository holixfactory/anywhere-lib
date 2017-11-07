const assert = require('assert');
const LocalFile = require('../../lib/anything/local');

describe('anywhere.anything.LocalFile', () => {
  it('location', async () => {
    const dirname = '/asdf';
    const filename = 'qwer';
    const anything = new LocalFile(dirname, filename);
    const location = await anything.location();
    assert.equal(location, '/asdf/qwer');
  });
});
