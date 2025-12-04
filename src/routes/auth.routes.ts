import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/validate';
import { authSchema } from '../validators/authValidator';

const router = Router();
const controller = new AuthController();

router.post('/signup', validate(authSchema.signup), controller.signup);
router.post('/signin', validate(authSchema.signin), controller.signin);

// Rotas de recuperação de senha (sem validação Zod por enquanto, ou você pode criar schemas para elas)
router.post('/forgot-password', controller.forgotPassword); 
router.post('/reset-password/:token', controller.resetPassword);

export default router;