import { Router } from 'express';
import { gastos, categorias } from '../datos.js'; 

const router = Router();

router.get('/resumen', (req, res) => {
  if (gastos.length === 0) {
    return res.json({ totalGastado: 0, gastoMasAlto: 0 });
  }
  
  const totalGastado = gastos.reduce((sum, g) => sum + g.monto, 0);
  const gastoMasAlto = Math.max(...gastos.map(g => g.monto));

  res.json({ totalGastado, gastoMasAlto });
});


router.get('/', (req, res) => {
  const { categoria } = req.query;
  
  if (categoria) {
    // Filtra ignorando mayúsculas y minúsculas
    const gastosFiltrados = gastos.filter(
      g => g.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return res.json(gastosFiltrados);
  }
  
  res.json(gastos);
});

// GET /api/gastos/:id - Retorna un gasto por su ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const gasto = gastos.find(g => g.id === id);

  if (!gasto) {
    return res.status(404).json({ error: `Gasto con id ${id} no encontrado` });
  }

  res.json(gasto);
});

// POST /api/gastos - Agrega un nuevo gasto con validaciones
router.post('/', (req, res) => {
  const { descripcion, monto, categoria, fecha } = req.body;

  // Validación: campos obligatorios
  if (!descripcion || monto === undefined) {
    return res.status(400).json({ error: "La 'descripcion' y el 'monto' son requeridos." });
  }

  // Validación: monto mayor a 0
  if (typeof monto !== 'number' || monto <= 0) {
    return res.status(400).json({ error: "El 'monto' debe ser un número mayor a 0." });
  }

  // Validación: si la categoría existe se usa, si no se asigna "Otro" por defecto
  let categoriaAsignada = "Otro";
  if (categoria) {
    const categoriaEncontrada = categorias.find(
      c => c.nombre.toLowerCase() === categoria.toLowerCase()
    );
    if (categoriaEncontrada) {
      categoriaAsignada = categoriaEncontrada.nombre;
    }
  }

  // Generar ID único (ID más alto + 1)
  const nuevoId = gastos.length > 0 ? Math.max(...gastos.map(g => g.id)) + 1 : 1;

  // Validar fecha: si no viene, pone la del día de hoy (YYYY-MM-DD)
  const fechaAsignada = fecha || new Date().toISOString().split('T')[0];

  const nuevoGasto = {
    id: nuevoId,
    descripcion,
    monto,
    categoria: categoriaAsignada,
    fecha: fechaAsignada
  };

  gastos.push(nuevoGasto);
  res.status(201).json(nuevoGasto);
});

// DELETE /api/gastos/:id - Elimina un gasto por ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = gastos.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No se encontró el gasto con id ${id}` });
  }

  gastos.splice(index, 1);
  res.status(204).end(); 
});

// PUT /api/gastos/:id (Edita un gasto existente)
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const gasto = gastos.find(g => g.id === id);

  if (!gasto) {
    return res.status(404).json({ error: `No se encontró el gasto con id ${id}` });
  }

  const { descripcion, monto, categoria, fecha } = req.body;

  if (descripcion) gasto.descripcion = descripcion;
  
  if (monto !== undefined) {
    if (typeof monto !== 'number' || monto <= 0) {
      return res.status(400).json({ error: "El 'monto' debe ser un número mayor a 0." });
    }
    gasto.monto = monto;
  }
  
  if (categoria) {
    const categoriaEncontrada = categorias.find(
      c => c.nombre.toLowerCase() === categoria.toLowerCase()
    );
    gasto.categoria = categoriaEncontrada ? categoriaEncontrada.nombre : "Otro";
  }
  
  if (fecha) gasto.fecha = fecha;

  res.json(gasto);
});

export default router;