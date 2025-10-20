import axios from 'axios';

const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private timeout: number = 30000; // 30 seconds

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async generateTextSuggestion(
    prompt: string,
    context?: string
  ): Promise<string> {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      throw new Error('OpenAI API key not configured');
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful assistant that helps people write clear, professional descriptions for social support applications. Keep responses concise and empathetic.'
      },
      {
        role: 'user',
        content: context ? `${context}\n\n${prompt}` : prompt
      }
    ];

    try {
      const response = await axios.post<OpenAIResponse>(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.');
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw new Error('Failed to generate suggestion. Please try again.');
    }
  }
}

export const openAIService = OpenAIService.getInstance();
