import AppLayout from "@/components/layout/AppLayout";
import HeroBanner from "@/components/home/HeroBanner";
import AboutSection from "@/components/home/AboutSection";

import QuickActions from "@/components/home/QuickActions";
import SpiritSection from "@/components/home/SpiritSection";
import AnnouncementCard from "@/components/home/AnnouncementCard";

import TournamentQuickLinks from "@/components/home/TournamentQuickLinks";

import TournamentStats from "@/components/home/TournamentStats";

import HomeAuroraBackground from "@/components/home/HomeAuroraBackground";

const Index = () => {
  return (
    <AppLayout hideGlobalBackground>
      <HomeAuroraBackground />
      <div className="relative z-10">
        <HeroBanner />
        <AboutSection />
        <TournamentQuickLinks />
        <TournamentStats />
        <QuickActions />
        <SpiritSection />
        <AnnouncementCard />
      </div>
    </AppLayout>
  );
};

export default Index;
