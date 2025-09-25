 "use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import { Badge} from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Pagination } from "../pagination";
import { mockTransactions } from "@/src/types/tontine";
import { CreditCard, Download, Eye } from "lucide-react";
 
 export default function TransactionsSection  () {
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('tous');
  const [statusFilter, setStatusFilter] = useState('tous');
  const itemsPerPage = 10;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesType = typeFilter === 'tous' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'tous' || transaction.statut === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getTypeIcon = (type: string) => {
    return type === 'cotisation' ? 
      <CreditCard className="h-4 w-4 text-green-600" /> : 
      <Download className="h-4 w-4 text-blue-600" />;
  };

  const getStatutBadge = (statut: string) => {
    const variants = {
      'validee': 'default',
      'en_attente': 'secondary',
      'echouee': 'destructive'
    };
    
    return (
      <Badge variant={variants[statut] || 'secondary'}>
        {statut.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les types</SelectItem>
                <SelectItem value="cotisation">Cotisations</SelectItem>
                <SelectItem value="collection">Collections</SelectItem>
                <SelectItem value="echange">Échanges</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="validee">Validée</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="echouee">Échouée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Historique des transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique complet des transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Participant</th>
                  <th className="text-left p-4">Montant</th>
                  <th className="text-left p-4">Commission</th>
                  <th className="text-left p-4">Statut</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {transaction.participantNom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{transaction.participantNom}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={transaction.montant > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.montant > 0 ? '+' : ''}{transaction.montant.toLocaleString()} XOF
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {transaction.commission > 0 ? `${transaction.commission.toLocaleString()} XOF` : '-'}
                    </td>
                    <td className="p-4">
                      {getStatutBadge(transaction.statut)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTransactions.length}
            itemsPerPage={itemsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};
