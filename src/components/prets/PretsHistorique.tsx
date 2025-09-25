import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Edit, Eye, Trash2, Calendar, DollarSign, Clock, TrendingUp } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface PretsHistoriqueItem {
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

interface PretsHistoriqueProps {
  loans: PretsHistoriqueItem[]
  onStatusFilter: (status: string) => void
  onViewDetails: (loanId: string) => void
  onEditLoan: (loanId: string) => void
  onDeleteLoan: (loanId: string) => void
}

export function PretsHistorique({ 
  loans, 
  onStatusFilter, 
  onViewDetails, 
  onEditLoan, 
  onDeleteLoan 
}: PretsHistoriqueProps) {
  const [statusFilter, setStatusFilter] = React.useState('all');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { variant: 'default' as const, label: 'Actif', color: 'bg-green-100 text-green-800 border-green-200' }
      case 'completed':
        return { variant: 'secondary' as const, label: 'Terminé', color: 'bg-gray-100 text-gray-800 border-gray-200' }
      case 'overdue':
        return { variant: 'destructive' as const, label: 'En retard', color: 'bg-red-100 text-red-800 border-red-200' }
      case 'cancelled':
        return { variant: 'outline' as const, label: 'Annulé', color: 'bg-orange-100 text-orange-800 border-orange-200' }
      default:
        return { variant: 'outline' as const, label: 'Inconnu', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    }
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    onStatusFilter(value);
  }

  // Filtrage des prêts
  const filteredLoans = loans.filter(loan => {
    if (statusFilter === 'all') return true;
    return loan.status === statusFilter;
  });

  // Composant Card pour mobile
  const MobileLoanCard = ({ loan }: { loan: PretsHistoriqueItem }) => {
    const statusConfig = getStatusConfig(loan.status);
    
    return (
      <Card className="mb-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <CardContent className="p-0">
          {/* Header avec avatar, nom et statut */}
          <div className="bg-gray-50/50 p-4 border-b border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm flex-shrink-0">
                  <AvatarImage src={loan.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                    {getInitials(loan.memberName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                    {loan.memberName}
                  </h3>
                  <div className="text-sm text-gray-500 font-medium">
                    {loan.category}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 mt-0.5">
                <Badge 
                  variant={statusConfig.variant}
                  className={`${statusConfig.color} border`}
                >
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          </div>

          {/* Montant principal */}
          <div className="p-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {loan.amount}
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="px-4 pb-4 space-y-3">
            {/* Durée */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-900">Durée</span>
                </div>
                <span className="text-sm font-semibold text-blue-800">
                  {loan.duration}
                </span>
              </div>
            </div>

            {/* Progression */}
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-800">
                  {loan.progressLabel}
                </span>
              </div>
              <Progress value={loan.progress} className="h-2" />
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewDetails(loan.id)}
                className="flex-1 h-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium"
                title="Voir les détails"
              >
                <Eye className="h-4 w-4 mr-2" />
                Détails
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEditLoan(loan.id)}
                className="h-9 w-9 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg"
                title="Modifier"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDeleteLoan(loan.id)}
                className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Historique des prêts
          </CardTitle>
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 h-10 bg-gray-50  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
        </div>
      </CardHeader>
      <CardContent>
        {/* Vue Desktop - Tableau */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">MEMBRE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">MONTANT</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">DURÉE</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">PROGRESSION</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">STATUT</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan, index) => {
                  const statusConfig = getStatusConfig(loan.status)

                  return (
                    <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={loan.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-sm">
                              {getInitials(loan.memberName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{loan.memberName}</p>
                            <p className="text-xs text-gray-500">{loan.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-900">{loan.amount}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{loan.duration}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">{loan.progressLabel}</span>
                          </div>
                          <Progress value={loan.progress} className="h-2" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={statusConfig.variant}
                          className={`${statusConfig.color} border`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onViewDetails(loan.id)}
                            className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onEditLoan(loan.id)}
                            className="h-8 px-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md"
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDeleteLoan(loan.id)}
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
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
        </div>

        {/* Vue Mobile/Tablet - Cards */}
        <div className="block lg:hidden">
          {filteredLoans.map((loan) => (
            <MobileLoanCard key={loan.id} loan={loan} />
          ))}
        </div>
        
        {filteredLoans.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aucun prêt trouvé</p>
            <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}