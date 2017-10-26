const Anything = require('./base');
const azure = require('azure-storage');
const blobService = azure.createBlobService();

class AzureBlob extends Anything {
  constructor(dirname, filename) {
    super();
    this.container = dirname;
    this.blob = filename;
  }

  createReadStream() {
    return blobService.createReadStream(
      this.container,
      this.blob
    );
  }

  createWriteStream(options) {
    return blobService.createWriteStreamToBlockBlob(
      this.container,
      this.blob,
      options
    );
  }

  location(options) {
    options = options || {};
    const expiryHours = options.expiryHours || 10;
    const startDate = new Date();
    let expiryDate = new Date(startDate);
    expiryDate.setHours(startDate.getHours() + expiryHours);

    const sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
        Start: startDate,
        Expiry: expiryDate
      }
    };
    const token = blobService.generateSharedAccessSignature(
      this.container,
      this.blob,
      sharedAccessPolicy
    );

    return blobService.getUrl(
      this.container,
      this.blob,
      token
    );
  }

  remove(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      blobService.deleteBlobIfExists(
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
}

module.exports = AzureBlob;
