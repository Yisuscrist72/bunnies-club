const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('g:/bunnies-club/src');
let totalUpdated = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('framer-motion')) {
    
    // 1. Reemplazar `import { motion }` por `import { m }`
    // Captura cualquier cosa que no sea llave de cierre, y cambia motion por m en esa parte 
    let newContent = content.replace(/import\s+\{([^}]*)\}?\s+from\s+["']framer-motion["']/g, (match, p1) => {
        let replacement = p1.replace(/\bmotion\b/g, 'm');
        return `import { ${replacement.trim()} } from "framer-motion"`;
    });
    
    // 2. Reemplazar <motion.div> por <m.div> etc
    newContent = newContent.replace(/<motion\./g, '<m.');
    newContent = newContent.replace(/<\/motion\./g, '</m.');
    
    // 3. Reemplazar uso funcional si existe: motion(Component) -> m(Component)
    newContent = newContent.replace(/motion\(/g, 'm(');
    
    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log('Updated', file);
      totalUpdated++;
    }
  }
});

console.log(`Refactor complete. Updated ${totalUpdated} files.`);
