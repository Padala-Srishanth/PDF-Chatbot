import { UploadArea } from "./UploadArea";

interface HeaderProps {
  onFileUpload: (files: FileList) => void;
}

export const Header = ({ onFileUpload }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-green-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

          {/* Logo */}
          <div className="flex flex-col items-center">
            {/* Mobile logo (visible on small screens) */}
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-green-200 shadow-sm p-2 sm:hidden">
              <img
                src="/uploads/66740e26-76d0-4a36-8fe0-876b51980efd.png"
                alt="AI Planet Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Desktop logo (hidden on small screens) */}
            <div className="w-30 h-20 hidden sm:flex items-center justify-center bg-white rounded-lg border border-green-200 shadow-sm p-2">
              <img
                src="/uploads/66740e26-76d0-4a36-8fe0-876b51980efd.png"
                alt="AI Planet Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Title + Subtitle */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <h1 className="text-2xl sm:text-5xl font-bold text-slate-800 text-center">PDF ChatBot</h1>
            <p className="text-base sm:text-lg text-slate-600 text-center">Chat with your PDF</p>
          </div>

          {/* Upload Area */}
          <div className="w-full flex justify-center sm:w-auto sm:justify-end">
            <UploadArea onFileUpload={onFileUpload} />
          </div>
        </div>
      </div>
    </header>
  );
}
