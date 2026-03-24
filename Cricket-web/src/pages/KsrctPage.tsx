import AppLayout from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Globe, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ksrctBg from "@/assets/images/ksrct_bg.jpg";
import ksrctLogo from "@/assets/logos/ksrct_logo.png";

const KsrctPage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 pt-20 relative">
        {/* Hero Background Image */}
        <div className="absolute inset-0 h-[50vh] z-0 overflow-hidden">
          <img 
            src={ksrctBg}
            alt="KSRCT Campus" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-gray-50/90" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 py-12 md:py-20 px-4 shadow-sm border-b border-blue-100/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white p-4 rounded-full shadow-lg border-4 border-blue-50 flex items-center justify-center relative z-20"
              >
                <img 
                  src={ksrctLogo}
                  alt="KSRCT Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  K.S. Rangasamy College of Technology
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl text-blue-600 font-medium mb-6"
                >
                  Autonomous Institution | Naac Accredited with 'A++' Grade
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap justify-center md:justify-start gap-3"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.open('https://ksrct.ac.in', '_blank')}>
                    <Globe className="mr-2 h-4 w-4" /> Visit Official Website
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative z-10 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-blue-600 rounded-full mr-3"></span>
                  About the Institution
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  K.S. Rangasamy College of Technology (KSRCT) was established in 1994, with the aim of providing quality education in Engineering and Technology. The college is an autonomous institution, affiliated to Anna University, Chennai, and approved by AICTE, New Delhi.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The college offers various Undergraduate, Postgraduate, and Doctoral programs. It is known for its excellent infrastructure, state-of-the-art laboratories, and a committed faculty team.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-yellow-400 rounded-full mr-3"></span>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <p className="text-gray-600">
                      K.S.R. Kalvi Nagar, Tiruchengode - 637 215,<br />
                      Namakkal District, Tamil Nadu, India.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <p className="text-gray-600">+91 4288 274741, 44</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <p className="text-gray-600">principal@ksrct.ac.in</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default KsrctPage;
