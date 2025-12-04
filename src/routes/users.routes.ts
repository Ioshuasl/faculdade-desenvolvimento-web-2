import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userSchema } from '../validators/userValidator';

const router = Router();
const controller = new UserController();

// Todas as rotas de usuário requerem autenticação
router.use(authMiddleware);

router.get('/', controller.index);
router.get('/:id', validate(userSchema.showOrDelete), controller.show);
router.put('/:id', validate(userSchema.update), controller.update);
router.delete('/:id', validate(userSchema.showOrDelete), controller.delete);

export default router;