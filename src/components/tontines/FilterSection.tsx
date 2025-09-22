"use client"

import { Grid3X3, Search, Table2 } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export const FilterSection = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  dateDebutFilter,
  setDateDebutFilter,
  dateFinFilter,
  setDateFinFilter,
  viewMode,
  setViewMode
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  dateDebutFilter: string;
  setDateDebutFilter: (value: string) => void;
  dateFinFilter: string;
  setDateFinFilter: (value: string) => void;
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Barre de recherche */}
        <div className="lg:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une tontine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-10 border border-gray-200"
            />
          </div>
        </div>
        
        {/* Filtres */}
        <div className="flex gap-4 lg:flex-1">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de tontine
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border border-gray-200">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous types</SelectItem>
                <SelectItem value="personnel">Personnel</SelectItem>
                <SelectItem value="groupe">Groupe</SelectItem>
                <SelectItem value="rejoindre">Rejoindre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date début
            </label>
            <Input
              type="date"
              placeholder="Date début"
              value={dateDebutFilter}
              onChange={(e) => setDateDebutFilter(e.target.value)}
              className="border border-gray-200 text-black"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date fin
            </label>
            <Input
              type="date"
              placeholder="Date fin"
              value={dateFinFilter}
              onChange={(e) => setDateFinFilter(e.target.value)}
              className="border border-gray-200 text-black"
            />
          </div>

          {/* Vue Mode */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Affichage
            </label>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none flex items-center gap-1"
              >
                <Table2 className="h-4 w-4" />
                <span className="hidden sm:inline">Tableau</span>
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none flex items-center gap-1"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Grille</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
