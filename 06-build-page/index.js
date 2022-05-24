const fs = require('fs/promises');
const path = require('path');
const fsN = require ('fs');
const { allowedNodeEnvironmentFlags } = require('process');
fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true });
const htmlBuilder =  async () => {
  await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '');
  const templateRead =  await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  let index = templateRead;
  let components = await fs.readdir(path.join(__dirname, '/components/'));
  for(const component of components) {
    const componentText =  await fs.readFile(path.join(__dirname, '/components/', component), 'utf-8');
    const componentName = component.slice(0, component.lastIndexOf('.'));
    index = index.replace(`{{${componentName}}}`, componentText);   
  }  

  await fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), index);
};

htmlBuilder();


const sccBundle =  () => {
  let bundle =  fsN.createWriteStream(path.join(__dirname, '/project-dist', 'style.css'));
  fsN.readdir(path.join(__dirname, '/styles'), (err, files) => {
    files.forEach(file => {
      if(path.extname(file) === '.css'){
        let writeableStream =  fsN.createReadStream(path.join(__dirname, '/styles', file)); 
        writeableStream.pipe(bundle);
      }
    });
  });
};
sccBundle();

const copyAssets = () => {
  fsN.readdir(path.join(__dirname, 'assets'),  (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      fsN.stat(path.join(__dirname, 'assets', file), (error, stats)=>{
        if(error) throw error;
        if(stats.isDirectory()){
          fs.mkdir(path.join(__dirname,'/project-dist', 'assets', file), { recursive: true });
          fsN.readdir(path.join(__dirname, 'assets', file),  (error, copyFiles) => {
            copyFiles.forEach(copyFile => {
              fs.copyFile(path.join(__dirname, 'assets', file, copyFile), path.join(__dirname, '/project-dist', 'assets', file, copyFile) );
            });
            
          });
        } else if(stats.isFile()){
          fs.copyFile(path.join(__dirname, 'assets', file), path.join(__dirname, '/project-dist', 'assets', file) );
        }
      });
    });

    
    fsN.readdir(path.join(__dirname, '/project-dist', 'assets'),  (error, filesC) => {
      if (error) throw error;
      filesC.forEach(elem => {
        if(!files.includes(elem)){
          fsN.readdir(path.join(__dirname, '/project-dist', 'assets', elem),  (error, elemFile) => {
            if (error) throw error;  
            elemFile.forEach(eF => {
              fs.unlink(path.join(__dirname, 'project-dist', 'assets', elem, eF));
            });
            fsN.rmdir(path.join(__dirname,'/project-dist', 'assets',elem), err => {
              if(err) throw err;
            });
          });
          
          
        }
      });
    });        
  });
  
  fs.mkdir(path.join(__dirname,'/project-dist', 'assets'), { recursive: true });
};
copyAssets();