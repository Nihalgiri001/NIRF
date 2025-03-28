
import { useState } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Top government bar */}
      <div className="bg-primary-dark text-white py-1 px-4 md:px-6 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">Government of India</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="#">Contact Us</Link>
          <Link href="#">Feedback</Link>
        </div>
      </div>

      {/* Main header content */}
      <div className="border-b">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-6">
          <div className="flex items-center mb-3 md:mb-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">National Institutional Ranking Framework</h1>
              <p className="text-sm text-neutral-400">Ministry of Education, Government of India</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <ul className={`md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} md:items-center`}>
              <li>
                <Link href="/" className={`block py-3 px-4 hover:bg-primary-dark text-white ${location === '/' ? 'bg-primary-dark font-semibold' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rankings" className={`block py-3 px-4 hover:bg-primary-dark text-white ${location === '/rankings' ? 'bg-primary-dark font-semibold' : ''}`}>
                  Rankings
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-3 px-4 hover:bg-primary-dark text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
