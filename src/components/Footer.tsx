
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pattern-bg py-12 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png" 
              alt="The Generator Logo" 
              className="h-10 w-auto" 
            />
            <div>
              <h2 className="text-lg font-bold">The Generator</h2>
              <p className="text-xs text-generator-gold">Interdisciplinary AI Lab</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-generator-gold">Babson College</p>
            <p className="text-xs text-gray-300">© {currentYear} The Generator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
