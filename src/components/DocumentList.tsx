import { FileText, Search } from "lucide-react";
import { Document } from "@/pages/Index";
import { useState } from "react";

interface DocumentListProps {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (doc: Document) => void;
}

export const DocumentList = ({
  documents,
  selectedDocument,
  onSelectDocument,
}: DocumentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to format file size in human-readable units
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper to format the upload date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter documents by search term (case-insensitive)
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show empty state if there are no documents
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
    <div className="p-3 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Search icon inside the input */}
        <Search className="w-4 h-4 text-slate-400 absolute top-2.5 left-3" />
      </div>

      {/* Filtered document list */}
      {filteredDocuments.length === 0 ? (
        // Show message if no documents match the search
        <p className="text-center text-sm text-slate-400 mt-4">No matching documents found.</p>
      ) : (
        // Render each filtered document
        filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            // Only allow selection if not processing
            onClick={() => !doc.isProcessing && onSelectDocument(doc)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedDocument?.id === doc.id
                ? "border-blue-200 bg-blue-50" // Highlight selected document
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            } ${doc.isProcessing ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-start space-x-3">
              {/* Document icon */}
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-600" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Document name */}
                <h3 className="text-sm font-medium text-slate-800 truncate">
                  {doc.name}
                </h3>
                {/* File size and upload date */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500">
                    {formatFileSize(doc.size)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(doc.uploadDate)}
                  </p>
                </div>

                {/* Show processing indicator if document is being processed */}
                {doc.isProcessing && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-600">Processing...</span>
                    </div>
                    {/* Animated progress bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full animate-pulse"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};