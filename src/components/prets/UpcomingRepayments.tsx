import { Calendar, AlertCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface UpcomingRepayment {
  id: string
  memberName: string
  amount: string
  dueDate: string
  status: 'upcoming' | 'overdue' | 'today'
}

interface UpcomingRepaymentsProps {
  repayments: UpcomingRepayment[]
}

export function UpcomingRepayments({ repayments }: UpcomingRepaymentsProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'overdue':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100 border-red-200',
          icon: AlertCircle,
          badge: { variant: 'destructive' as const, text: 'En retard' }
        }
      case 'today':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-100 border-orange-200',
          icon: Clock,
          badge: { variant: 'secondary' as const, text: "Aujourd'hui" }
        }
      default:
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100 border-blue-200',
          icon: Calendar,
          badge: { variant: 'outline' as const, text: 'À venir' }
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Échéances à venir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {repayments.map((repayment) => {
          const config = getStatusConfig(repayment.status)
          const IconComponent = config.icon
          
          return (
            <div 
              key={repayment.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${config.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-white`}>
                  <IconComponent className={`h-4 w-4 ${config.color}`} />
                </div>
                <div>
                  <p className="font-medium">{repayment.memberName}</p>
                  <p className="text-sm text-muted-foreground">{repayment.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{repayment.dueDate}</p>
                <Badge variant={config.badge.variant} className="text-xs">
                  {config.badge.text}
                </Badge>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}