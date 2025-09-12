import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";

// Custom scrollbar styles - Add this CSS to your global styles or index.css
const scrollbarStyles = `
  /* Webkit Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #d1d5db, #9ca3af);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #9ca3af, #6b7280);
    transform: scale(1.1);
  }

  ::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, #6b7280, #4b5563);
  }

  ::-webkit-scrollbar-corner {
    background: #f1f5f9;
  }

  /* For Firefox */
  html {
    scrollbar-width: thin;
    scrollbar-color: #9ca3af #f1f5f9;
  }

  /* Enhanced scrollbar for dark sections */
  .dark-scrollbar::-webkit-scrollbar-track {
    background: #1f2937;
  }

  .dark-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4b5563, #6b7280);
  }

  .dark-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #6b7280, #9ca3af);
  }

  /* Smooth scrolling behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar animation */
  @keyframes scrollbar-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ::-webkit-scrollbar-thumb {
    animation: scrollbar-fade-in 0.3s ease-in-out;
  }
`;

// ScrollToTop component with enhanced smooth scrolling
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Smooth scroll to top with animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Enhanced Navbar component with scroll indicator
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 z-[60] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704911/logo_xyx3ln.png"
                  alt="Paresh Enterprise"
                  className="h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-amber-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className={`font-extralight text-xl tracking-wider transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                } group-hover:text-amber-600`}>
                  Paresh Enterprise
                </span>
                <div className={`text-xs font-light tracking-widest ${
                  scrolled ? "text-gray-500" : "text-white/70"
                }`}>
                  ENGINEERING EXCELLENCE
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative font-light text-sm tracking-wider transition-all duration-300 group ${
                    location.pathname === item.to
                      ? scrolled ? "text-gray-900" : "text-white"
                      : scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.to ? (
                    <div className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                      scrolled ? "bg-gray-900" : "bg-white"
                    }`} />
                  ) : (
                    <div className={`absolute -bottom-1 left-1/2 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                      scrolled ? "bg-amber-600" : "bg-white"
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 rounded-b-2xl shadow-xl">
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block mx-4 px-6 py-3 rounded-xl font-light tracking-wider transition-all duration-300 transform ${
                      location.pathname === item.to
                        ? "text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-2"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// Enhanced Footer component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://res.cloudinary.com/dykfjyvyw/image/upload/v1757704911/logo_xyx3ln.png" alt="Paresh Enterprise" className="h-12 w-12" />
              <div>
                <div className="font-extralight text-xl tracking-wider">Paresh Enterprise</div>
                <div className="text-sm text-gray-400 tracking-widest">ENGINEERING EXCELLENCE</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Leading provider of precision engineering solutions with over a decade of excellence in manufacturing and innovation.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>16-A, Mahaveer Colony</p>
              <p>Hiran Magri, Sector-4</p>
              <p>Udaipur, Rajasthan-313002</p>
              <p>Phone: +91 7597115533</p>
              <p>Alt. Phone: +91 9351138396</p>
              <p>Email: paresh_udr@yahoo.co.in</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Paresh Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


// Scroll to Top Button Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// Main App Component with enhanced styling
function App() {
  // Inject scrollbar styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        <ScrollToTop />
        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Redirect unknown routes to homepage */} 
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}

export default App;