"use client";
import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  CreditCard,
  Smartphone,
  Filter,
  Search,
  Grid3X3,
  List,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';
import { StatsCard } from '@/src/components/StatsCard';
import { Button } from '@/src/components/ui/button';
import { Pagination } from '@/src/components/pagination';
import { mockAlerts, mockOperatorStats, mockTransactions, mockWalletOverview } from '@/src/types/transactions';
import StatutOperateurs from '@/src/components/transactions/StatutOperateurs';
import AlertFinancieres from '@/src/components/transactions/AlertFinancieres';
import TransactionsFilters from '@/src/components/transactions/TransactionsFilters';
import { formatCurrency } from '@/src/utils';
import TransactionsListe from '@/src/components/transactions/TransactionsListe';
import { useSetPageInfo } from '@/src/Context/pageContext';





const TransactionManagementPage = () => {
   useSetPageInfo({
     title: "Gestion des Transactions",
     description: "Vue d'ensemble et suivi des opérations",
     notificationCount: 3
   });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
   
      {/* Vue d'ensemble des portefeuilles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Fonds Système"
          value={formatCurrency(mockWalletOverview.totalFunds)}
          icon={Wallet}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          label="Fonds Disponibles"
          value={formatCurrency(mockWalletOverview.availableFunds)}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          label="Flux Entrants"
          value={formatCurrency(mockWalletOverview.dailyInflow)}
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
        <StatsCard
          label="Flux Sortants"
          value={formatCurrency(mockWalletOverview.dailyOutflow)}
          icon={TrendingDown}
          iconColor="text-red-600"
          iconBgColor="bg-red-100"
        />
      </div>

      {/* Statut des opérateurs */}
      <StatutOperateurs />
      {/* Alertes financières */}
    <AlertFinancieres/>
      {/* Filtres et recherche */}

      <TransactionsFilters />
      {/* Liste des transactions */}
      <TransactionsListe />
    
    </div>
  );
};

export default TransactionManagementPage;