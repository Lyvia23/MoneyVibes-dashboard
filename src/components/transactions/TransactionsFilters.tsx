"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";

export default function TransactionsFilters() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres Avancés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
          <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="depot">Dépôt</SelectItem>
              <SelectItem value="retrait">Retrait</SelectItem>
              <SelectItem value="cotisation">Cotisation</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="success">Réussie</SelectItem>
              <SelectItem value="failed">Échouée</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.method} onValueChange={(value) => setFilters({ ...filters, method: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Méthode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="mobile-money">Mobile Money</SelectItem>
              <SelectItem value="card">Carte</SelectItem>
              <SelectItem value="wallet">Wallet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Montant minimum (XOF)"
            type="number"
            value={filters.minAmount}
            onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
          />
          <Input
            placeholder="Montant maximum (XOF)"
            type="number"
            value={filters.maxAmount}
            onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
          />
          <Button
            variant="outline"
            onClick={() => setFilters({
              type: '',
              status: '',
              method: '',
              operator: '',
              minAmount: '',
              maxAmount: '',
              search: '',
              dateRange: null
            })}
          >
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}