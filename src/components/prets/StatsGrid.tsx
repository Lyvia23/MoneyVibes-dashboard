import { CreditCard, DollarSign, Clock, AlertTriangle } from "lucide-react"
import { StatsCard } from "../StatsCard"

interface StatsData {
  activeLoans: number
  totalAmount: string
  pending: number
  overdue: number
}

interface StatsGridProps {
  data: StatsData
}

export function StatsGrid({ data }: StatsGridProps) {
  const statsConfig = [
    {
      label: "Prêts actifs",
      value: data.activeLoans,
      icon: CreditCard,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      label: "Montant total",
      value: data.totalAmount,
      icon: DollarSign,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      label: "En attente",
      value: data.pending,
      icon: Clock,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100"
    },
    {
      label: "En retard",
      value: data.overdue,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
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