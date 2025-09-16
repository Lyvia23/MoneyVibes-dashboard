"use client"

import { Card, CardContent } from "../ui/card"
import { 
  Users, 
  DollarSign, 
  Wallet, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { StatsCardData } from "@/src/types/dashboard"
import { cn } from "@/src/lib/utils"

const iconMap = {
  users: Users,
  dollar: DollarSign,
  wallet: Wallet,
  credit: CreditCard,
}

interface StatsCardProps {
  data: StatsCardData
  className?: string
}

export function StatsCard({ data, className }: StatsCardProps) {
  const Icon = iconMap[data.icon as keyof typeof iconMap] || Users
  
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-emerald-600" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    switch (data.trend) {
      case 'up':
        return 'text-emerald-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={cn(
            "p-3 rounded-lg",
            data.iconBg || "bg-blue-50"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              data.iconColor || "text-blue-600"
            )} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {data.title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight">
              {typeof data.value === 'number' 
                ? data.value.toLocaleString('fr-FR')
                : data.value
              }
            </h3>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          {getTrendIcon()}
          <span className={cn("text-sm font-medium", getTrendColor())}>
            {data.subtitle}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// Version pour multiple cards
interface StatsGridProps {
  data: StatsCardData[]
  loading?: boolean
  className?: string
}

export function StatsGrid({ data, loading, className }: StatsGridProps) {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="text-right space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {data.map((stat) => (
        <StatsCard key={stat.id} data={stat} />
      ))}
    </div>
  )
}