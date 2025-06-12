
const XAI_API_KEY = "xai-VhYHmYYg1I2Hhny2K4CGj7IAmx8aP7XDrLgNUHgYzHirgphABrfZaBomFjyzpNztiXpJcIbhNcYMfyWh";
const XAI_API_URL = "https://api.x.ai/v1/chat/completions";

export const askQuestionAboutDocument = async (question: string, documentName: string): Promise<string> => {
  try {
    const response = await fetch(XAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant that answers questions about PDF documents. The user has uploaded a document called "${documentName}". Please provide helpful and accurate responses based on the document content. If you cannot access the actual document content, provide a relevant and helpful response about the topic being asked.`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      // Try to get the error message from the response
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || `API request failed with status ${response.status}`;
      
      console.error('xAI API Error:', errorMessage);
      
      // Return a more specific error message based on the status
      if (response.status === 403) {
        return "❌ API Error: Your xAI account doesn't have sufficient credits. Please add credits at https://console.x.ai/ to use the AI features.";
      } else if (response.status === 401) {
        return "❌ API Error: Invalid API key. Please check your xAI API credentials.";
      } else {
        return `❌ API Error: ${errorMessage}`;
      }
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error('Error calling xAI API:', error);
    return "❌ Network Error: Unable to connect to the AI service. Please check your internet connection and try again.";
  }
};
