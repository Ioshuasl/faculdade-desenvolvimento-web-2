import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { productSchema } from '../validators/productValidator';

const router = Router();
const controller = new ProductController();

// A validação de paginação é opcional, mas recomendada se estiver no schema
router.get('/', validate(productSchema.pagination), controller.index);
router.get('/:id', validate(productSchema.byId), controller.show);

router.post('/', authMiddleware, validate(productSchema.store), controller.store);
router.put('/:id', authMiddleware, validate(productSchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(productSchema.byId), controller.delete);

export default router;