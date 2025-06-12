
import { useState } from "react";
import { Upload } from "lucide-react";

interface UploadAreaProps {
  onFileUpload: (files: FileList) => void;
}

export const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
        isDragOver
          ? "border-blue-400 bg-blue-50"
          : "border-slate-300 hover:border-blue-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragOver ? "text-blue-500" : "text-slate-400"}`} />
      <p className="text-sm font-medium text-slate-700 mb-1">
        Drop PDF files here or click to browse
      </p>
      <p className="text-xs text-slate-500 mb-3">
        Supports PDF files up to 10MB
      </p>
      
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      
      <label
        htmlFor="file-upload"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
      >
        Select Files
      </label>
    </div>
  );
};
