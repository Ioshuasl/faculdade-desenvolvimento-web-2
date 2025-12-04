import { Router } from 'express';
import { ProductCategoryController } from '../controllers/ProductCategoryController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { productCategorySchema } from '../validators/productCategoryValidator';

const router = Router();
const controller = new ProductCategoryController();

router.get('/', controller.index);
router.get('/:id', validate(productCategorySchema.byId), controller.show);

router.post('/', authMiddleware, validate(productCategorySchema.store), controller.store);
router.put('/:id', authMiddleware, validate(productCategorySchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(productCategorySchema.byId), controller.delete);

export default router;