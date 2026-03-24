import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import MatchDetails from "./pages/MatchDetails";
import AnnaUniversity from "./pages/AnnaUniversity";
import KsrctPage from "./pages/KsrctPage";
import Schedule from "./pages/Schedule";
import Venue from "./pages/Venue";
import Teams from "./pages/Teams";
import Results from "./pages/Results";
import Discover from "./pages/Discover";
import Accommodation from "./pages/Accommodation";
import Food from "./pages/Food";
import Transport from "./pages/Transport";
import Contacts from "./pages/Contacts";
import Emergency from "./pages/Emergency";
import Rules from "./pages/Rules";
import Gallery from "./pages/Gallery";
import Feedback from "./pages/Feedback";
import Notifications from "./pages/Notifications";

import Committee from "./pages/Committee";
import More from "./pages/More";
import NotFound from "./pages/NotFound";
import { DataProvider } from "./context/DataContext";
import AdminLogin from "@/pages/admin/Login";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminMatches from "@/pages/admin/ManageMatches";
import AdminTeams from "@/pages/admin/ManageTeams";
import AdminVenues from "@/pages/admin/ManageVenues";
import AdminAnnouncements from "@/pages/admin/ManageAnnouncements";
import AdminGallery from "@/pages/admin/ManageGallery";
import AdminQuickLinks from "@/pages/admin/ManageQuickLinks";
import AdminFeedback from "@/pages/admin/ManageFeedback";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Show WhatsApp notification after a short delay
    const timer = setTimeout(() => {
      toast("Stay Updated!", {
        description: "Join our official WhatsApp group for live updates and announcements.",
        action: {
          label: "Join Now",
          onClick: () => window.open("https://chat.whatsapp.com/your-group-invite-link", "_blank"),
        },
        duration: 10000, 
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/results" element={<Results />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/food" element={<Food />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/committee" element={<Committee />} />
            <Route path="/more" element={<More />} />
            <Route path="/anna-university" element={<AnnaUniversity />} />
            <Route path="/ksrct" element={<KsrctPage />} />
            <Route path="/match/:id" element={<MatchDetails />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="matches" element={<AdminMatches />} />
              <Route path="teams" element={<AdminTeams />} />
              <Route path="venues" element={<AdminVenues />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="quick-links" element={<AdminQuickLinks />} />
              <Route path="feedback" element={<AdminFeedback />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
