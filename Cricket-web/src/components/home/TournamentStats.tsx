
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

export default function TournamentStats() {
  return (
    <section className="px-4 pb-6 max-w-7xl mx-auto">
      <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
           <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">50+</p>
                <p className="text-sm text-slate-600 font-medium">Teams Participating</p>
              </div>
           </div>
           
           <div className="hidden md:block w-px h-12 bg-slate-200"></div>

           <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">6</p>
                <p className="text-sm text-slate-600 font-medium">States Represented</p>
              </div>
           </div>
           
           <div className="hidden md:block w-px h-12 bg-slate-200"></div>
           
           <div className="text-slate-600 italic">
              "Expected to be a landmark event in women's cricket"
           </div>
        </CardContent>
      </Card>
    </section>
  );
}
