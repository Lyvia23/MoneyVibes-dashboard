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
  Verified,
  X,
  ArrowLeftRight
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {useEffect } from "react"
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
  { title: "Tontines", url: "/Tableau-bord/tontines", icon: HandCoins },
  { title: "Membres", url: "/Tableau-bord/membres", icon: Users },
  { title: "Cotisations", url: "/Tableau-bord/cotisations", icon: CreditCard },
  { title: "Prêts", url: "/Tableau-bord/prets", icon: Wallet },
  { title: "Transactions", url: "/Tableau-bord/transactions", icon: ArrowLeftRight },
  { title: "Assemblées", url: "/Tableau-bord/assemblees", icon: Users2 },
  { title: "Comptabilité", url: "/Tableau-bord/comptabilite", icon: Calculator },
  { title: "Analyse des risques", url: "/Tableau-bord/analyse-risques", icon: TrendingUp },
  { title: "Support & Audit", url: "/Tableau-bord/support-audit", icon: HelpCircle },
  { title: "Caisse", url: "/Tableau-bord/caisse", icon: Wallet },
  { title: "Paramètres", url: "/Tableau-bord/parametres", icon: Settings },
  { title: "KYC", url: "/Tableau-bord/kyc", icon: Verified },
]

export function AppSidebar() {
  const { state, setOpenMobile, isMobile } = useSidebar?.() ?? { 
    state: "expanded", 
    setOpenMobile: () => {}, 
    isMobile: false 
  }
  const pathname = usePathname()
  
  const collapsed = state === "collapsed"
  
  // Fermer la sidebar mobile lors du changement de route
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [pathname, isMobile, setOpenMobile])
  
  // Amélioration de la détection d'URL active
  const isActive = (path: string) => {
    if (path === "/Tableau-bord/kyc") {
      return pathname?.startsWith("/Tableau-bord/kyc")
    }
    // Gestion spéciale pour les tontines (détails et création)
    if (path === "/Tableau-bord/tontines") {
      return pathname?.startsWith("/Tableau-bord/tontines")
    }
    // Gestion spéciale pour les membres
    if (path === "/Tableau-bord/membres") {
      return pathname?.startsWith("/Tableau-bord/membres")
    }
    return pathname === path
  }

  // Fonction pour gérer le clic sur un lien en mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      className="transition-all duration-300 ease-out border-r"
      style={{
        backgroundColor: '#2c1810',
        color: '#e5d4c7',
        borderColor: '#3d2318'
      }}
      collapsible="icon"
    >
      <SidebarHeader 
        className="p-6 border-b"
        style={{ 
          backgroundColor: '#2c1810', 
          borderColor: '#3d2318' 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            {!collapsed ? (
              <div className="flex items-center gap-3">
                {/* Logo MoneyVibes */}
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#f59e42' }}
                >
                  MV
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: '#e5d4c7' }}>
                    MoneyVibes
                  </h2>
                  <p className="text-xs opacity-70">Gestion financière</p>
                </div>
              </div>
            ) : (
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: '#f59e42', color: '#ffffff' }}
                title="MoneyVibes"
              >
                MV
              </div>
            )}
          </div>
          
          {/* Bouton fermer en mobile */}
          {isMobile && (
            <button
              onClick={() => setOpenMobile(false)}
              className="
                w-8 h-8 rounded-lg flex items-center justify-center
                hover:bg-gray-600/20 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-orange-500
              "
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" style={{ color: '#e5d4c7' }} />
            </button>
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
                      onClick={handleLinkClick}
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-lg
                        transition-all duration-200 ease-out
                        ${collapsed ? 'justify-center' : ''}
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
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon
                        className={`flex-shrink-0 ${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`}
                        style={{
                          color: isActive(item.url) ? '#ffffff' : '#e5d4c7'
                        }}
                      />
                      {!collapsed && (
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
  )
}