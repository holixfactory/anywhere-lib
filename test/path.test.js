const assert = require('assert');
const anywhere = require('../lib/anywhere');
const path = require('path');

describe('anywhere.path', () => {
  it('location', async () => {
    const fileInfo = {
      storage: 'local',
      dirname: path.join(__dirname, 'assets'),
      filename: 'big_buck_bunny_720p_1mb.mp4'
    };
    assert.equal(
      anywhere.path.location(fileInfo),
      path.join(__dirname, 'assets/big_buck_bunny_720p_1mb.mp4')
    );
  });
});
