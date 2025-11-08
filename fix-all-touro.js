const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

console.log(`🔍 Buscando referencias a Touro en ${files.length} archivos HTML...\n`);

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;

    // Reemplazos generales
    if (content.includes('Touro')) {
        // Reemplazar "Touro University" con ambas universidades donde sea apropiado
        // Solo en contextos de lista o enumeración

        // Para listas de emails, stats, etc - eliminar completamente Touro
        content = content.replace(/"touro":\s*\{[^}]*\}/gs, '');

        // Para referencias en texto - reemplazar con Maryland y Rutgers
        content = content.replace(/Touro University/g, 'University of Maryland');
        content = content.replace(/Touro College/g, 'University of Maryland');
        content = content.replace(/Touro/g, 'Maryland');

        // Limpiar comas dobles o trailing commas
        content = content.replace(/,\s*,/g, ',');
        content = content.replace(/,(\s*[}\]])/g, '$1');

        modified = content !== originalContent;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Actualizado: ${file}`);
    } else {
        console.log(`⏭️  Sin cambios: ${file}`);
    }
});

console.log('\n✨ Proceso completado!');
