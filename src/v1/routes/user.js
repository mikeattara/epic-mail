import express from 'express';
import userRoute from '../users/user.controller';

const router = express.Router();

// routes
router.post('/login', userRoute.authenticate);
router.post('/signup', userRoute.register);
router.get('/:id', userRoute.getById);
router.put('/:id', userRoute.update);

export default router;
