import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import { User, Award, Shield, BookOpen, Star, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MemberProps {
  name: string;
  role: string;
  affiliation?: string;
  icon?: any;
  highlight?: boolean;
}

const MemberCard = ({ name, role, affiliation, icon: Icon, highlight }: MemberProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`relative overflow-hidden rounded-xl border ${
      highlight 
        ? "border-primary/40 bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.1)]" 
        : "border-border/50 bg-card/50"
    } backdrop-blur-sm p-6 transition-all duration-300`}
  >
    <div className="flex flex-col items-center text-center gap-3">
      <div className={`p-3 rounded-full ${highlight ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
        {Icon ? <Icon className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </div>
      <div>
        <h3 className={`font-serif font-bold ${highlight ? "text-xl text-primary" : "text-lg text-foreground"}`}>
          {name}
        </h3>
        <p className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">{role}</p>
        {affiliation && (
           <p className="text-xs text-muted-foreground/80 mt-2 max-w-[250px] mx-auto">{affiliation}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const Committee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <Shield className="w-4 h-4" />
            <span>South Zone 2026</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground"
          >
            Organizing Committee
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The distinguished leaders and committee members ensuring the success of the South Zone Inter-University Women's Cricket Tournament 2026.
          </p>
        </div>

        {/* Patrons Section */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/60"></div>
                <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                    <Crown className="w-6 h-6" /> Patrons
                </h2>
                 <div className="h-px flex-1 bg-border/60"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <MemberCard 
                    name="Convener Committee"
                    role="Chief Patron"
                    affiliation="Anna University, Chennai - 600 025"
                    icon={Crown}
                    highlight
                />
                <MemberCard 
                    name="Prof. Dr. V. Kumaresan"
                    role="Patron"
                    affiliation="Registrar i/c, Anna University, Chennai"
                    icon={Crown}
                    highlight
                />
            </div>
        </section>

        {/* Organizing Committee Header */}
        <section className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/60"></div>
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" /> Organizing Leadership
                </h2>
                 <div className="h-px flex-1 bg-border/60"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MemberCard 
                    name="Dr. N. Senthil Kumar"
                    role="Organizing Chairman"
                    affiliation="Chairman, Anna University Sports Board"
                    icon={Star}
                />
                 <MemberCard 
                    name="Dr. B. Balakumaran"
                    role="Organizing Secretary"
                    affiliation="Secretary, Anna University Sports Board"
                    icon={BookOpen}
                    highlight
                />
                 <MemberCard 
                    name="Dr. S. Muthukannan"
                    role="Local Organizing Secretary"
                    affiliation="DPE, K.S. Rangasamy College of Technology"
                    icon={User}
                />
            </div>
        </section>

         {/* Local Committee */}
         <section className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/60"></div>
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-accent" /> Local Leadership
                </h2>
                 <div className="h-px flex-1 bg-border/60"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                 <MemberCard 
                    name="Thiru R. Srinivasan"
                    role="Local Sports Co-ordinator"
                    affiliation="Chairman, K.S.R Educational Institutions"
                    icon={Shield}
                />
                 <MemberCard 
                    name="Mr. K.S. Sachin"
                    role="Vice Chairman"
                    affiliation="K.S.R Educational Institutions"
                    icon={User}
                />
                 <MemberCard 
                    name="Dr. R. Gopalakrishnan"
                    role="Principal"
                    affiliation="K.S. Rangasamy College of Technology"
                    icon={Award}
                />
            </div>
        </section>

        {/* Local Organizing Committee Members */}
        <section className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/60"></div>
                <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" /> Local Organizing Committee
                </h2>
                 <div className="h-px flex-1 bg-border/60"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <MemberCard 
                    name="Dr. N. Latha"
                    role="Member"
                    affiliation="Deputy Chairman, AUSB"
                    icon={User}
                />
                <MemberCard 
                    name="Dr. C. Velayutham"
                    role="Member"
                    affiliation="Deputy Chairman, AUSB"
                    icon={User}
                />
                <MemberCard 
                    name="Dr. G. Dhinagaran"
                    role="Member"
                    affiliation="Deputy Chairman, AUSB"
                    icon={User}
                />
                <MemberCard 
                    name="Dr. T. Thendral Thiyaku"
                    role="Member"
                    affiliation="Deputy Chairman, AUSB"
                    icon={User}
                />
                <MemberCard 
                    name="Dr. Evelyn Synthiya"
                    role="Member"
                    affiliation="ADPE, AUSB"
                    icon={User}
                />
            </div>
        </section>

      </div>
    </div>
  );
};

// Icon component helper
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

export default Committee;
