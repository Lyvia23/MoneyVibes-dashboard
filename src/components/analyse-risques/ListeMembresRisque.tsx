import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Download } from "lucide-react"
import { CarteMembre } from "./CarteMembre"
import { FiltresRisque } from "./FiltresRisque"
import { MembreRisque } from "@/src/types/analyse-risques"




interface ListeMembresRisqueProps {
  membres?: MembreRisque[]
  className?: string
}
const membresParDefaut: MembreRisque[] = [
  {
    id: "1",
    nom: "Asante",
    prenom: "Koffi",
    membreDepuis: 2022,
    scoreRisque: 25,
    niveauRisque: "ÉLEVÉ",
    problemes: ["3 cotisations manquées", "Prêt en retard (45 jours)"]
  },
  {
    id: "2",
    nom: "Diallo",
    prenom: "Aisha",
    membreDepuis: 2023,
    scoreRisque: 30,
    niveauRisque: "ÉLEVÉ",
    problemes: ["Prêt en défaut", "2 cotisations manquées"]
  },
  {
    id: "3",
    nom: "Ouattara",
    prenom: "Ibrahim",
    membreDepuis: 2021,
    scoreRisque: 55,
    niveauRisque: "MOYEN",
    problemes: ["Retard paiement (15 jours)", "Historique irrégulier"]
  },
  {
    id: "4",
    nom: "Coulibaly",
    prenom: "Fatou",
    membreDepuis: 2022,
    scoreRisque: 48,
    niveauRisque: "MOYEN",
    problemes: ["1 cotisation manquée", "Retard mineur (8 jours)"]
  },
  {
    id: "5",
    nom: "Koné",
    prenom: "Moussa",
    membreDepuis: 2020,
    scoreRisque: 85,
    niveauRisque: "FAIBLE",
    problemes: ["Paiements réguliers", "Excellent historique"]
  }
]

export function ListeMembresRisque({ 
  membres = membresParDefaut,

}: ListeMembresRisqueProps) {
  const [rechercheTexte, setRechercheTexte] = useState("")
  const [filtreNiveau, setFiltreNiveau] = useState<string>("tous")
  const [filtreType, setFiltreType] = useState<string>("tous")

  // Filtrage des membres
  const membresFiltres = membres.filter(membre => {
    const correspondRecherche = rechercheTexte === "" || 
      `${membre.prenom} ${membre.nom}`.toLowerCase().includes(rechercheTexte.toLowerCase())
    
    const correspondNiveau = filtreNiveau === "tous" || 
      membre.niveauRisque === filtreNiveau
    
    return correspondRecherche && correspondNiveau
  })

  return (
    <div className="space-y-6">
      {/* Bloc des filtres */}
      <FiltresRisque 
        rechercheTexte={rechercheTexte}
        setRechercheTexte={setRechercheTexte}
        filtreNiveau={filtreNiveau}
        setFiltreNiveau={setFiltreNiveau}
        filtreType={filtreType}
        setFiltreType={setFiltreType}
      />

      {/* Bloc des membres à risque */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Membres à risque
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {membresFiltres.map((membre) => (
              <CarteMembre key={membre.id} membre={membre} />
            ))}
          </div>

          {membresFiltres.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Aucun membre trouvé avec les critères sélectionnés.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}