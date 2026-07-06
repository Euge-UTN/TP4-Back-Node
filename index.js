import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import gastosRouter from './routes/gastos.js';
import categoriasRouter from './routes/categorias.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/gastos', gastosRouter);
app.use('/api/categorias', categoriasRouter);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});