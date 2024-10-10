const fs = require('fs');

function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error(`Failed to read file: ${err.message}`));
      } else {
        resolve(data);
      }
    });
  });
}

async function processFile(filePath) {
  try {
    const content = await readFileContent(filePath);
    console.log('File content:', content);
    return 'pass';
  } catch (error) {
    console.error('Error:', error.message);
    return 'fail';
  }
}

// Uso
processFile('example.txt')
  .then(result => console.log('Result:', result))
  .catch(err => console.error('Unexpected error:', err));