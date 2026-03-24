import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

interface Contact {
  name: string;
  role: string;
  phone: string;
  email?: string;
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <Card className="p-4 bg-card shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{contact.name}</h3>
          <p className="text-sm text-muted-foreground">{contact.role}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            asChild
          >
            <a href={`tel:${contact.phone}`}>
              <Phone className="h-4 w-4 text-primary" />
            </a>
          </Button>
          {contact.email && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              asChild
            >
              <a href={`mailto:${contact.email}`}>
                <Mail className="h-4 w-4 text-primary" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContactCard;
