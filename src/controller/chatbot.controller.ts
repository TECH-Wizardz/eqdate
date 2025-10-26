import { Request, Response } from 'express';
import { ChatResponse } from "../types/chabotAiResponse.type";
import { AIcoachService } from "../service/AIcoach.service";
import { GenerateRequestDto } from "../dtos/GenerateRequest.dto";

const aiCoachService = new AIcoachService();

export async function startChat(req: Request, res: Response): Promise<void> {
    try {
        const { promptText }: GenerateRequestDto = req.body;
        
        if (!promptText) {
            res.status(400).json({
                success: false,
                error: 'promptText is required'
            });
            return;
        }

        const response: ChatResponse = await aiCoachService.generateResponse(promptText);
        
        res.json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Failed to start chat:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to start chat'
        });
    }
}

export async function continueChat(req: Request, res: Response): Promise<void> {
    try {
        const { promptText, previousResponseId }: GenerateRequestDto = req.body;
        
        if (!promptText || !previousResponseId) {
            res.status(400).json({
                success: false,
                error: 'promptText and previousResponseId are required'
            });
            return;
        }

        const response: ChatResponse = await aiCoachService.generateResponse(promptText, previousResponseId);
        
        res.json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Failed to continue chat:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to continue chat'
        });
    }
}


