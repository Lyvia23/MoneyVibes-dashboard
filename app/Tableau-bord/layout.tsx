"use client"

import { AppSidebar } from "@/src/components/AppSidebar";
import { PageHeader } from "@/src/components/PageHeader";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { PageProvider, usePageInfo } from "@/src/Context/pageContext";

// Composant interne qui utilise le contexte
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { pageInfo } = usePageInfo();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
    // Logique pour ouvrir les notifications
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Navigation vers la page profil
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Navigation vers les paramètres
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    // Logique de déconnexion
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-full w-full">
          {/* Header unique intégrant le toggle et les infos de page */}
          <PageHeader
            title={pageInfo.title}
            description={pageInfo.description}
            user={pageInfo.user}
            notificationCount={pageInfo.notificationCount}
            onNotificationClick={handleNotificationClick}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
            className="sticky top-0 z-40"
            // Ajout du toggle de sidebar
            leftAction={
              <SidebarTrigger 
                className="
                  flex items-center justify-center
                  w-9 h-9 rounded-lg
                  border border-gray-200
                  hover:bg-gray-50 hover:border-gray-300
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                  active:scale-95 mr-4
                "
              >
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
            }
          />

          {/* Contenu principal */}
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Layout principal qui wrap avec les providers
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </PageProvider>
  );
}