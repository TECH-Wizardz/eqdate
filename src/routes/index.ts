import { Router, Request, Response } from 'express';
import aiCoachRoutes from './aiCoach.routes';


const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount all routes
router.use('/ai-coach', aiCoachRoutes);


export default router;
