import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'pqrs.json');
    let jsonData: string;
    
    if (fs.existsSync(filePath)) {
      jsonData = fs.readFileSync(filePath, 'utf-8');
    } else {
      const publicPath = path.join(process.cwd(), 'public', 'data', 'pqrs.json');
      jsonData = fs.readFileSync(publicPath, 'utf-8');
    }

    const data = JSON.parse(jsonData);
    
    if (res.setHeader) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    
    if (res.status) {
      return res.status(200).json(data);
    } else if (res.end) {
      return res.end(JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error en API /api/pqrs:', error);
    if (res.status) {
      return res.status(500).json({ error: 'Error al cargar los radicados PQRS' });
    }
  }
}
