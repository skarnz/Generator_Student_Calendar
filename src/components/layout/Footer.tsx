
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pattern-bg py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png" 
                alt="The Generator Logo" 
                className="h-8 sm:h-10 w-auto" 
              />
              <div>
                <h2 className="text-base sm:text-lg font-bold">The Generator</h2>
                <p className="text-xs text-generator-gold">Interdisciplinary AI Lab</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Empowering entrepreneurs and innovators at Babson College
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-generator-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.babson.edu/academics/centers/the-generator/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-generator-gold transition-colors">
                  About The Generator
                </a>
              </li>
              <li>
                <a href="https://forms.gle/D5mFsPjBNXrhzKqu9" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-generator-gold transition-colors">
                  Associates Program
                </a>
              </li>
              <li>
                <a href="mailto:generator@babson.edu" 
                   className="hover:text-generator-gold transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-generator-gold">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-4">
              Join our community and never miss an event
            </p>
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm text-generator-gold">Babson College</p>
              <p className="text-xs text-gray-300">© {currentYear} The Generator. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
