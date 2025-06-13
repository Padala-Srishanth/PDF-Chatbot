
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
      className={`border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
        isDragOver
          ? "border-green-400 bg-green-50"
          : "border-green-300 hover:border-green-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className={`w-5 h-5 mx-auto mb-2 ${isDragOver ? "text-green-500" : "text-green-400"}`} />
      <p className="text-xs font-medium text-slate-700 mb-1">
        Drop PDF files here
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
        className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 cursor-pointer transition-colors"
      >
        Select Files
      </label>
    </div>
  );
};
