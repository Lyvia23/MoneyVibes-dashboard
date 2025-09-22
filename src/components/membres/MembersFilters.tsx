"use client"
import { useState } from "react"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Calendar } from "@/src/components/ui/calendar"
import { CalendarIcon, Filter, Search, X } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export interface FilterValues {
  search: string
  accountStatus: string
  accountType: string
  kycStatus: string
  sortBy: string
  dateFrom?: Date
  dateTo?: Date
  walletMin: string
  walletMax: string
}

interface MembersFiltersProps {
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void
  className?: string
}

export function MembersFilters({
  filters,
  onFiltersChange,
  className
}: MembersFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateFromOpen, setDateFromOpen] = useState(false)
  const [dateToOpen, setDateToOpen] = useState(false)

  const updateFilter = (key: keyof FilterValues, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      search: "",
      accountStatus: "all",
      accountType: "all", 
      kycStatus: "all",
      sortBy: "name",
      dateFrom: undefined,
      dateTo: undefined,
      walletMin: "",
      walletMax: ""
    })
    setShowAdvancedFilters(false)
  }

  const hasActiveFilters = () => {
    return filters.search !== "" ||
           filters.accountStatus !== "all" ||
           filters.accountType !== "all" ||
           filters.kycStatus !== "all" ||
           filters.dateFrom ||
           filters.dateTo ||
           filters.walletMin !== "" ||
           filters.walletMax !== ""
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Ligne principale avec recherche et boutons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Recherche */}
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 pr-4 h-10 w-full"
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center gap-2">
          <Button
            variant={showAdvancedFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2  bg-[#f59e42] text-white hover:bg-[#f59e42] hover:opacity-90"
          >
            <Filter className="h-4 w-4" />
            Filtres avancés
          </Button>
          
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
      </div>

      {/* Filtres de base */}
      <div className="flex bg-white flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Statut compte */}
        <Select 
          value={filters.accountStatus} 
          onValueChange={(value) => updateFilter("accountStatus", value)}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-9 border border-gray-200">
            <SelectValue placeholder="Statut compte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="suspended">Suspendu</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
          </SelectContent>
        </Select>

        {/* Type de compte */}
        <Select 
          value={filters.accountType} 
          onValueChange={(value) => updateFilter("accountType", value)}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-9 border border-gray-200">
            <SelectValue placeholder="Type compte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="independent">Indépendant</SelectItem>
            <SelectItem value="microfinance">Microfinance</SelectItem>
          </SelectContent>
        </Select>

        {/* Statut KYC */}
        <Select 
          value={filters.kycStatus} 
          onValueChange={(value) => updateFilter("kycStatus", value)}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-9 border border-gray-200">
            <SelectValue placeholder="Statut KYC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous KYC</SelectItem>
            <SelectItem value="validated">Validé</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>

        {/* Tri */}
        <Select 
          value={filters.sortBy} 
          onValueChange={(value) => updateFilter("sortBy", value)}
        >
          <SelectTrigger className="w-full sm:w-[140px] h-9 border border-gray-200">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom</SelectItem>
            <SelectItem value="joinDate">Date d'adhésion</SelectItem>
            <SelectItem value="contributions">Cotisations</SelectItem>
            <SelectItem value="wallet">Solde wallet</SelectItem>
            <SelectItem value="status">Statut</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <div className="border-t pt-4 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
            {/* Plage de dates d'inscription */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Date d'inscription
              </label>
              <div className="flex gap-2">
                <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start text-left font-normal h-8",
                        !filters.dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3 bg-white" />
                      {filters.dateFrom ? (
                        format(filters.dateFrom, "dd/MM/yyyy", { locale: fr })
                      ) : (
                        "Du"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date) => {
                        updateFilter("dateFrom", date)
                        setDateFromOpen(false)
                      }}
                      locale={fr}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start text-left font-normal h-8",
                        !filters.dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {filters.dateTo ? (
                        format(filters.dateTo, "dd/MM/yyyy", { locale: fr })
                      ) : (
                        "Au"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date) => {
                        updateFilter("dateTo", date)
                        setDateToOpen(false)
                      }}
                      locale={fr}
                      disabled={(date) => filters.dateFrom ? date < filters.dateFrom : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Montant wallet minimum */}
            <div className="space-y-2 ">
              <label className="text-xs font-medium text-muted-foreground">
                Solde wallet min (XOF)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={filters.walletMin}
                onChange={(e) => updateFilter("walletMin", e.target.value)}
                className="h-8 border border-gray-200"
              />
            </div>

            {/* Montant wallet maximum */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Solde wallet max (XOF)
              </label>
              <Input
                type="number"
                placeholder="1000000"
                value={filters.walletMax}
                onChange={(e) => updateFilter("walletMax", e.target.value)}
                className="h-8 border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Indicateur de filtres actifs */}
      {hasActiveFilters() && (
        <div className="text-xs text-muted-foreground">
          {(() => {
            let activeCount = 0
            if (filters.search !== "") activeCount++
            if (filters.accountStatus !== "all") activeCount++
            if (filters.accountType !== "all") activeCount++
            if (filters.kycStatus !== "all") activeCount++
            if (filters.dateFrom || filters.dateTo) activeCount++
            if (filters.walletMin !== "" || filters.walletMax !== "") activeCount++
            
            return `${activeCount} filtre(s) actif(s)`
          })()}
        </div>
      )}
    </div>
  )
}