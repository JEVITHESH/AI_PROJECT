import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Megaphone, Info } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Welcome to KSRCT",
      message: "K.S. Rangasamy College of Technology welcomes all participants to the South Zone Women's Cricket Tournament 2026.",
      type: "info",
      time: "Just now",
      date: "2026-01-23"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-full">
            <Megaphone className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {notifications.map((notification) => (
            <Card key={notification.id} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2 items-center">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Info
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {notification.time}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{notification.title}</h3>
                <p className="text-gray-600 leading-relaxed">{notification.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
