import { Link } from 'wouter';
import { Presentation, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4 flex items-center gap-2">
              <Presentation className="h-5 w-5" />
              <span>WorkshopHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover and join free workshops to enhance your skills and knowledge across various domains.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#workshops" className="text-gray-400 hover:text-white transition-colors">Workshops</Link></li>
              <li><Link href="/#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Workshop Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/?category=Technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link></li>
              <li><Link href="/?category=Design" className="text-gray-400 hover:text-white transition-colors">Design</Link></li>
              <li><Link href="/?category=Business" className="text-gray-400 hover:text-white transition-colors">Business</Link></li>
              <li><Link href="/?category=Marketing" className="text-gray-400 hover:text-white transition-colors">Marketing</Link></li>
              <li><Link href="/?category=Personal%20Development" className="text-gray-400 hover:text-white transition-colors">Personal Development</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-gray-400 h-4 w-4" />
                <span className="text-gray-400">123 Workshop St, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-gray-400 h-4 w-4" />
                <a href="mailto:info@workshophub.com" className="text-gray-400 hover:text-white transition-colors">info@workshophub.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-gray-400 h-4 w-4" />
                <a href="tel:+14155552671" className="text-gray-400 hover:text-white transition-colors">+1 (415) 555-2671</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center sm:text-left sm:flex sm:justify-between">
          <p className="text-gray-400">© {new Date().getFullYear()} WorkshopHub. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
