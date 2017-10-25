const assert = require('assert');
const anywhere = require('../lib/anywhere');
const path = require('path');

describe('anywhere.fs', () => {
  it('copy and remove', async () => {
    const fromFile = {
      storage: 'local',
      dirname: path.join(__dirname, 'assets'),
      filename: 'big_buck_bunny_720p_1mb.mp4'
    };
    const toFile = {
      storage: 'local',
      dirname: __dirname,
      filename: 'coped_test_file.mp4'
    };
    const copied = await anywhere.fs.copy(fromFile, toFile);
    await anywhere.fs.remove(toFile);
  });
});
