const fs = require('fs');
const path = require('path');

// Intentar cargar la librería dotenv para desarrollo local
try {
  require('dotenv').config();
} catch (e) {
  // En Vercel no necesitamos dotenv porque las variables ya están en el sistema
}

// Obtener las variables de entorno (locales o de Vercel)
const apiUrl = process.env.API_URL || 'http://localhost:8081';
const isProduction = process.env.PRODUCTION === 'true';

// CORRECCIÓN: Cambiar 'environment.prod.ts' por 'environment.ts'
const targetPath = path.join(__dirname, './src/environments/environment.ts');
// Contenido que tendrá el archivo de Angular
const envConfigFile = `export const environment = {
  production: ${isProduction},
  apiUrl: '${apiUrl}'
};
`;

// Asegurar que la carpeta src/environments exista
const dir = path.dirname(targetPath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Escribir el archivo
fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       console.error(' Error al generar el archivo environment.prod.ts:', err);
   } else {
       console.log(`Archivo environment.ts generado/actualizado con éxito usando tus variables .env.`);
   }
});