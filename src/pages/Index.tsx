import { useState } from "react";
import { Header } from "@/components/Header";
import { DocumentList } from "@/components/DocumentList";
import { ChatInterface } from "@/components/ChatInterface";
import { askQuestionAboutDocument } from "@/utils/xaiApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Document type definition
export interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: number;
  isProcessing: boolean;
}

// Message type definition
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  // State for uploaded documents
  const [documents, setDocuments] = useState<Document[]>([]);
  // State for currently selected document
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State for loading indicator when processing a question
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file upload (drag-and-drop or file select)
  const handleFileUpload = (files: FileList) => {
    let successCount = 0;
    let errorCount = 0;

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        // Create a new document object for each PDF
        const newDoc: Document = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          uploadDate: new Date(),
          size: file.size,
          isProcessing: true
        };

        setDocuments(prev => [...prev, newDoc]);
        successCount++;

        // Simulate processing time for PDF upload
        setTimeout(() => {
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === newDoc.id
                ? { ...doc, isProcessing: false }
                : doc
            )
          );

          // Show toast for successful upload
          if (successCount === 1) {
            toast.success(`${file.name} uploaded successfully!`);
          }
        }, 3000);
      } else {
        errorCount++;
        // Show error toast for invalid file type
        toast.error(`${file.name} is not a valid PDF file`);
      }
    });

    // Show toast for multiple successful uploads
    if (successCount > 1) {
      toast.success(`${successCount} PDF files uploaded successfully!`);
    }
    // Show error toast if all files failed
    if (errorCount > 0 && successCount === 0) {
      toast.error(`${errorCount} files failed to upload. Only PDF files are supported.`);
    }
  };

  // Handle user submitting a question about the selected document
  const handleQuestionSubmit = async (question: string) => {
    if (!selectedDocument || isProcessing) return;

    // Add user's message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Call API to get answer from assistant
      const answer = await askQuestionAboutDocument(question, selectedDocument.name);

      // Add assistant's response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error from API
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

  // Handle selecting a document from the sidebar
  const selectDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setMessages([]); // Clear chat when switching documents
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Top header with logo and upload area */}
      <Header onFileUpload={handleFileUpload} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-120px)]">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 h-full">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 h-full flex flex-col">
              <div className="p-6 border-b border-green-200">
                <h2 className="text-xl font-semibold text-slate-800">Your Documents</h2>
              </div>

              {/* Document List: Show 4 fully, scroll if more */}
              <div className="overflow-y-auto" style={{ maxHeight: '360px' }}>
                <DocumentList
                  documents={documents}
                  selectedDocument={selectedDocument}
                  onSelectDocument={selectDocument}
                />
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 h-full flex flex-col">
              {selectedDocument ? (
                // Show chat interface if a document is selected
                <ChatInterface
                  document={selectedDocument}
                  messages={messages}
                  onQuestionSubmit={handleQuestionSubmit}
                  isProcessing={isProcessing}
                />
              ) : (
                // Show prompt to select a document if none is selected
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src="/uploads/magnifier-24271_1280.png"
                        alt="Magnifying Glass"
                        className="w-12 h-12"
                      />
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

      {/* Toast notifications for upload and error messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Index;