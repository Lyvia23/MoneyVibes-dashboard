// components/FiltresRisque.tsx
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Search, Download } from "lucide-react"

interface FiltresRisqueProps {
  rechercheTexte: string
  setRechercheTexte: (value: string) => void
  filtreNiveau: string
  setFiltreNiveau: (value: string) => void
  filtreType: string
  setFiltreType: (value: string) => void
}

export function FiltresRisque({
  rechercheTexte,
  setRechercheTexte,
  filtreNiveau,
  setFiltreNiveau,
  filtreType,
  setFiltreType
}: FiltresRisqueProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Filtre Niveau de risque */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Niveau de risque
          </label>
          <Select value={filtreNiveau} onValueChange={setFiltreNiveau}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tous les niveaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les niveaux</SelectItem>
              <SelectItem value="ÉLEVÉ">Élevé</SelectItem>
              <SelectItem value="MOYEN">Moyen</SelectItem>
              <SelectItem value="FAIBLE">Faible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtre Type de risque */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Type de risque
          </label>
          <Select value={filtreType} onValueChange={setFiltreType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tous types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous types</SelectItem>
              <SelectItem value="retard">Retards</SelectItem>
              <SelectItem value="defaut">Défauts</SelectItem>
              <SelectItem value="cotisation">Cotisations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Barre de recherche */}
        <div className="space-y-2 flex-1">
          <label className="text-sm font-medium text-gray-700 invisible">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher membre..."
              value={rechercheTexte}
              onChange={(e) => setRechercheTexte(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Bouton Exporter */}
      <div className="space-y-2 w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700 invisible">
          Actions
        </label>
        <Button className="bg-orange-500 w-full hover:bg-orange-600 text-white gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  )
}