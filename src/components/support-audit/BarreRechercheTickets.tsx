// components/BarreRechercheTickets.tsx
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

export function BarreRechercheTickets({
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
    <div className="flex items-center justify-between w-full">
      {/* Barre de recherche à gauche */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contrôles à droite */}
      <div className="flex items-center gap-4">
        {/* Dropdown statut */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {optionsStatut.find(option => option.value === statutFiltre)?.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {optionsStatut.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setStatutFiltre(option.value)}
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
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau ticket
          </Button>
        )}
      </div>
    </div>
  )
}