const fs = require('fs');
const path = require('path');

let bundle = fs.createWriteStream(path.join(__dirname, '/project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, '/styles'), (err, files) => {
  files.forEach(file => {
    if(path.extname(file) === '.css'){
      let writeableStream = fs.createReadStream(path.join(__dirname, '/styles', file)); 
      writeableStream.pipe(bundle);
    }
  });

});