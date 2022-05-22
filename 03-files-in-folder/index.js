const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true },  (error, files) => {
  if (error) throw error;
  files.forEach(elem => {
    if(elem.isFile() === true){
      let failName = elem.name.split('.').slice(0,1).join('');
      let failExtname = path.extname(elem.name).split('.').join('');
      
      fs.stat(path.join(__dirname, '/secret-folder', elem.name), (err, stats) => {
        console.log(`${failName} - ${failExtname} - ${stats.size}`);   
      });
    }  
  });
}); 






