const http = require('http');

const TARGET_URL = 'http://localhost:3000'; // Cambia esto a la URL que quieras probar
const CONCURRENT_REQUESTS = 100;
const TEST_DURATION_MS = 10000; // 10 segundos

function makeRequest() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    http.get(TARGET_URL, (res) => {
      res.on('data', () => {}); // Ignorar el cuerpo de la respuesta
      res.on('end', () => {
        const endTime = Date.now();
        resolve(endTime - startTime);
      });
    }).on('error', reject);
  });
}

async function runStressTest() {
  const results = [];
  const startTime = Date.now();
  
  while (Date.now() - startTime < TEST_DURATION_MS) {
    const promises = Array(CONCURRENT_REQUESTS).fill().map(() => makeRequest());
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  const totalRequests = results.length;
  const avgResponseTime = results.reduce((sum, time) => sum + time, 0) / totalRequests;
  const maxResponseTime = Math.max(...results);
  const minResponseTime = Math.min(...results);

  console.log(`Total requests: ${totalRequests}`);
  console.log(`Requests per second: ${(totalRequests / (TEST_DURATION_MS / 1000)).toFixed(2)}`);
  console.log(`Average response time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`Max response time: ${maxResponseTime}ms`);
  console.log(`Min response time: ${minResponseTime}ms`);
}

runStressTest().catch(console.error);