'use server';
/**
 * @fileOverview Generates a concise and engaging notification message for new anime episode releases.
 *
 * - generateNotificationMessage - A function that generates the notification message.
 * - GenerateNotificationMessageInput - The input type for the generateNotificationMessage function.
 * - GenerateNotificationMessageOutput - The return type for the generateNotificationMessage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {Anime} from '@/services/anime';

const GenerateNotificationMessageInputSchema = z.object({
  animeList: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        coverImage: z.string(),
        releaseDate: z.string(),
      })
    )
    .describe('A list of anime with new episode releases.'),
});
export type GenerateNotificationMessageInput = z.infer<
  typeof GenerateNotificationMessageInputSchema
>;

const GenerateNotificationMessageOutputSchema = z.object({
  message: z.string().describe('A concise and engaging notification message.'),
});
export type GenerateNotificationMessageOutput = z.infer<
  typeof GenerateNotificationMessageOutputSchema
>;

export async function generateNotificationMessage(
  input: GenerateNotificationMessageInput
): Promise<GenerateNotificationMessageOutput> {
  return generateNotificationMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotificationMessagePrompt',
  input: {
    schema: z.object({
      animeList: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            coverImage: z.string(),
            releaseDate: z.string(),
          })
        )
        .describe('A list of anime with new episode releases.'),
    }),
  },
  output: {
    schema: z.object({
      message: z.string().describe('A concise and engaging notification message.'),
    }),
  },
  prompt: `You are an AI assistant that generates notification messages for new anime episode releases.

  Given the following list of anime with new episode releases, create a concise and engaging notification message:

  {{#each animeList}}
  - {{title}} (Released on: {{releaseDate}})
  {{/each}}

  The notification message should be no more than 100 characters long.
  `,
});

const generateNotificationMessageFlow = ai.defineFlow<
  typeof GenerateNotificationMessageInputSchema,
  typeof GenerateNotificationMessageOutputSchema
>(
  {
    name: 'generateNotificationMessageFlow',
    inputSchema: GenerateNotificationMessageInputSchema,
    outputSchema: GenerateNotificationMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

