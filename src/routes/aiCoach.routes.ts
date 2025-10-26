import { Router } from 'express';
import { startChat, continueChat } from '../controller/chatbot.controller';

const router = Router();

// POST /api/ai-coach/start - Start a new chat
router.post('/start', startChat);

// POST /api/ai-coach/continue - Continue an existing chat
router.post('/continue', continueChat);



export default router;
