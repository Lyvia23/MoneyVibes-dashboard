"use client"

import {
  LayoutDashboard,
  Users,
  HandCoins,
  CreditCard,
  Users2,
  Wallet,
  Settings,
  TrendingUp,
  HelpCircle,
  Calculator,
  Verified
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation" // ← Changement ici
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar"

const menuItems = [
  { title: "Tableau de bord", url: "/Tableau-bord/dashboard", icon: LayoutDashboard },
  { title: "Membres", url: "/Tableau-bord/membres", icon: Users },
  { title: "Cotisations", url: "/Tableau-bord/cotisations", icon: HandCoins },
  { title: "Prêts", url: "/Tableau-bord/prets", icon: CreditCard },
  { title: "Assemblées", url: "/Tableau-bord/assemblees", icon: Users2 },
  { title: "Comptabilité", url: "/Tableau-bord/comptabilite", icon: Wallet },
  { title: "Analyse des risques", url: "/Tableau-bord/analyse-risques", icon: TrendingUp },
  { title: "Support & Audit", url: "/Tableau-bord/support-audit", icon: HelpCircle },
  { title: "Caisse", url: "/Tableau-bord/caisse", icon: Calculator },
  { title: "Paramètres", url: "/Tableau-bord/parametres", icon: Settings },
  { title: "KYC", url: "/Tableau-bord/kyc", icon: Verified }, // ← URL mise à jour
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar?.() ?? { state: "expanded", toggleSidebar: () => {} }
  const pathname = usePathname() // ← usePathname au lieu de useRouter
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Fermer la sidebar mobile lors du changement de route
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])
  
  const collapsed = state === "collapsed"
  // Amélioration de la détection d'URL active
  const isActive = (path: string) => {
    if (path === "/Tableau-bord/kyc") {
      return pathname?.startsWith("/Tableau-bord/kyc")
    }
    return pathname === path
  }
  
  // Le reste de votre code sidebar reste identique...
  const handleToggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      toggleSidebar()
    }
  }

  return (
    <>
      {/* Votre JSX existant pour la sidebar... */}
      <button
        onClick={handleToggle}
        style={{ backgroundColor: '#f59e42ff' }}
        className={`
          fixed top-6 left-6 z-50 
          w-8 h-8
          border border-white
          rounded-lg 
          shadow-sm hover:shadow-md 
          transition-all duration-200 ease-out
          hover:bg-gray-50 dark:hover:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          flex items-center justify-center
        `}
        aria-label={isMobile ? "Toggle menu" : "Toggle sidebar"}
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <div 
            className={`
              w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full 
              transition-all duration-300 ease-out origin-center
              ${isOpen && isMobile ? 'rotate-45 translate-y-1.5' : ''}
            `}
          />
          <div 
            className={`
              w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full 
              transition-all duration-300 ease-out
              ${isOpen && isMobile ? 'opacity-0 scale-0' : ''}
            `}
          />
          <div 
            className={`
              w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full 
              transition-all duration-300 ease-out origin-center
              ${isOpen && isMobile ? '-rotate-45 -translate-y-1.5' : ''}
            `}
          />
        </div>
      </button>
      
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <Sidebar
        className={`
          transition-all duration-300 ease-out z-40
          ${isMobile 
            ? `fixed top-0 left-0 h-full w-64 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : `${collapsed ? "w-16" : "w-64"}`
          }
        `}
        style={{
          backgroundColor: '#2c1810',
          color: '#e5d4c7'
        }}
        collapsible={isMobile ? "none" : "icon"}
      >
        <SidebarHeader 
          className="p-6 border-b"
          style={{ 
            backgroundColor: '#2c1810', 
            borderColor: '#3d2318' 
          }}
        >
          <div className="ms-12">
            {(!collapsed || isMobile) && (
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#e5d4c7' }}>
                  MoneyVibes
                </h2>
              </div>
            )}
          </div>
        </SidebarHeader>
        
        <SidebarContent 
          className="px-3 py-4"
          style={{ backgroundColor: '#2c1810' }}
        >
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="w-full p-0 h-auto"
                    >
                      <Link
                        href={item.url}
                        className={`
                          flex items-center gap-3 px-3 py-3 rounded-lg
                          transition-all duration-200 ease-out
                          ${collapsed && !isMobile ? 'justify-center' : ''}
                          ${isActive(item.url) 
                            ? 'font-semibold' 
                            : 'hover:bg-opacity-80'
                          }
                        `}
                        style={{
                          color: isActive(item.url) ? '#ffffff' : '#e5d4c7',
                          backgroundColor: isActive(item.url) ? '#f59e42' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(item.url)) {
                            e.currentTarget.style.backgroundColor = '#3d2318'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.url)) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        <item.icon
                          className="h-5 w-5 flex-shrink-0"
                          style={{
                            color: isActive(item.url) ? '#ffffff' : '#e5d4c7'
                          }}
                        />
                        {(!collapsed || isMobile) && (
                          <span className="text-sm truncate">
                            {item.title}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}