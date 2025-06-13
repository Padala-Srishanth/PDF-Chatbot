
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Document, Message } from "@/pages/Index";

interface ChatInterfaceProps {
  document: Document;
  messages: Message[];
  onQuestionSubmit: (question: string) => void;
  isProcessing: boolean;
}

export const ChatInterface = ({ document, messages, onQuestionSubmit, isProcessing }: ChatInterfaceProps) => {
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isProcessing) {
      onQuestionSubmit(question.trim());
      setQuestion("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-green-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{document.name}</h2>
            <p className="text-sm text-slate-600">Ask questions about this document</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img 
                src="/lovable-uploads/29f49fb6-b4a8-4b0e-a601-ed0d7feb1cc6.png" 
                alt="AI Assistant" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Start a conversation</h3>
            <p className="text-slate-600">Ask me anything about the content of your PDF document.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-green-500' 
                  : 'bg-white border-2 border-green-500'
              }`}>
                {message.type === 'user' ? (
                  <img 
                    src="/lovable-uploads/1b5e048e-12d6-48b0-b1ac-5c590205541a.png" 
                    alt="User Earth" 
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <img 
                    src="/lovable-uploads/29f49fb6-b4a8-4b0e-a601-ed0d7feb1cc6.png" 
                    alt="AI Assistant" 
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
              
              <div className={`max-w-3xl ${message.type === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        
        {isProcessing && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-green-500 flex items-center justify-center">
              <img 
                src="/lovable-uploads/29f49fb6-b4a8-4b0e-a601-ed0d7feb1cc6.png" 
                alt="AI Assistant" 
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div className="bg-slate-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-green-200">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this document..."
            className="flex-1 px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!question.trim() || isProcessing}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
