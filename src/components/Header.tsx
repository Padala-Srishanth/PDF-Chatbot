import { UploadArea } from "./UploadArea";

interface HeaderProps {
  onFileUpload: (files: FileList) => void;
}

export const Header = ({ onFileUpload }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-green-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left section: Logo + Title/SubTitle */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            {/* Logo */}
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-green-200 shadow-sm p-2">
              <img 
                src="/uploads/66740e26-76d0-4a36-8fe0-876b51980efd.png" 
                alt="AI Planet Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Title + Subtitle */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">PDF ChatBot</h1>
              <p className="text-sm text-slate-600">Chat with your PDF</p>
            </div>
          </div>

          {/* Right section: Upload */}
          <div className="w-full sm:w-auto">
            <UploadArea onFileUpload={onFileUpload} />
          </div>
        </div>
      </div>
    </header>
  );
};
