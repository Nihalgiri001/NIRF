import { useState } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        {/* Top government bar */}
        <div className="bg-primary-dark text-white py-1 px-4 md:px-6 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <img src="https://www.nirfindia.org/Home/images/emblem-dark.png" alt="Government of India Emblem" className="h-8" />
            <span className="hidden md:inline">Government of India</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="#main-content" className="hover:underline">Skip to Main Content</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:underline hidden md:inline">Screen Reader Access</a>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center space-x-1">
              <button className="px-1 text-sm bg-white text-primary border border-white">A-</button>
              <button className="px-1 text-sm bg-white text-primary border border-white">A</button>
              <button className="px-1 text-sm bg-white text-primary border border-white">A+</button>
            </div>
          </div>
        </div>
        
        {/* Logo and site title */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-6">
          <div className="flex items-center mb-3 md:mb-0">
            <img src="https://www.nirfindia.org/Home/images/nirf-logo.png" alt="NIRF Logo" className="h-14 md:h-16" />
            <div className="ml-3">
              <h1 className="text-xl md:text-2xl font-bold text-primary">National Institutional Ranking Framework</h1>
              <p className="text-sm text-neutral-400">Ministry of Education, Government of India</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded text-sm">Login</button>
            <button className="bg-amber-500 hover:brightness-95 text-white px-4 py-2 rounded text-sm">Register</button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="bg-primary text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between md:hidden px-4 py-2">
              <span>Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="flex flex-col md:flex-row text-sm">
                <li>
                  <Link href="/" className={`block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light ${location === '/' ? 'bg-primary-dark font-semibold' : ''}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light">
                    About NIRF
                  </Link>
                </li>
                <li>
                  <Link href="/rankings" className={`block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light ${location === '/rankings' ? 'bg-primary-dark font-semibold' : ''}`}>
                    Rankings
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className={`block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light ${location === '/methodology' ? 'bg-primary-dark font-semibold' : ''}`}>
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-3 px-4 hover:bg-primary-dark border-b md:border-b-0 border-primary-light">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
