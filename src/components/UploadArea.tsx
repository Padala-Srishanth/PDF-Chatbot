import { useState } from "react"
import { Upload } from "lucide-react"

// Props for UploadArea: expects a file upload handler function
interface UploadAreaProps {
  onFileUpload: (files: FileList) => void
}

// UploadArea: Drag-and-drop and file select area for uploading PDFs
export const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false) // Track drag-over state for styling

  // Handle when files are dragged over the area
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  // Handle when drag leaves the area
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  // Handle when files are dropped onto the area
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files) // Pass files to parent handler
    }
  }

  // Handle when files are selected via the file input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files) // Pass files to parent handler
    }
  }

  return (
    <div
      // Style changes on drag-over for visual feedback
      className={`border-2 border-dashed rounded-lg p-3 text-center transition-all duration-200 ${
        isDragOver
          ? "border-green-400 bg-green-50"
          : "border-green-300 hover:border-green-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Upload icon, color changes on drag-over */}
      <Upload className={`w-5 h-5 mx-auto mb-2 ${isDragOver ? "text-green-500" : "text-green-400"}`} />
      <p className="text-xs font-medium text-slate-700 mb-1">
        Drop PDF files here
      </p>
      
      {/* Hidden file input for manual file selection */}
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      
      {/* Label styled as a button to trigger file input */}
      <label
        htmlFor="file-upload"
        className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 cursor-pointer transition-colors"
      >
        Select Files
      </label>
    </div>
  )
}