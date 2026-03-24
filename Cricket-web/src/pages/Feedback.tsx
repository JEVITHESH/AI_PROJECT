import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useData } from "@/context/DataContext";
import { Send, CheckCircle2 } from "lucide-react";

export default function Feedback() {
  const { addFeedback } = useData();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    addFeedback({
      id: `fb-${Date.now()}`,
      name,
      role,
      message,
      date: new Date().toISOString()
    });

    setSubmitted(true);
    toast.success("Feedback submitted successfully!");
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 max-w-2xl pt-20">
        <Card className="bg-white/95 backdrop-blur shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-serif text-primary">Feedback & Support</CardTitle>
            <CardDescription>
              We value your feedback! Let us know if you have any suggestions or are facing any issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Select onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Player">Player</SelectItem>
                      <SelectItem value="Team Manager">Team Manager</SelectItem>
                      <SelectItem value="Coach">Coach</SelectItem>
                      <SelectItem value="Official">Match Official</SelectItem>
                      <SelectItem value="Student">Student / Spectator</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message / Complaint</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or suggestion..."
                    className="min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full gap-2 text-md">
                  <Send className="w-4 h-4" /> Submit Feedback
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Your feedback has been recorded. We appreciate your contribution to making this tournament a success.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
