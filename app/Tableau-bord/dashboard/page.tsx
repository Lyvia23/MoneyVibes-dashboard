"use client"

import { ActionsRapides } from "@/src/components/dashboard/ActionsRapides"
import { CotisationsChart } from "@/src/components/dashboard/CotisationsChart"
import { InscriptionsChart } from "@/src/components/dashboard/InscriptionsChart"
import { Notifications } from "@/src/components/dashboard/Notifications"
import { PretsChart } from "@/src/components/dashboard/PretsChart"
import { StatsGrid } from "@/src/components/dashboard/StatsCard"
import { TontineTypesChart } from "@/src/components/dashboard/TontineTypesChart"
import { TopUsersChart } from "@/src/components/dashboard/TopUsersChart"
import { TransactionsChart } from "@/src/components/dashboard/TransactionsChart"
import { useSetPageInfo } from "@/src/Context/pageContext"
import { DashboardData, NotificationData } from "@/src/types/dashboard"
import { useEffect, useState, useMemo } from "react"


export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  
  // États pour la pagination des notifications
  const [currentPage, setCurrentPage] = useState(1)

  // Données mock mises à jour
  const mockData: DashboardData = useMemo(() => ({
    stats: [
      {
        id: "1",
        title: "Membres actifs",
        value: 247,
        subtitle: "+12 ce mois",
        icon: "users",
        trend: "up",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50"
      },
      {
        id: "2",
        title: "Total cotisé",
        value: "2,450,000 F",
        subtitle: "+8.5% ce mois",
        icon: "dollar",
        trend: "up",
        iconColor: "text-green-600",
        iconBg: "bg-green-50"
      },
      {
        id: "3",
        title: "Solde de caisse",
        value: "890,500 F",
        subtitle: "Stable",
        icon: "wallet",
        trend: "neutral",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-50"
      },
      {
        id: "4",
        title: "Prêts en cours",
        value: 43,
        subtitle: "5 en retard",
        icon: "credit",
        trend: "down",
        iconColor: "text-yellow-600",
        iconBg: "bg-yellow-50"
      },
      {
        id: "5",
        title: "Fonds en Circulation",
        value: "2.4M XOF",
        subtitle: "+10% ce mois",
        icon: "circleDollar",
        trend: "up",
        iconColor: "text-green-600",
        iconBg: "bg-green-50"
      },
      {
        id: "6",
        title: "Tontines Actives",
        value: "1,234",
        subtitle: "+5 ce mois",
        icon: "wallet",
        trend: "up",
        iconColor: "text-yellow-600",
        iconBg: "bg-yellow-50"
      },
      {
        id: "7",
        title: "Revenus Générés",
        value: "45K XOF",
        subtitle: "Stable",
        icon: "trendingUp",
        trend: "neutral",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50"
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
      },
      {
        id: "4",
        type: "info",
        title: "Tontines en défaut de paiement",
        message: "12 membres n'ont pas encore cotisé ce mois",
        action: "Envoyer des rappels",
        actionUrl: "/cotisations/rappels",
        createdAt: "2025-09-03T09:15:00Z",
        isRead: true
      },
      {
        id: "5",
        type: "error",
        title: "Problèmes techniques détectés",
        message: "12 membres n'ont pas encore cotisé ce mois",
        action: "Envoyer des rappels",
        actionUrl: "/cotisations/rappels",
        createdAt: "2025-09-03T09:15:00Z",
        isRead: true
      },
      {
        id: "6",
        type: "info",
        title: "Comptes nécessitant validation KYC",
        message: "12 membres n'ont pas encore validé leur KYC",
        action: "Envoyer des rappels",
        actionUrl: "/kyc/rappels",
        createdAt: "2025-09-03T09:15:00Z",
        isRead: true
      },
      {
        id: "7",
        type: "warning",
        title: "Nouveaux signalements utilisateurs",
        message: "12 membres ont signalé des problèmes ce mois",
        action: "Voir les détails",
        actionUrl: "/signalements/details",
        createdAt: "2025-09-03T09:15:00Z",
        isRead: true
      },
    ],

    // Données étendues pour les inscriptions (plusieurs mois et années)
    inscriptions: [
      // 2024
      { month: "Jan", inscriptions: 38, date: "2024-01" },
      { month: "Fév", inscriptions: 42, date: "2024-02" },
      { month: "Mar", inscriptions: 35, date: "2024-03" },
      { month: "Avr", inscriptions: 48, date: "2024-04" },
      { month: "Mai", inscriptions: 55, date: "2024-05" },
      { month: "Jun", inscriptions: 41, date: "2024-06" },
      { month: "Jul", inscriptions: 52, date: "2024-07" },
      { month: "Aoû", inscriptions: 59, date: "2024-08" },
      { month: "Sep", inscriptions: 67, date: "2024-09" },
      { month: "Oct", inscriptions: 61, date: "2024-10" },
      { month: "Nov", inscriptions: 58, date: "2024-11" },
      { month: "Déc", inscriptions: 72, date: "2024-12" },
      
      // 2025
      { month: "Jan", inscriptions: 45, date: "2025-01" },
      { month: "Fév", inscriptions: 52, date: "2025-02" },
      { month: "Mar", inscriptions: 48, date: "2025-03" },
      { month: "Avr", inscriptions: 63, date: "2025-04" },
      { month: "Mai", inscriptions: 71, date: "2025-05" },
      { month: "Jun", inscriptions: 58, date: "2025-06" },
      { month: "Jul", inscriptions: 67, date: "2025-07" },
      { month: "Aoû", inscriptions: 74, date: "2025-08" },
      { month: "Sep", inscriptions: 82, date: "2025-09" },
    ],

    // Les types de tontines sont maintenant gérés directement dans le composant
    tontineTypes: [], // Non utilisé, données dans le composant

    // Données étendues pour les transactions (plusieurs mois)
    weeklyTransactions: [
      // Août 2025
      { week: "S1", volume: 2150000, date: "2025-08-01" },
      { week: "S2", volume: 2320000, date: "2025-08-08" },
      { week: "S3", volume: 2580000, date: "2025-08-15" },
      { week: "S4", volume: 2410000, date: "2025-08-22" },
      { week: "S5", volume: 2690000, date: "2025-08-29" },
      
      // Septembre 2025
      { week: "S1", volume: 2450000, date: "2025-09-01" },
      { week: "S2", volume: 2680000, date: "2025-09-08" },
      { week: "S3", volume: 3120000, date: "2025-09-15" },
      { week: "S4", volume: 2890000, date: "2025-09-22" },
      { week: "S5", volume: 3350000, date: "2025-09-29" },
      
      // Octobre 2025
      { week: "S1", volume: 3100000, date: "2025-10-01" },
      { week: "S2", volume: 2950000, date: "2025-10-08" },
      { week: "S3", volume: 3450000, date: "2025-10-15" },
      { week: "S4", volume: 3200000, date: "2025-10-22" },
    ],

    // Les utilisateurs top sont maintenant gérés directement dans le composant
    topUsers: [] // Non utilisé, données dans le composant
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
      // Navigation vers l'URL de l'action
      window.location.href = notification.actionUrl
    }
  }
  useSetPageInfo({
    title: "Tableau de bord", 
    description: "Vue d'ensemble de votre tontine",
    notificationCount: 3
  })
  return (
  
      <div className="flex-1 w-full bg-gray-50/50 p-6">
        {/* Actions rapides */}
        <div className="mb-8">
          <ActionsRapides />
        </div>

        {/* Grille des statistiques */}
        <div className="mb-8">
          <StatsGrid
            data={dashboardData?.stats || []}
            loading={loading}
            className="mb-8"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
             <InscriptionsChart
            data={dashboardData?.inscriptions || []}
            loading={loading}
          />

          <TontineTypesChart
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <TransactionsChart
            data={dashboardData?.weeklyTransactions || []}
            loading={loading}
          />

          <TopUsersChart
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
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

        {/* Section des notifications avec pagination */}
        <div className="mb-8">
          <Notifications
            data={dashboardData?.notifications || []}
            loading={loading}
            onAction={handleNotificationAction}
            enablePagination={true}
            currentPage={currentPage}
            itemsPerPage={3}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
  )
}