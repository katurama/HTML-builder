const fs = require('fs/promises');
const path = require('path');

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
  console.log(index);
};

htmlBuilder();

