import { Router } from 'express';
import { OccurrenceController } from '../controllers/OccurrenceController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { occurrenceSchema } from '../validators/occurrenceValidator';

const router = Router();
const controller = new OccurrenceController();

router.get('/', controller.index);
router.get('/:id', validate(occurrenceSchema.byId), controller.show);

router.post('/', authMiddleware, validate(occurrenceSchema.store), controller.store);
router.put('/:id', authMiddleware, validate(occurrenceSchema.update), controller.update);
router.delete('/:id', authMiddleware, validate(occurrenceSchema.byId), controller.delete);

export default router;