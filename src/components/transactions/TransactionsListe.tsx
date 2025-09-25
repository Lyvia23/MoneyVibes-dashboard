"user client";


import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Pagination } from "../pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { 
  CreditCard,
  Smartphone,
  Wallet,
  List,
  Grid3X3,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from 'lucide-react';
import { mockTransactions } from "@/src/types/transactions";
import { formatCurrency } from "@/src/utils";

export default function TransactionsListe() {
 const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' ou 'grid'
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    method: '',
    operator: '',
    minAmount: '',
    maxAmount: '',
    search: '',
    dateRange: null
  });
  
  const itemsPerPage = 10;

  // Filtrage des transactions
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.status && transaction.status !== filters.status) return false;
      if (filters.method && transaction.method !== filters.method) return false;
      if (filters.operator && transaction.operator !== filters.operator) return false;
      if (filters.minAmount && transaction.amount < parseInt(filters.minAmount)) return false;
      if (filters.maxAmount && transaction.amount > parseInt(filters.maxAmount)) return false;
      if (filters.search && !transaction.id.toLowerCase().includes(filters.search.toLowerCase()) && 
          !transaction.user.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      'Réussie': 'bg-green-100 text-green-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
      'Échouée': 'bg-red-100 text-red-800'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Réussie': return <CheckCircle className="h-4 w-4" />;
      case 'En attente': return <Clock className="h-4 w-4" />;
      case 'Échouée': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

    return (

        <>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2 font-semibold">ID</th>
                                        <th className="text-left p-2 font-semibold">Utilisateur</th>
                                        <th className="text-left p-2 font-semibold">Type</th>
                                        <th className="text-left p-2 font-semibold">Montant</th>
                                        <th className="text-left p-2 font-semibold">Méthode</th>
                                        <th className="text-left p-2 font-semibold">Statut</th>
                                        <th className="text-left p-2 font-semibold">Date</th>
                                        <th className="text-left p-2 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                            <td className="p-2 font-mono text-sm">{transaction.id}</td>
                                            <td className="p-2">{transaction.user}</td>
                                            <td className="p-2">
                                                <Badge variant="outline">{transaction.type}</Badge>
                                            </td>
                                            <td className="p-2 font-semibold">{formatCurrency(transaction.amount)}</td>
                                            <td className="p-2">
                                                <div className="flex items-center gap-2">
                                                    {transaction.method === 'Mobile Money' ? <Smartphone className="h-4 w-4" /> :
                                                        transaction.method === 'Carte' ? <CreditCard className="h-4 w-4" /> :
                                                            <Wallet className="h-4 w-4" />}
                                                    <span className="text-sm">{transaction.operator}</span>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <Badge className={getStatusBadge(transaction.status)}>
                                                    <div className="flex items-center gap-1">
                                                        {getStatusIcon(transaction.status)}
                                                        {transaction.status}
                                                    </div>
                                                </Badge>
                                            </td>
                                            <td className="p-2 text-sm">{transaction.date.toLocaleDateString('fr-FR')}</td>
                                            <td className="p-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                                                        <DropdownMenuItem>Télécharger reçu</DropdownMenuItem>
                                                        {transaction.status === 'En attente' && (
                                                            <DropdownMenuItem>Approuver</DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedTransactions.map((transaction) => (
                                <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="font-mono text-sm text-gray-600">{transaction.id}</span>
                                            <Badge className={getStatusBadge(transaction.status)}>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(transaction.status)}
                                                    {transaction.status}
                                                </div>
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Utilisateur</span>
                                                <span className="text-sm font-medium">{transaction.user}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Type</span>
                                                <Badge variant="outline">{transaction.type}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Montant</span>
                                                <span className="font-bold">{formatCurrency(transaction.amount)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Méthode</span>
                                                <div className="flex items-center gap-2">
                                                    {transaction.method === 'Mobile Money' ? <Smartphone className="h-4 w-4" /> :
                                                        transaction.method === 'Carte' ? <CreditCard className="h-4 w-4" /> :
                                                            <Wallet className="h-4 w-4" />}
                                                    <span className="text-sm">{transaction.operator}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Date</span>
                                                <span className="text-sm">{transaction.date.toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Voir détails</DropdownMenuItem>
                                                    <DropdownMenuItem>Télécharger reçu</DropdownMenuItem>
                                                    {transaction.status === 'En attente' && (
                                                        <DropdownMenuItem>Approuver</DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredTransactions.length}
                        itemsPerPage={itemsPerPage}
                    />
                </CardContent>
            </Card>
        </>

    );
}