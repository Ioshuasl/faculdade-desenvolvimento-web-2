import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import categoryRoutes from './categories.routes';
import situationRoutes from './situations.routes';
import productRoutes from './products.routes';
import productCategoryRoutes from './productCategories.routes';
import productSituationRoutes from './productSituations.routes';
import occurrenceRoutes from './occurrences.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Online 🚀' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/situations', situationRoutes);
router.use('/products', productRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/product-situations', productSituationRoutes);
router.use('/occurrences', occurrenceRoutes);

export default router;