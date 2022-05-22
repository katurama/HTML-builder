const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const writebleStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

rl.write('Введите Ваш текст\n');

rl.on('line', text =>{
  if(text === 'exit'){
    rl.close();
  }
  writebleStream.write(`${text}\n`, error => {
    if (error) throw error;
  });
}); 
process.on('SIGINT', () => {  
  process.exit();
});

process.on('exit', () => {
  console.log('Bye-Bye');
});