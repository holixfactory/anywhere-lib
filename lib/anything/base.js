class Anything {
  constructor(dirname, filename, options) {
    if (this.constructor === Anything) {
      throw new Error('Cannot construct abstract class');
    }
  }

  createReadStream(options) {
    throw new Error('Abstract method should not be called');
  }

  createWriteStream(options) {
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
