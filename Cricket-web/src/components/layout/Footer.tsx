import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-blue-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/images/footer_bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logos/anna.png" alt="Anna University" className="h-12 w-auto bg-white rounded-full p-1" />
              <img src="/logos/ksrct_logo.png" alt="KSRCT" className="h-12 w-auto bg-white rounded-full p-1" />
            </div>
            <h3 className="text-xl font-bold mb-4">South Zone Inter-University Women's Cricket Tournament 2026</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Organized by Anna University, Chennai and hosted by K.S. Rangasamy College of Technology, Tiruchengode.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/schedule" className="text-blue-200 hover:text-white transition-colors">Match Schedule</Link></li>
              <li><Link to="/results" className="text-blue-200 hover:text-white transition-colors">Results</Link></li>
              <li><Link to="/teams" className="text-blue-200 hover:text-white transition-colors">Participating Teams</Link></li>
              <li><Link to="/gallery" className="text-blue-200 hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link to="/committee" className="text-blue-200 hover:text-white transition-colors">Organizing Committee</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-blue-200 text-sm">
                  K.S. Rangasamy College of Technology,<br />
                  K.S.R. Kalvi Nagar, Tiruchengode - 637 215.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">+91 4288 274741</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">principal@ksrct.ac.in</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-sm text-center md:text-left">
            © 2026 South Zone Cricket Tournament. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-blue-300">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
