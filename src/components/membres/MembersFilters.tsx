"use client"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Search } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface MembersFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
  className?: string
}

export function MembersFilters({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  className
}: MembersFiltersProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", 
      className
    )}>
      {/* Recherche */}
      <div className="relative w-full sm:flex-1 sm:max-w-md">
        <Search className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Rechercher un membre..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-6 w-full"
        />
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Filtre par statut */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] py-6">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="inactive">Inactifs</SelectItem>
            <SelectItem value="suspended">En attente</SelectItem>
          </SelectContent>
        </Select>

        {/* Tri */}
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-full sm:w-[160px] py-6">
            <SelectValue placeholder="Nom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="joinDate">Date d\'adhésion</SelectItem>
            <SelectItem value="contributions">Cotisations</SelectItem>
            <SelectItem value="status">Statut</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}