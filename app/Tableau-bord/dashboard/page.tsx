"use client"

import { CotisationsChart } from "@/src/components/dashboard/CotisationsChart"
import { Notifications } from "@/src/components/dashboard/Notifications"
import { PretsChart } from "@/src/components/dashboard/PretsChart"
import { StatsGrid } from "@/src/components/dashboard/StatsCard"
import { PageWithHeader } from "@/src/components/PageWithHeader"
import { DashboardData, NotificationData } from "@/src/types/dashboard"
import { useEffect, useState, useMemo } from "react"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  // Utilisation d'useMemo pour éviter la recréation de mockData à chaque rendu
  const mockData: DashboardData = useMemo(() => ({
    stats: [
      {
        id: "1",
        title: "Membres actifs",
        value: 247,
        subtitle: "↗ +12 ce mois",
        icon: "users",
        trend: "up",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50"
      },
      {
        id: "2",
        title: "Total cotisé",
        value: "2,450,000 F",
        subtitle: "↗ +8.5% ce mois",
        icon: "dollar",
        trend: "up",
        iconColor: "text-green-600",
        iconBg: "bg-green-50"
      },
      {
        id: "3",
        title: "Solde de caisse",
        value: "890,500 F",
        subtitle: "— Stable",
        icon: "wallet",
        trend: "neutral",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-50"
      },
      {
        id: "4",
        title: "Prêts en cours",
        value: 43,
        subtitle: "⚠ 5 en retard",
        icon: "credit",
        trend: "down",
        iconColor: "text-yellow-600",
        iconBg: "bg-yellow-50"
      }
    ],
    cotisations: [
      { month: "Jan", value: 175000, date: "2025-01" },
      { month: "Fév", value: 185000, date: "2025-02" },
      { month: "Mar", value: 205000, date: "2025-03" },
      { month: "Avr", value: 195000, date: "2025-04" },
      { month: "Mai", value: 220000, date: "2025-05" },
      { month: "Jun", value: 235000, date: "2025-06" },
      { month: "Jul", value: 240000, date: "2025-07" },
      { month: "Aoû", value: 245000, date: "2025-08" },
      { month: "Sep", value: 250000, date: "2025-09" },
      { month: "Oct", value: 260000, date: "2025-10" },
      { month: "Nov", value: 255000, date: "2025-11" },
      { month: "Déc", value: 275000, date: "2025-12" }
    ],
    pretsStatus: [
      { name: "Remboursés", value: 65, color: "#22c55e", count: 28 },
      { name: "En cours", value: 23, color: "#f97316", count: 10 },
      { name: "En retard", value: 12, color: "#ef4444", count: 5 }
    ],
    notifications: [
      {
        id: "1",
        type: "error",
        title: "Retards de remboursement",
        message: "5 membres ont des retards de paiement supérieurs à 30 jours",
        action: "Voir les détails",
        actionUrl: "/prets/retards",
        createdAt: "2025-09-05T10:30:00Z",
        isRead: false
      },
      {
        id: "2",
        type: "info",
        title: "Assemblée générale",
        message: "Prochaine assemblée prévue le 15 janvier 2025",
        action: "Préparer l'assemblée",
        actionUrl: "/assemblees/prepare",
        createdAt: "2025-09-04T14:20:00Z",
        isRead: false
      },
      {
        id: "3",
        type: "warning",
        title: "Cotisations en attente",
        message: "12 membres n'ont pas encore cotisé ce mois",
        action: "Envoyer des rappels",
        actionUrl: "/cotisations/rappels",
        createdAt: "2025-09-03T09:15:00Z",
        isRead: true
      }
    ],
    pagination: {
      currentPage: 5,
      totalPages: 14,
      totalItems: 140
    }
  }), [])

  // Simulation du chargement des données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      setDashboardData(mockData)
      setLoading(false)
    }

    loadData()
  }, [mockData])

  const handleNotificationAction = (notification: NotificationData) => {
    console.log("Notification action:", notification)
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  return (
    <PageWithHeader
      title="Tableau de bord"
      description="Vue d'ensemble de votre tontine"
    >
      <div className="flex-1 w-full bg-gray-50/50 p-6">
        {/* Grille des statistiques */}
        <div className="mb-8">
          <StatsGrid 
            data={dashboardData?.stats || []} 
            loading={loading}
            className="mb-8"
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CotisationsChart
            data={dashboardData?.cotisations || []}
            loading={loading}
            className="h-fit"
          />
          
          <PretsChart
            data={dashboardData?.pretsStatus || []}
            loading={loading}
            className="h-fit"
          />
        </div>

        {/* Section des notifications */}
        <div className="mb-8">
          <Notifications
            data={dashboardData?.notifications || []}
            loading={loading}
            onAction={handleNotificationAction}
          />
        </div>

        {/* Pagination */}
        {dashboardData && (
          <div className="flex items-center justify-center gap-4 py-6">
            <button
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
              disabled={dashboardData.pagination.currentPage === 1}
            >
              Précédent
            </button>
            
            <span className="text-sm text-gray-600">
              {dashboardData.pagination.currentPage} / {dashboardData.pagination.totalPages}
            </span>
            
            <button
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
              disabled={dashboardData.pagination.currentPage === dashboardData.pagination.totalPages}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </PageWithHeader>
  )
}