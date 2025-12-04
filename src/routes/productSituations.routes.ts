import { Router } from 'express';
import { ProductSituationController } from '../controllers/ProductSituationController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { productSituationSchema } from '../validators/productSituationValidator';

const router = Router();
const controller = new ProductSituationController();

router.get('/', controller.index);
router.get('/:id', validate(productSituationSchema.byId), controller.show);

router.post('/', authMiddleware, validate(productSituationSchema.store), controller.store);
router.put('/:id', authMiddleware, validate(productSituationSchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(productSituationSchema.byId), controller.delete);

export default router;