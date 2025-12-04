import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { categorySchema } from '../validators/categoryValidator';

const router = Router();
const controller = new CategoryController();

router.get('/', controller.index);
router.get('/:id', validate(categorySchema.byId), controller.show);

// Rotas protegidas
router.post('/', authMiddleware, validate(categorySchema.store), controller.store);
router.put('/:id', authMiddleware, validate(categorySchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(categorySchema.byId), controller.delete);

export default router;