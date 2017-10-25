class Anything {
  constructor(dirname, filename) {
    if (this.constructor === Anything) {
      throw new Error('Cannot construct abstract class');
    }
  }

  readStream(options) {
    throw new Error('Abstract method should not be called');
  }

  writeStream(options) {
    throw new Error('Abstract method should not be called');
  }

  location(options) {
    throw new Error('Abstract method should not be called');
  }

  remove(options) {
    throw new Error('Abstract method should not be called');
  }
}

module.exports = Anything;
