import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, MapPin, Users } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="px-4 py-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Info className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold font-serif text-primary">About the Tournament</h2>
            </div>

            <Card className="bg-white/50 backdrop-blur-sm border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -translate-y-16 translate-x-16 opacity-50 pointer-events-none"></div>
                <CardContent className="space-y-4 text-slate-700 leading-relaxed relative z-10">
                    <p>
                        The South Zone Inter-University Women’s Cricket Tournament is being hosted, bringing together women cricketers from universities across South India. The event is being conducted to promote sportsmanship, teamwork, and competitive excellence. It provides a valuable platform for athletes to showcase their skills, gain exposure, and compete at a high level, fostering unity and the spirit of the game across the region.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600"><Calendar className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Dates</p>
                                <p className="font-medium text-blue-900">Jan 26 - Feb 02, 2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                            <div className="bg-emerald-50 p-2 rounded-full text-emerald-600"><MapPin className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Host</p>
                                <a 
                                    href="https://maps.app.goo.gl/yLzZhXJ23XkQ2CA29" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="font-medium hover:text-emerald-600 hover:underline transition-colors"
                                >
                                    KSRCT, Tiruchengode
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                            <div className="bg-purple-50 p-2 rounded-full text-purple-600"><Users className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Teams</p>
                                <p className="font-medium">50+ Universities</p>
                            </div>
                        </div>
                    </div>
                 </CardContent>
            </Card>
        </section>
        
    );
}
