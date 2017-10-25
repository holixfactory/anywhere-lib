const Anything = require('./base');
const fs = require('fs');
const path = require('path');

class LocalFile extends Anything {
  constructor(dirname, filename) {
    super();
    this.path = path.join(dirname, filename);
  }

  readStream() {
    return fs.createReadStream(this.path);
  }

  writeStream() {
    return fs.createWriteStream(this.path);
  }

  getLocation(options) {
    return this.path;
  }

  remove(options) {
    return new Promise((resolve, reject) => {
      fs.unlink(this.path, error => {
        if (error) { reject(error); }
        else { resolve(); }
      });
    });
  }
}

module.exports = LocalFile;
