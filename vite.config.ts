import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Plugin de desarrollo local para responder a /api/pqrs sirviendo data/pqrs.json
function servePqrsApiPlugin(): Plugin {
  return {
    name: 'serve-pqrs-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/pqrs' || req.url === '/api/pqrs/') {
          try {
            const filePath = path.resolve(process.cwd(), 'data/pqrs.json');
            const data = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
            return;
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error al leer data/pqrs.json' }));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    servePqrsApiPlugin()
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
