import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About NIRF</h3>
            <p className="text-sm text-neutral-800">
              The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched in 2015 to rank higher educational institutions in India.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/rankings" className="text-neutral-800 hover:text-neutral-900">
                  Rankings
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-neutral-800 hover:text-neutral-900">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Data Requirements
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-neutral-800 hover:text-neutral-900">
                  Score Calculator
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Documents
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Media Coverage
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-800 hover:text-neutral-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <address className="text-sm text-neutral-800 not-italic">
              <p className="mb-2">National Institutional Ranking Framework</p>
              <p className="mb-2">Department of Higher Education</p>
              <p className="mb-2">Ministry of Education</p>
              <p className="mb-2">Government of India</p>
              <p className="mb-2">New Delhi - 110001</p>
              <p className="mb-2">Email: <a href="mailto:helpdesk@nirfindia.org" className="text-neutral-800 hover:underline">helpdesk@nirfindia.org</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-neutral-600 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-800">&copy; {new Date().getFullYear()} National Institutional Ranking Framework. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-800 hover:text-neutral-900">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-neutral-800 hover:text-neutral-900">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-neutral-800 hover:text-neutral-900">
              <Youtube size={18} />
            </a>
            <a href="#" className="text-neutral-800 hover:text-neutral-900">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
