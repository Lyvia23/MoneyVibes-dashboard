"use client"
import { Users, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import { StatsCard } from "../StatsCard"

// Types pour les données statistiques
export interface DonneesStatistiques {
  membresRisque: number
  retardsPaiement: number
  pretsDefaut: number
  scoreMoyen: number
}

interface StatistiquesRisquesProps {
  donnees?: DonneesStatistiques
}

export function StatistiquesRisques({ 
  donnees = {
    membresRisque: 12,
    retardsPaiement: 8,
    pretsDefaut: 3,
    scoreMoyen: 73
  }
}: StatistiquesRisquesProps) {
  const statistiques = [
    {
      label: "Membres à risque",
      value: donnees.membresRisque,
      icon: Users,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    },
    {
      label: "Retards de paiement",
      value: donnees.retardsPaiement,
      icon: Clock,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100"
    },
    {
      label: "Prêts en défaut",
      value: donnees.pretsDefaut,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    },
    {
      label: "Score moyen",
      value: `${donnees.scoreMoyen}%`,
      icon: TrendingUp,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statistiques.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  )
}