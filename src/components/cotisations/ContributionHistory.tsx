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
  FileText,
  Phone,
  Calendar,
  DollarSign,
  PhoneCall
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

  // Fonction pour filtrer par mois
  const filterByMonth = (contribution: Contribution, filter: string): boolean => {
    const contributionDate = new Date(contribution.scheduledDate);
    const now = new Date();

    switch (filter) {
      case 'ce_mois':
        return contributionDate.getMonth() === now.getMonth() &&
          contributionDate.getFullYear() === now.getFullYear();
      case 'mois_dernier':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return contributionDate.getMonth() === lastMonth.getMonth() &&
          contributionDate.getFullYear() === lastMonth.getFullYear();
      case 'tous':
      default:
        return true;
    }
  };

  // Export Excel
  const exportToExcel = () => {
    const csvContent = [
      ['Membre', 'Téléphone', 'Montant (XOF)', 'Date Prévue', 'Date Payée', 'Statut'].join(','),
      ...filteredContributions.map(contrib => [
        contrib.member.name,
        contrib.member.phone,
        contrib.amount,
        contrib.scheduledDate,
        contrib.paidDate || '-',
        contrib.status === 'payé' ? 'Payé' :
          contrib.status === 'en_attente' ? 'En attente' : 'En retard'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `cotisations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Historique des Cotisations</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .status-paid { color: green; font-weight: bold; }
            .status-pending { color: orange; font-weight: bold; }
            .status-late { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Historique des Cotisations</h1>
          <p>Généré le: ${new Date().toLocaleDateString('fr-FR')}</p>
          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Téléphone</th>
                <th>Montant (XOF)</th>
                <th>Date Prévue</th>
                <th>Date Payée</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredContributions.map(contrib => `
                <tr>
                  <td>${contrib.member.name}</td>
                  <td>${contrib.member.phone}</td>
                  <td>${formatCurrency(contrib.amount)}</td>
                  <td>${formatDate(contrib.scheduledDate)}</td>
                  <td>${contrib.paidDate ? formatDate(contrib.paidDate) : '-'}</td>
                  <td class="status-${contrib.status === 'payé' ? 'paid' : contrib.status === 'en_attente' ? 'pending' : 'late'}">
                    ${contrib.status === 'payé' ? 'Payé' : contrib.status === 'en_attente' ? 'En attente' : 'En retard'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleExportData = (format: 'excel' | 'pdf') => {
    if (format === 'excel') {
      exportToExcel();
    } else {
      exportToPDF();
    }
  };

  const filteredContributions = contributions.filter(contrib => {
    if (statusFilter !== 'tous' && contrib.status !== statusFilter) {
      return false;
    }
    return filterByMonth(contrib, monthFilter);
  });

  // Composant Card pour mobile
  const MobileContributionCard = ({ contribution }: { contribution: Contribution }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className='flex justify-end mb-2'>

          {getStatusBadge(contribution.status)}
        </div>

        {/* Header avec avatar et nom */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={contribution.member.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {getInitials(contribution.member.name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-900 text-base">
              {contribution.member.name}
            </h3>

          </div>
        </div>

        {/* Informations de cotisation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneCall className="h-4 w-4" />
              <span>Phone</span>
            </div>
            <span className="font-semibold text-gray-900">
              {contribution.member.phone}

            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>Montant</span>
            </div>
            <span className="font-semibold text-gray-900">
              {formatCurrency(contribution.amount)} XOF
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Date prévue</span>
            </div>
            <span className="text-sm text-gray-700">
              {formatDate(contribution.scheduledDate)}
            </span>
          </div>

          {contribution.paidDate && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4" />
                <span>Date payée</span>
              </div>
              <span className="text-sm text-gray-700">
                {formatDate(contribution.paidDate)}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
          {contribution.status !== 'payé' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleMarkAsPaid(contribution)}
              className="h-8 px-3 text-green-600 border-green-300 hover:bg-green-50 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Marquer payé
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-blue-600 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(contribution.id)}
            className="h-8 px-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          {/* Titre */}
          <CardTitle className="text-lg font-semibold text-gray-900">
            Historique des cotisations
          </CardTitle>

          {/* Filtres et boutons d'export */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px] h-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                <SelectTrigger className="w-full sm:w-[140px] h-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ce_mois">Ce mois</SelectItem>
                  <SelectItem value="mois_dernier">Mois dernier</SelectItem>
                  <SelectItem value="tous">Tous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Boutons d'export */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportData('excel')}
                className="flex-1 sm:flex-none h-10 px-4 bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 rounded-lg font-medium transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportData('pdf')}
                className="flex-1 sm:flex-none h-10 px-4 bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 rounded-lg font-medium transition-colors duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
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
                      {formatCurrency(contribution.amount)} XOF
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
          </div>
        </div>

        {/* Vue Mobile/Tablet - Cards */}
        <div className="block lg:hidden">
          {filteredContributions.map((contribution) => (
            <MobileContributionCard
              key={contribution.id}
              contribution={contribution}
            />
          ))}
        </div>

        {filteredContributions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aucune cotisation trouvée</p>
            <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}