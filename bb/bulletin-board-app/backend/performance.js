const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ':' + derivedKey.toString('hex'));
    });
  });
}

async function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

// Uso con medición de rendimiento
async function performanceTest() {
  console.time('Hash Password');
  const hashedPassword = await hashPassword('mySecurePassword');
  console.timeEnd('Hash Password');

  console.time('Verify Password');
  const isValid = await verifyPassword('mySecurePassword', hashedPassword);
  console.timeEnd('Verify Password');

  console.log('Password is valid:', isValid);
}

performanceTest().catch(console.error);