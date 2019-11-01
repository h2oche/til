const crypto = require('crypto');

const salt = Buffer.from("79752f1d3fd2432043c48e45b35b24645eb826a25c6f1804e9152665c345a552", 'hex');
const iv = Buffer.from("2fad5a477d13ecda7f718fbd8a9f0443", "hex");
const passPhrase = "argonetredwit";

const keySize = 16;
const iterCount = 10000;
let genKey = crypto.pbkdf2Sync(passPhrase, salt, iterCount, keySize, 'sha1');

function encrypt(_msg) {
  let cipher = crypto.createCipheriv('aes-128-cbc', genKey, iv);
  let encrypted = cipher.update(_msg, 'utf8', 'base64');
  return encrypted + cipher.final('base64');
}

function decrypt(_msg) {
  let decipher = crypto.createDecipheriv('aes-128-cbc', genKey, iv);
  let decrypted = decipher.update(_msg, 'base64', 'utf8');
  return decrypted + decipher.final('utf8');
}

module.exports = {encrypt, decrypt}