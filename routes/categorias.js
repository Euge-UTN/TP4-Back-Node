import { Router } from 'express';
import { categorias } from '../datos.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(categorias);
});

export default router;