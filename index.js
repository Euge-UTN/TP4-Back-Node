import express from 'express';
import morgan from 'morgan'; 
import { gastos } from './datos.js';
import gastosRouter from './routes/gasto.js';
import categoriasRouter from './routes/categorias.js';

const app = express();

app.use(express.json()); 

app.use(morgan('tiny')); 

app.use('/api/gastos', gastosRouter);
app.use('/api/categorias', categoriasRouter);

app.get('/info', (req, res) => {
  const cantidad = gastos.length;
  const fecha = new Date();
  
  res.send(`
    <p>La API tiene registrado ${cantidad} gasto${cantidad !== 1 ? 's' : ''}</p>
    <p>${fecha}</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});