import AppLayout from "@/components/layout/AppLayout";
import ContactCard from "@/components/common/ContactCard";
import { Phone } from "lucide-react";

const organizingCommittee = [
  {
    name: "Dr. B. Balakumaran",
    role: "Organizing Secretary (Secretary, Anna University Sports Board)",
    phone: "94440 36313, 83001 69313",
    email: "ausb@annauniv.edu, secretaryausb@annauniv.edu",
  },
  {
    name: "Dr. A. Karthik",
    role: "Accommodation Committee (Hostel Stay & Bedding)",
    phone: "97891 11450",
  },
  {
    name: "Mr. K. Yuvaraj",
    role: "Accommodation Committee (Hostel Stay & Bedding)",
    phone: "63697 16179",
  },
  {
    name: "Dr. S. Poornima",
    role: "Accommodation Committee (Hostel Stay & Bedding)",
    phone: "99946 25815",
  },
  {
    name: "Mr. M.R. Sibi",
    role: "Transport Committee (Pick-up from Railway Station/Bus Stand)",
    phone: "99949 20190",
  },
    {
    name: "Mr. K. Mohan",
    role: "Transport Committee (Pick-up from Railway Station/Bus Stand)",
    phone: "63830 54401",
  },
];

const supportServices = [
  {
    name: "Dr. K. Anitha",
    role: "Medical Officer",
    phone: "+91 98765 00010",
  },
  {
    name: "Campus Ambulance",
    role: "24/7 Emergency",
    phone: "+91 98765 00011",
  },
  {
    name: "Campus Security",
    role: "Security Desk",
    phone: "+91 98765 00012",
  },
  {
    name: "Help Desk",
    role: "General Enquiries",
    phone: "+91 98765 00013",
  },
];

const Contacts = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          Contact Directory
        </h1>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Organizing Committee</h2>
          <div className="space-y-3">
            {organizingCommittee.map((contact) => (
              <div key={contact.phone} className="glass-card p-4 hover:border-primary/40 transition-colors">
                <ContactCard contact={contact} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Support Services</h2>
          <div className="space-y-3">
            {supportServices.map((contact) => (
              <div key={contact.phone} className="glass-card p-4 hover:border-secondary/40 transition-colors">
                <ContactCard contact={contact} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contacts;
