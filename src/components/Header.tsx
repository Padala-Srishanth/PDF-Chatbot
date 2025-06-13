
export const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/66740e26-76d0-4a36-8fe0-876b51980efd.png" 
                alt="AI Planet Logo" 
                className="h-10 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">PDF Q&A</h1>
              <p className="text-sm text-slate-600">Ask questions about your documents</p>
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
