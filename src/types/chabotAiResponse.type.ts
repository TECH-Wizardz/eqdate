import { z } from "zod";

export 	const chatResponseSchema = z.object({
  message: z.string(),
  followUpQuestionsSuggest: z.array(z.string()),
});
export type ChatResponse = z.infer<typeof chatResponseSchema>;