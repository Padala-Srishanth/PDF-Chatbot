// Groq API key and endpoint URL (for AI chat completions)
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// askQuestionAboutDocument: Sends a question and document context to the Groq API and returns the AI's answer
export const askQuestionAboutDocument = async (question: string, documentName: string): Promise<string> => {
  try {
    // Make POST request to Groq API with system and user messages
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            // System prompt: instructs the AI to act as a PDF assistant
            role: 'system',
            content: `You are an AI assistant that answers questions about PDF documents. The user has uploaded a document called "${documentName}". Please provide helpful and accurate responses based on the document content. If you cannot access the actual document content, provide a relevant and helpful response about the topic being asked.`
          },
          {
            // User's question
            role: 'user',
            content: question
          }
        ],
        model: 'llama3-70b-8192', // Model to use for completion
        temperature: 0.7,         // Controls randomness of output
        max_tokens: 1000,         // Maximum tokens in the response
      }),
    });

    // Handle non-OK responses (errors)
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
      
      console.error('Groq API Error:', errorMessage);
      
      // Return user-friendly error messages for common status codes
      if (response.status === 403) {
        return "❌ API Error: Your Groq API account doesn't have sufficient quota or the API is not enabled. Please check your Groq Console settings.";
      } else if (response.status === 401) {
        return "❌ API Error: Invalid API key. Please check your Groq API credentials.";
      } else {
        return `❌ API Error: ${errorMessage}`;
      }
    }

    // Parse and return the AI's answer from the response
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Error calling Groq API:', error);
    return "❌ Network Error: Unable to connect to the AI service. Please check your internet connection and try again.";
  }
};