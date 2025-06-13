
import { useState } from "react";
import { Header } from "@/components/Header";
import { DocumentList } from "@/components/DocumentList";
import { ChatInterface } from "@/components/ChatInterface";
import { UploadArea } from "@/components/UploadArea";
import { askQuestionAboutDocument } from "@/utils/xaiApi";

export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: number;
  isProcessing: boolean;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        const newDoc: Document = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          uploadDate: new Date(),
          size: file.size,
          isProcessing: true
        };
        
        setDocuments(prev => [...prev, newDoc]);
        
        // Simulate processing time
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === newDoc.id 
                ? { ...doc, isProcessing: false }
                : doc
            )
          );
        }, 3000);
      }
    });
  };

  const handleQuestionSubmit = async (question: string) => {
    if (!selectedDocument || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const answer = await askQuestionAboutDocument(question, selectedDocument.name);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: answer,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting answer:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, there was an error processing your question. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-120px)]">
          {/* Documents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 h-full flex flex-col">
              <div className="p-6 border-b border-green-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Documents</h2>
                <UploadArea onFileUpload={handleFileUpload} />
              </div>
              
              <div className="flex-1 overflow-hidden">
                <DocumentList 
                  documents={documents}
                  selectedDocument={selectedDocument}
                  onSelectDocument={selectDocument}
                />
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 h-full">
              {selectedDocument ? (
                <ChatInterface
                  document={selectedDocument}
                  messages={messages}
                  onQuestionSubmit={handleQuestionSubmit}
                  isProcessing={isProcessing}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Select a Document</h3>
                    <p className="text-slate-600">Choose a PDF from your documents to start asking questions about its content.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
