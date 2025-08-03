import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-serif">Smart Stack System™</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              AI-powered supplement guidance designed specifically for women 35+ navigating hormonal changes, sleep issues, and supplement overwhelm.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz">
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Stack Builder Quiz
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stack-guides">
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Stack Guides
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Knowledge Hub
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stack-audit">
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Stack Audit
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Product Database
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Affiliate Disclosure</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Medical Disclaimer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Smart Stack System™. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>This site is protected by SSL encryption</span>
            </div>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="mt-6 p-4 bg-warm-gray/10 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Medical Disclaimer:</strong> The information provided on this website is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before starting any supplement regimen, especially if you are pregnant, nursing, or have any medical conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}