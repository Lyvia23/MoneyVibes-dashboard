// components/CarteMembre.tsx
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { AlertCircle, Clock, TrendingUp, CheckCircle, Star } from "lucide-react"
import { MembreRisque } from "@/src/types/analyse-risques"

interface CarteMembreProps {
  membre: MembreRisque
}

export function CarteMembre({ membre }: CarteMembreProps) {
  // Fonction pour obtenir les couleurs selon le niveau de risque
  const getCouleursBadge = (niveau: string) => {
    switch (niveau) {
      case "ÉLEVÉ":
        return "bg-red-500 text-white hover:bg-red-600"
      case "MOYEN":
        return "bg-orange-500 text-white hover:bg-orange-600"
      case "FAIBLE":
        return "bg-green-500 text-white hover:bg-green-600"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCouleursScore = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getCouleursBarre = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  const getCouleursBordure = (niveau: string) => {
    switch (niveau) {
      case "ÉLEVÉ":
        return "border-l-red-500"
      case "MOYEN":
        return "border-l-orange-500"
      case "FAIBLE":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getIconeProbleme = (probleme: string) => {
    if (probleme.includes('défaut')) return <AlertCircle className="h-3 w-3 text-red-500" />
    if (probleme.includes('cotisation') && probleme.includes('manquée')) return <AlertCircle className="h-3 w-3 text-red-500" />
    if (probleme.includes('retard')) return <Clock className="h-3 w-3 text-orange-500" />
    if (probleme.includes('irrégulier')) return <TrendingUp className="h-3 w-3 text-orange-500" />
    if (probleme.includes('régulier')) return <CheckCircle className="h-3 w-3 text-green-500" />
    if (probleme.includes('Excellent')) return <Star className="h-3 w-3 text-green-500" />
    return <CheckCircle className="h-3 w-3 text-green-500" />
  }

  return (
    <Card className={`border-l-4 ${getCouleursBordure(membre.niveauRisque)} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4 space-y-4">
        {/* En-tête avec avatar, nom et badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={membre.avatar} />
              <AvatarFallback className="text-sm">
                {membre.prenom[0]}{membre.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {membre.prenom} {membre.nom}
              </h4>
              <p className="text-xs text-muted-foreground">
                Membre depuis {membre.membreDepuis}
              </p>
            </div>
          </div>
          <Badge className={`${getCouleursBadge(membre.niveauRisque)} text-xs px-2 py-1`}>
            {membre.niveauRisque}
          </Badge>
        </div>

        {/* Score de risque */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Score de risque</span>
            <span className={`text-lg font-bold ${getCouleursScore(membre.scoreRisque)}`}>
              {membre.scoreRisque}%
            </span>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getCouleursBarre(membre.scoreRisque)}`}
              style={{ width: `${membre.scoreRisque}%` }}
            />
          </div>
        </div>

        {/* Liste des problèmes */}
        <div className="space-y-2">
          {membre.problemes.map((probleme, index) => (
            <div key={index} className="flex items-center gap-2">
              {getIconeProbleme(probleme)}
              <span className="text-xs text-muted-foreground">{probleme}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}