import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                BS
              </div>
              <h2 className="text-xl font-bold">Bimalendu Sarkar</h2>
            </div>
            <p className="text-gray-400 mt-2">Frontend Developer specializing in ReactJS</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About</a>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-300">Skills</a>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">Projects</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
              <div className="space-y-2">
                <a href="mailto:bimalendu.sarkar.it@gmail.com" className="text-gray-400 hover:text-white flex items-center transition-colors duration-300">
                  <i className="ri-mail-line mr-2"></i> bimalendu.sarkar.it@gmail.com
                </a>
                <a href="tel:9709091929" className="text-gray-400 hover:text-white flex items-center transition-colors duration-300">
                  <i className="ri-phone-line mr-2"></i> 9709091929
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Bimalendu Sarkar. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/bimalendu-sarkar" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="ri-linkedin-box-fill text-2xl"></i>
            </a>
            <a href="https://github.com/bimalendu04" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="ri-github-fill text-2xl"></i>
            </a>
            <a href="mailto:bimalendu.sarkar.it@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="ri-mail-fill text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
