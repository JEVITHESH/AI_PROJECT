import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
  hideNav?: boolean;
  hideGlobalBackground?: boolean;
}

import { PremiumBackground } from "./PremiumBackground";

const AppLayout = ({ children, hideHeader = false, hideNav = false, hideGlobalBackground = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {!hideGlobalBackground && <PremiumBackground />}
      {!hideHeader && <Header />}
      <main className={`${!hideNav ? "pb-20" : ""}`}>
        {children}
      </main>
      <Footer />
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
