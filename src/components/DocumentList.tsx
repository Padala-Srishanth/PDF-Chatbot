
import { FileText } from "lucide-react";
import { Document } from "@/pages/Index";

interface DocumentListProps {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (doc: Document) => void;
}

export const DocumentList = ({ documents, selectedDocument, onSelectDocument }: DocumentListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (documents.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-sm text-slate-500">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          onClick={() => !doc.isProcessing && onSelectDocument(doc)}
          className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selectedDocument?.id === doc.id
              ? "border-blue-200 bg-blue-50"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          } ${doc.isProcessing ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-slate-800 truncate">
                {doc.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-slate-500">
                  {formatFileSize(doc.size)}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(doc.uploadDate)}
                </p>
              </div>
              
              {doc.isProcessing && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-600">Processing...</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                    <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
