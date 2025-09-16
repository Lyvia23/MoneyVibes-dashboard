import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface LoanHistoryItem {
  id: string
  memberName: string
  avatar?: string
  category: string
  amount: string
  duration: string
  progress: number
  progressLabel: string
  status: 'active' | 'completed' | 'overdue' | 'cancelled'
}

interface LoanHistoryProps {
  loans: LoanHistoryItem[]
  onStatusFilter: (status: string) => void
  onViewDetails: (loanId: string) => void
  onEditLoan: (loanId: string) => void
  onDeleteLoan: (loanId: string) => void
}

export function LoanHistory({ 
  loans, 
  onStatusFilter, 
  onViewDetails, 
  onEditLoan, 
  onDeleteLoan 
}: LoanHistoryProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { variant: 'default' as const, label: 'Actif', color: 'bg-green-100 text-green-800' }
      case 'completed':
        return { variant: 'secondary' as const, label: 'Terminé', color: 'bg-gray-100 text-gray-800' }
      case 'overdue':
        return { variant: 'destructive' as const, label: 'En retard', color: 'bg-red-100 text-red-800' }
      case 'cancelled':
        return { variant: 'outline' as const, label: 'Annulé', color: 'bg-orange-100 text-orange-800' }
      default:
        return { variant: 'outline' as const, label: 'Inconnu', color: 'bg-gray-100 text-gray-800' }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Historique des prêts</CardTitle>
        <Select onValueChange={onStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="completed">Terminés</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
            <SelectItem value="cancelled">Annulés</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-medium text-muted-foreground">MEMBRE</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">MONTANT</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">DURÉE</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">PROGRESSION</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">STATUT</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {loans.map((loan, index) => {
                const statusConfig = getStatusConfig(loan.status)

                return (
                  <tr key={loan.id} className={index !== 0 ? "border-t" : ""}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={loan.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(loan.memberName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{loan.memberName}</p>
                          <p className="text-xs text-muted-foreground">{loan.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold">{loan.amount}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-sm">{loan.duration}</p>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{loan.progressLabel}</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant={statusConfig.variant}
                        className={statusConfig.color}
                      >
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewDetails(loan.id)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEditLoan(loan.id)}
                          className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDeleteLoan(loan.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}