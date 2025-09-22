"use client"
import { Search, ChevronDown, Plus } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface BarreRechercheTicketsProps {
  recherche: string
  setRecherche: (value: string) => void
  statutFiltre: string
  setStatutFiltre: (value: string) => void
  optionsStatut: { value: string; label: string }[]
  onNouveauTicket?: () => void
  placeholder?: string
  afficherNouveauTicket?: boolean
}

export default function BarreRechercheTickets({
  recherche,
  setRecherche,
  statutFiltre,
  setStatutFiltre,
  optionsStatut,
  onNouveauTicket,
  placeholder = "Rechercher un ticket...",
  afficherNouveauTicket = true
}: BarreRechercheTicketsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
      {/* Barre de recherche */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="pl-10 border border-gray-200"
        />
      </div>

      {/* Contrôles */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Dropdown statut */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-fit">
              <span className="hidden sm:inline">
                {optionsStatut.find(option => option.value === statutFiltre)?.label}
              </span>
              <span className="sm:hidden">Filtre</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border shadow-md z-50">
            {optionsStatut.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setStatutFiltre(option.value)}
                className="hover:bg-gray-50"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Bouton nouveau ticket */}
        {afficherNouveauTicket && (
          <Button
            onClick={onNouveauTicket}
            className="bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Nouveau ticket</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        )}
      </div>
    </div>
  )
}