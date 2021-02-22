#! /usr/bin/env node
const { spawn } = require('child_process');

if (process.argv[2] === '--version' || process.argv[2] === '-v') {
  console.log('v' + require('./package.json').version);
  process.exit(0);
}

const name = process.argv[2];
if (!name || name.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  \u001b[31;1mInvalid directory name.
  Usage: create-nextjs-project name-of-app\u001b[0m
`);
}

const repoURL = 'https://github.com/JuzouSatoru2/NextJs-Boilerplate';

runCommand('git', ['clone', repoURL, name])
  .then(() => {
    return runCommand('rm', ['-rf', `${name}/.git`]);
  }).then(() => {
    console.log('Installing dependencies...');
    return runCommand('yarn', ['install'], {
      cwd: process.cwd() + '/' + name
    });
  }).then(() => {
    console.log('\u001b[32;1m✔ Installed successfully!\u001b[0m');
    console.log('');
    console.log('To get started:');
    console.log('cd', name);
    console.log('yarn dev');
  });

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    spawned.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    spawned.on('close', () => {
      resolve();
    });
  });
}
