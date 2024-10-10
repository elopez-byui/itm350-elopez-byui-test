const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

if (isMainThread) {
  const numbers = [40, 41, 42, 43];
  const workers = numbers.map(number => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { number }
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  });

  Promise.all(workers).then(results => {
    results.forEach((result, index) => {
      console.log(`Fibonacci(${numbers[index]}) = ${result}`);
    });
  }).catch(err => console.error(err));

} else {
  const { number } = workerData;
  const result = fibonacci(number);
  parentPort.postMessage(result);
}