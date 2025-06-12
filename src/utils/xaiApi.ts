

const GOOGLE_API_KEY = "AIzaSyBF3r_s7Zlgcb7pA25ovtruwczZEGGTcno";
const GOOGLE_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const askQuestionAboutDocument = async (question: string, documentName: string): Promise<string> => {
  try {
    const response = await fetch(`${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an AI assistant that answers questions about PDF documents. The user has uploaded a document called "${documentName}". Please provide helpful and accurate responses based on the document content. If you cannot access the actual document content, provide a relevant and helpful response about the topic being asked.\n\nUser question: ${question}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      // Try to get the error message from the response
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
      
      console.error('Google API Error:', errorMessage);
      
      // Return a more specific error message based on the status
      if (response.status === 403) {
        return "❌ API Error: Your Google API account doesn't have sufficient quota or the API is not enabled. Please check your Google Cloud Console settings.";
      } else if (response.status === 401) {
        return "❌ API Error: Invalid API key. Please check your Google API credentials.";
      } else {
        return `❌ API Error: ${errorMessage}`;
      }
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error('Error calling Google API:', error);
    return "❌ Network Error: Unable to connect to the AI service. Please check your internet connection and try again.";
  }
};

