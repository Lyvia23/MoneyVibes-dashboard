"use client"

import { AppSidebar } from "@/src/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset 
          className={`
            flex flex-col h-full w-full transition-all duration-300
            ${isMobile ? 'ml-0' : ''}
          `}
        >
          {/* Padding top pour éviter que le contenu soit caché par le bouton toggle */}
          <div className="pt-16 md:pt-4 h-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}