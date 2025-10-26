import { OpenAI } from "openai";
import AIcoach from "../configs/AIcoach/AIcoach";
import { chatResponseSchema, ChatResponse } from "../types/chabotAiResponse.type";
import { zodTextFormat } from "openai/helpers/zod";
import { AIcoachServiceResponse } from "../types/chatbotRespose.type";



export class  AIcoachService {
    private static readonly BASE_PREFIX: { role: "system" | "developer"; content: string }[] = [
        {
          role: "system",
          content:
            "You are a JSON-only assistant. Output strictly valid JSON that matches the provided schema. Do not include prose or markdown.",
        },
        { role: "developer", content: AIcoach },
      ];

    private readonly openai: OpenAI;
    private readonly format = zodTextFormat(chatResponseSchema, "chat_response") as any;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateResponse(promptText: string, previousResponseId: string | null = null): Promise<AIcoachServiceResponse> {
        const response = await this.openai.responses.parse({
            model: "gpt-4o-mini",
            previous_response_id: previousResponseId, 
            text: { format: this.format },
            input: this.buildMessages(promptText),
            temperature: 0.4,
        }) 
        
        // Parse the JSON string first, then validate with Zod schema
        // console.log(response);

        const jsonResponse = JSON.parse(response.output_text);
        const parsedResponse = chatResponseSchema.parse(jsonResponse);
        return {success: true, chatResponse: parsedResponse ,responseId: response.id};
    }
     buildMessages(promptText: string) {
        const messages: {
          role: "system" | "developer" | "user";
          content: string;
        }[] = [...AIcoachService.BASE_PREFIX];

        messages.push({ role: "user", content: promptText });

        return messages;

    }






}



