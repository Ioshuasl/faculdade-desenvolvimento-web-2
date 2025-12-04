import { Router } from 'express';
import { SituationController } from '../controllers/SituationController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { situationSchema } from '../validators/situationValidator';

const router = Router();
const controller = new SituationController();

router.get('/', controller.index);
router.get('/:id', validate(situationSchema.byId), controller.show);

router.post('/', authMiddleware, validate(situationSchema.store), controller.store);
router.put('/:id', authMiddleware, validate(situationSchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(situationSchema.byId), controller.delete);

export default router;