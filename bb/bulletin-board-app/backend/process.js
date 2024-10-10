const { spawn } = require('child_process');

function executeCommand(command, args) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args);
    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command exited with code ${code}`));
      } else {
        resolve(output.trim());
      }
    });
  });
}

async function runProcesses() {
  try {
    console.log('Current directory:');
    const pwdResult = await executeCommand('pwd', []);
    console.log(pwdResult);

    console.log('\nList files:');
    const lsResult = await executeCommand('ls', ['-la']);
    console.log(lsResult);

    console.log('\nSystem information:');
    const unamResult = await executeCommand('uname', ['-a']);
    console.log(unamResult);
  } catch (error) {
    console.error('Error executing commands:', error);
  }
}

runProcesses();