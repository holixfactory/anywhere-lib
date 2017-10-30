const Anything = require('./base');
const fs = require('fs');
const path = require('path');

class LocalFile extends Anything {
  constructor(dirname, filename, options) {
    super();
    this.path = path.join(dirname, filename);
  }

  createReadStream() {
    return fs.createReadStream(this.path);
  }

  createWriteStream() {
    return fs.createWriteStream(this.path);
  }

  location(options) {
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

  size(options) {
    return new Promise((resolve, reject) => {
      fs.stat(this.path, (error, result) => {
        if (error) { reject(error); }
        else { resolve(result.size); }
      });
    });
  }
}

module.exports = LocalFile;
