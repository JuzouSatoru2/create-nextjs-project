#! /usr/bin/env node
const shell = require('shelljs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

if (process.argv[2] === '--version' || process.argv[2] === '-v') {
  console.log('v' + require('./package.json').version);
  process.exit(0);
}

if (!shell.which('git')) {
  console.error('This CLI requires git to work!');
  process.exit(1);
}

clear();

console.log(chalk.blue(figlet.textSync('CNA', { horizontalLayout: 'full' })));
console.log(chalk.blue('Create NextJs project'));

let appName = 'NextJs-Boilerplate';

if (process.argv[2] && process.argv[2].match('/[<>:"/\\|?*\x00-\x1F]/"]')) {
  appName = process.argv[2];
}

console.log(chalk.yellow('Cloning template...'));
shell.exec(`git clone https://github.com/JuzouSatoru2/NextJs-Boilerplate.git ${appName}`, {
  silent: true,
});
shell.rm('-rf', '.git');
shell.exec('git init', { silent: true });


console.log(chalk.yellow('Installing Dependencies...'));
shell.cd(appName);
shell.exec('npm install', { silent: false });

console.log(chalk.green('Success'));
console.log('');
console.log(chalk.blue('Thanks for using this CLI and template'));
console.log(
  chalk.blue(
    'For help or information go to our github repo JuouSatoru2/create-nextjs-app'
  )
);
console.log(chalk.blue('To get started:'));
console.log(chalk.blue(`cd ${appName} + npm run dev`));
