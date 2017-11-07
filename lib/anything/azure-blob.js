const Anything = require('./base');
const azure = require('azure-storage');
const url = require('url');

class AzureBlob extends Anything {
  constructor(dirname, filename, options) {
    options = options || {};
    super();
    if (options.sasUrl) {
      const parsed = url.parse(options.sasUrl);
      const host = parsed.protocol + '//' + parsed.host;
      this.sasToken = parsed.query;
      this.blobService = azure.createBlobServiceWithSas(
        host, this.sasToken
      );
    } else  {
      this.blobService = azure.createBlobService();
    }
    this.container = dirname;
    this.blob = filename;
  }

  createReadStream() {
    return this.blobService.createReadStream(
      this.container,
      this.blob
    );
  }

  createWriteStream(options) {
    return this.blobService.createWriteStreamToBlockBlob(
      this.container,
      this.blob,
      options
    );
  }

  _getToken(options) {
    if (this.sasToken) {
      return this.sasToken;
    }
    options = options || {};
    const startDate = new Date();
    const expiryHours = options.expiryHours || 10;
    let expiryDate = new Date(startDate);
    expiryDate.setHours(startDate.getHours() + expiryHours);
    const sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
        Start: startDate,
        Expiry: expiryDate
      }
    };
    return this.blobService.generateSharedAccessSignature(
      this.container,
      this.blob,
      sharedAccessPolicy
    );
  }

  location(options) {
    const token = this._getToken(options);
    return this.blobService.getUrl(
      this.container,
      this.blob,
      token
    );
  }

  remove(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      this.blobService.deleteBlobIfExists(
        this.container,
        this.blob,
        options,
        (deleteError, deleted, deleteResponse) => {
          console.log(deleteError, deleted, deleteResponse);
          if (!deleted) { reject(deleteError); }
          if (deleteError) { reject(deleteError); }
          else { resolve(deleteResponse); }
        }
      );
    });
  }

  size(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      this.blobService.getBlobProperties(
        this.container, this.blob, options,
        (error, result, response) => {
          if (error) { reject(error); }
          else { resolve(Number(result.contentLength)); }
        });
    });
  }

}

module.exports = AzureBlob;
