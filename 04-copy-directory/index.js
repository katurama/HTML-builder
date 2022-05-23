const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

function copyDir () {
  fs.readdir(path.join(__dirname, 'files'),  (error, files) => {
    if (error) throw error;
    for( let i = 0; i < files.length; i++ ){
      fsPromises.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), );
    }
    fs.readdir(path.join(__dirname, 'files-copy'),  (error, filesC) => {
      if (error) throw error;
      filesC.forEach(elem => {
        if(!files.includes(elem)){
          fsPromises.unlink(path.join(__dirname, 'files-copy',elem));
        }
      });
    });
  });     
  
}

copyDir();

fsPromises.mkdir(path.join(__dirname,'files-copy'), { recursive: true });



