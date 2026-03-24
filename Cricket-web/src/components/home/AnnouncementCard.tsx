import { Megaphone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AnnouncementCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 mt-8 mb-4 relative z-20"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-600 shadow-md">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <Megaphone className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 text-lg">Welcome to KSRCT</h3>
              <p className="text-blue-700 mt-1">
                K.S. Rangasamy College of Technology welcomes all participants to the South Zone Women's Cricket Tournament 2026.
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-blue-500 hover:text-blue-700 -mt-1 -mr-2"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementCard;
