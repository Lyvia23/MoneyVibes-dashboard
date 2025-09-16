"use client"
import { Card, CardContent } from "@/src/components/ui/card"
import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface StatsData {
  total: number
  active: number
  inactive: number
  newThisMonth: number
}

interface MembersStatsCardsProps {
  stats: StatsData
  className?: string
}

export function MembersStatsCards({ stats, className }: MembersStatsCardsProps) {
  const statsConfig = [
    {
      title: "Total membres",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Actifs",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Inactifs",
      value: stats.inactive,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Nouveaux ce mois",
      value: stats.newThisMonth,
      icon: UserPlus,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  return (
    <div className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className={cn("border shadow-sm")}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={cn("text-2xl font-bold", stat.color)}>
                    {stat.value}
                  </p>
                </div>
                <Icon className={cn("h-8 w-8", stat.color)} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}