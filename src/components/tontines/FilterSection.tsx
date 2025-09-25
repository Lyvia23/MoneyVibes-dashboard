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
    <div className="bg-white p-3 sm:p-4 rounded-lg border space-y-3 sm:space-y-4">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Barre de recherche - Pleine largeur sur mobile */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Rechercher
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une tontine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-10 sm:h-11  text-sm"
            />
          </div>
        </div>
        
        {/* Filtres - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Type de tontine */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Type de tontine
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className=" h-10 sm:h-11 text-sm">
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

          {/* Date début */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Date début
            </label>
            <Input
              type="date"
              placeholder="Date début"
              value={dateDebutFilter}
              onChange={(e) => setDateDebutFilter(e.target.value)}
              className=" text-black h-10 sm:h-11 text-sm"
            />
          </div>

          {/* Date fin */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Date fin
            </label>
            <Input
              type="date"
              placeholder="Date fin"
              value={dateFinFilter}
              onChange={(e) => setDateFinFilter(e.target.value)}
              className=" text-black h-10 sm:h-11 text-sm"
            />
          </div>

          {/* Vue Mode - Centré sur mobile */}
          <div className="w-full sm:w-auto sm:min-w-[140px] flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Affichage
            </label>
            <div className="flex border rounded-md h-10 sm:h-11">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2 sm:px-3 text-xs sm:text-sm h-full"
              >
                <Table2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Tableau</span>
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2 sm:px-3 text-xs sm:text-sm h-full"
              >
                <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Grille</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};