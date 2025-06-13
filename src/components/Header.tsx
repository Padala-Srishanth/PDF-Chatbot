
export const Header = () => {
  return (
    <header className="bg-white border-b border-green-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm border border-green-200">
              <img 
                src="/lovable-uploads/66740e26-76d0-4a36-8fe0-876b51980efd.png" 
                alt="AI Planet Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">PDF ChatBot</h1>
              <p className="text-sm text-slate-600">Chat with your PDF</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-600">
              Powered by AI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
