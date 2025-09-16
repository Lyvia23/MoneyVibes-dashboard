// components/cotisations/ContributionHistory.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  Edit, 
  Trash2, 
  Check, 
  Download,
  FileText
} from 'lucide-react';
import { Contribution } from '@/app/Tableau-bord/cotisations/page';

interface ContributionHistoryProps {
  contributions: Contribution[];
  onUpdate: (id: string, updates: Partial<Contribution>) => void;
  onDelete: (id: string) => void;
}

export function ContributionHistory({ 
  contributions, 
  onUpdate, 
  onDelete 
}: ContributionHistoryProps) {
  const [statusFilter, setStatusFilter] = React.useState('tous');
  const [monthFilter, setMonthFilter] = React.useState('ce_mois');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const getStatusBadge = (status: Contribution['status']) => {
    const styles = {
      'payé': 'bg-green-100 text-green-800 border-green-200',
      'en_attente': 'bg-orange-100 text-orange-800 border-orange-200',
      'en_retard': 'bg-red-100 text-red-800 border-red-200'
    };

    const labels = {
      'payé': 'Payé',
      'en_attente': 'En attente',
      'en_retard': 'En retard'
    };

    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleMarkAsPaid = (contribution: Contribution) => {
    onUpdate(contribution.id, {
      status: 'payé',
      paidDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleExportData = (format: 'excel' | 'pdf') => {
    // TODO: Implémenter l'export
    console.log(`Export en ${format}`);
  };

  const filteredContributions = contributions.filter(contrib => {
    if (statusFilter !== 'tous' && contrib.status !== statusFilter) {
      return false;
    }
    // TODO: Ajouter le filtre par mois
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          {/* Titre */}
          <CardTitle className="text-lg font-semibold text-gray-900">
            Historique des cotisations
          </CardTitle>
          
          {/* Filtres et boutons d'export */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filtres à gauche */}
            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] h-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="payé">Payé</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="en_retard">En retard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-[140px] h-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ce_mois">Ce mois</SelectItem>
                  <SelectItem value="mois_dernier">Mois dernier</SelectItem>
                  <SelectItem value="tous">Tous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Boutons d'export à droite */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData('excel')}
                className="h-10 px-4 bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 rounded-lg font-medium transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData('pdf')}
                className="h-10 px-4 bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 rounded-lg font-medium transition-colors duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">MEMBRE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">MONTANT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">DATE PRÉVUE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">DATE PAYÉE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">STATUT</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredContributions.map((contribution) => (
                <tr key={contribution.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contribution.member.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                          {getInitials(contribution.member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {contribution.member.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {contribution.member.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {formatCurrency(contribution.amount)} FCFA
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {formatDate(contribution.scheduledDate)}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {contribution.paidDate ? formatDate(contribution.paidDate) : '-'}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(contribution.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {contribution.status !== 'payé' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsPaid(contribution)}
                          className="h-8 px-3 text-green-600 border-green-300 hover:bg-green-50 rounded-md font-medium"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Marquer payé
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(contribution.id)}
                        className="h-8 px-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredContributions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Aucune cotisation trouvée</p>
              <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}