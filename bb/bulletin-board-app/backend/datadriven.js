const fs = require('fs').promises;

async function processDataDriven(dataFile, transformations) {
  try {
    // Leer el archivo de datos
    const data = JSON.parse(await fs.readFile(dataFile, 'utf8'));
    
    // Aplicar transformaciones basadas en los datos
    const processedData = data.map(item => {
      let result = { ...item };
      for (let [key, transform] of Object.entries(transformations)) {
        if (item.hasOwnProperty(key)) {
          result[key] = transform(item[key]);
        }
      }
      return result;
    });

    console.log('Processed data:', processedData);
    return processedData;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

// Definir transformaciones
const transformations = {
  age: age => age * 2,
  name: name => name.toUpperCase()
};

// Uso
processDataDriven('data.json', transformations)
  .then(result => console.log('Processing complete'))
  .catch(error => console.error('Processing failed:', error));