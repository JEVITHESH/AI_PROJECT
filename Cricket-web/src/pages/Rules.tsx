import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Trophy, Users, FileText, Shirt, BadgeIndianRupee, Gavel, Hammer, Home, MessageSquare, Edit2, Save, X, Bus, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_RULES = [
  {
    id: "general",
    icon: BookOpen,
    title: "I. General Instructions - Registration & Reporting",
    items: [
      "Reporting: Participation in the Managers' Meeting is required on 26.01.2026.",
      "Inauguration: Presence is requested for the Inaugural Function on 27.01.2026 at 7:00 AM.",
      "University Flag: The University Flag is required to be brought by all participating universities for the Inaugural Function.",
      "Team Composition: Teams must be accompanied by a Manager and a Coach.",
      "Time Management: Teams are required to report to their respective sessions at least 45 minutes before the scheduled start time."
    ]
  },
  {
    id: "logistics",
    icon: Home,
    title: "I. General Instructions - Accommodation & Logistics",
    items: [
      "Venue: Accommodation for women players and officials will be arranged in the respective hostels of K.S. Rangasamy College of Technology.",
      "Bedding Charges: A fee of Rs. 200/- per person per day is to be collected for bedding charges.",
      "Caution Deposit: A Caution Deposit of Rs. 5,000/- is to be collected from the Team Manager at check-in, which will be refunded at check-out minus any deductions for damages.",
      "Payment Mode: Payments are to be made via UPI or Cash to the local organizers.",
      "Security: Locks and keys are required to be brought by the teams.",
      "Check-in/Check-out: Accommodation will be provided one day prior to the match and must be vacated within 24 hours after the completion of the competition.",
      "Receipts: Duly signed receipts are to be issued for accommodation charges and caution deposits."
    ]
  },
  {
    id: "transport",
    icon: Bus,
    title: "I. General Instructions - Transportation",
    items: [
      "Arrival: Pick-up arrangements from Erode Railway Station or Tiruchengode Bus Stand can be made upon prior request from the morning of 26.01.2026.",
      "Charges: A sum of Rs. 1,500/- will be collected for one-way transportation from the station/bus stand to the venue.",
      "Schedule: The travel schedule is requested to be informed well in advance to the Transport In-charge.",
      "Match Transport: Transportation from the accommodation venue to the match ground will be provided free of cost."
    ]
  },
  {
    id: "food",
    icon: Coffee,
    title: "I. General Instructions - Food & Dining",
    items: [
      "Provision: Boarding arrangements have been made on a payment basis.",
      "Tokens: Food tokens are to be obtained in advance at the venue.",
      "Rates: Charges are fixed at Rs. 85/- for Breakfast, Rs. 130/- for Lunch, and Rs. 85/- for Dinner."
    ]
  },
  {
    id: "technical",
    icon: Gavel,
    title: "II. Rules & Regulations - Technical & Match Specifics",
    items: [
      "Authority: The tournament is to be conducted strictly in accordance with the rules and regulations of the Association of Indian Universities (AIU), New Delhi.",
      "Uniforms: Proper uniforms as prescribed by AIU (neat white clothing and white shoes) must be worn.",
      "Match Format (Up to QF): Matches are to be played as 20 Overs.",
      "Match Format (QF): Matches are to be played as 30 Overs.",
      "Match Format (Semi-Finals+): Matches are to be played as 50 Overs.",
      "Pitch: Matches are to be played on matting wickets only."
    ]
  },
  {
    id: "fees",
    icon: BadgeIndianRupee,
    title: "II. Rules & Regulations - Fees & Equipment",
    items: [
      "Officiating Fee: An officiating fee of Rs. 2,500/- per match (per team) is to be paid.",
      "Ball Charges: Ball charges of Rs. 1,000/- per match are to be collected as per AIU norms.",
      "Ball Type (Up to QF): SF Yarker 4-piece red color balls are to be used.",
      "Ball Type (Semis & Final): SG 4-piece red color balls are to be used.",
      "Collection: Balls must be collected from the organizers upon payment."
    ]
  },
  {
    id: "documents",
    icon: FileText,
    title: "II. Rules & Regulations - Documentation Requirements",
    items: [
      "Eligibility Proforma: Five (5) copies of the Eligibility Proforma, duly signed by competent authorities, are to be submitted by Team Managers.",
      "Player Documents: The following attested documents must be produced by players:",
      "1. University Identity Card",
      "2. +2/HSC/PUC Mark Statement",
      "3. Diploma / Degree Provisional Certificate",
      "4. Current Semester Mark Sheet",
      "5. Aadhaar Card",
      "6. Bonafide Certificate",
      "7. DigiLocker ID"
    ]
  },
  {
    id: "conduct",
    icon: Users,
    title: "III. General Rules & Conduct",
    items: [
      "Punctuality: Teams failing to report on time will be scratched from the tournament by the officials.",
      "Administrative Authority: The decisions of the Organizing Committee are considered final and binding in all matters.",
      "Schedule Changes: The right to alter fixtures, prepone, postpone, or change the tournament schedule is reserved by the Organizing Secretary.",
      "AIU Subscription: Proof of payment of the AIU Annual Subscription Fee and Registration Fee for 2025-26 must be produced at the time of registration. Teams failing to do so will not be permitted to participate.",
      "Weather: Matches may be reduced or curtailed due to rain or unforeseen circumstances at the discretion of the Match Officials.",
      "Disputes: The decisions of the Match Officials are to be considered final and binding.",
      "Protests: Protests regarding technical grounds may be submitted within 30 minutes of match completion, accompanied by a Protest Fee of Rs. 2,000/- (refundable if upheld).",
      "Jury: The decision of the Jury Committee is final in all matters.",
      "Travel Responsibility: Any travel outside the venue for sightseeing is undertaken at the responsibility of the respective Universities."
    ]
  }
];

const Rules = () => {
  const [rules, setRules] = useState<any[]>(() => {
    const saved = localStorage.getItem('rules_data');
    return saved ? JSON.parse(saved) : INITIAL_RULES;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    localStorage.setItem('rules_data', JSON.stringify(rules));
  }, [rules]);

  // Map icon names back to components for persistence (simplified for now, just strictly using INITIAL icons)
  // In a real app we'd need a safer way to persist icon references or just persist content.
  // For this demo, we will merge the persisted text with the initial structure's icons.
  const displayRules = rules.map((r, index) => ({
    ...r,
    icon: INITIAL_RULES[index]?.icon || BookOpen // Fallback icon
  }));

  const handleStartEdit = (section: any) => {
    setEditingId(section.id);
    setEditContent(section.items.join('\n'));
  };

  const handleSaveEdit = () => {
    const updatedRules = rules.map(r => {
      if (r.id === editingId) {
        return {
          ...r,
          items: editContent.split('\n').filter(line => line.trim() !== "")
        };
      }
      return r;
    });
    setRules(updatedRules);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4 pb-20">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Rules & Guidelines
        </h1>

        <Card className="p-5 bg-primary/10 border-primary/20 backdrop-blur-sm border-l-4 border-l-primary shadow-sm">
          <p className="text-sm text-foreground font-medium leading-relaxed">
            All participants are expected to read and follow these guidelines.
            Violation of rules may result in penalties or disqualification.
          </p>
        </Card>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {displayRules.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="glass-card border border-border/50 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between pr-4 hover:bg-primary/5 transition-colors">
                <AccordionTrigger className="px-5 py-4 hover:no-underline flex-1">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <section.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="font-bold text-foreground text-base tracking-tight">{section.title}</span>
                  </div>
                </AccordionTrigger>

                {isAdmin && editingId !== section.id && (
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary/20" onClick={(e) => { e.stopPropagation(); handleStartEdit(section); }}>
                    <Edit2 className="h-4 w-4 text-primary" />
                  </Button>
                )}
              </div>

              <AccordionContent className="px-5 pb-5">
                {editingId === section.id ? (
                  <div className="space-y-3 pt-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                      <Button size="sm" onClick={handleSaveEdit}><Save className="h-4 w-4 mr-1" /> Save</Button>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-3 pt-2">
                    {section.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AppLayout>
  );
};

export default Rules;
