import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  className?: string
}

export function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100",
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold">
            {value}
          </p>
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          iconBgColor
        )}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </CardContent>
    </Card>
  )
}