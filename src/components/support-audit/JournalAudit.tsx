
"use client"

import { useState } from "react"
import { Download, ChevronDown, LogIn, Shield, Settings, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"
import { cn } from "@/src/lib/utils"

// Types pour les événements d'audit
interface EvenementAudit {
  id: string
  type: 'connexion' | 'modification' | 'suppression' | 'creation' | 'export'
  titre: string
  description: string
  utilisateur: string
  timestamp: string
  adresseIp?: string
  gravite: 'faible' | 'moyenne' | 'elevee'
}

// Données d'exemple pour le journal d'audit
const donneesAudit: EvenementAudit[] = [
  {
    id: '1',
    type: 'connexion',
    titre: 'Connexion utilisateur',
    description: 'Admin Principal s\'est connecté au système',
    utilisateur: 'Admin Principal',
    timestamp: '14:30:25',
    adresseIp: '192.168.1.100',
    gravite: 'faible'
  },
  {
    id: '2',
    type: 'modification',
    titre: 'Modification de ticket',
    description: 'Statut du ticket T-001 modifié de "Ouvert" à "En cours"',
    utilisateur: 'Sarah Kouassi',
    timestamp: '14:25:12',
    gravite: 'moyenne'
  },
  {
    id: '3',
    type: 'creation',
    titre: 'Nouveau ticket créé',
    description: 'Ticket T-007 créé par Mamadou Diarra',
    utilisateur: 'Mamadou Diarra',
    timestamp: '14:20:45',
    gravite: 'faible'
  },
  {
    id: '4',
    type: 'export',
    titre: 'Export de données',
    description: 'Export des tickets du mois en cours',
    utilisateur: 'Admin Principal',
    timestamp: '14:15:33',
    gravite: 'elevee'
  },
  {
    id: '5',
    type: 'suppression',
    titre: 'Suppression d\'utilisateur',
    description: 'Compte utilisateur temporaire supprimé',
    utilisateur: 'Admin Principal',
    timestamp: '14:10:18',
    gravite: 'elevee'
  }
]

const optionsFiltre = [
  { value: 'toutes', label: 'Toutes les actions' },
  { value: 'connexion', label: 'Connexions' },
  { value: 'modification', label: 'Modifications' },
  { value: 'creation', label: 'Créations' },
  { value: 'suppression', label: 'Suppressions' },
  { value: 'export', label: 'Exports' }
]

const configType = {
  connexion: {
    icon: LogIn,
    couleur: 'text-blue-600 bg-blue-100'
  },
  modification: {
    icon: Settings,
    couleur: 'text-orange-600 bg-orange-100'
  },
  suppression: {
    icon: Shield,
    couleur: 'text-red-600 bg-red-100'
  },
  creation: {
    icon: User,
    couleur: 'text-green-600 bg-green-100'
  },
  export: {
    icon: Download,
    couleur: 'text-purple-600 bg-purple-100'
  }
}

const configGravite = {
  faible: {
    couleur: 'bg-green-100 text-green-700 border-green-200'
  },
  moyenne: {
    couleur: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  elevee: {
    couleur: 'bg-red-100 text-red-700 border-red-200'
  }
}

export function JournalAudit() {
  const [filtreAction, setFiltreAction] = useState('toutes')

  const evenementsFiltres = donneesAudit.filter(evenement => {
    if (filtreAction === 'toutes') return true
    return evenement.type === filtreAction
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Journal d'audit</CardTitle>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {optionsFiltre.find(option => option.value === filtreAction)?.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {optionsFiltre.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setFiltreAction(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {evenementsFiltres.map((evenement, index) => {
            const typeConfig = configType[evenement.type]
            const graviteConfig = configGravite[evenement.gravite]
            const Icon = typeConfig.icon
            
            return (
              <div
                key={evenement.id}
                className={cn(
                  "flex items-start space-x-4 p-4 rounded-lg border bg-white",
                  index === 0 ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full",
                  typeConfig.couleur
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {evenement.titre}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {evenement.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Par {evenement.utilisateur}</span>
                        {evenement.adresseIp && (
                          <span>IP: {evenement.adresseIp}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", graviteConfig.couleur)}
                      >
                        {evenement.gravite === 'faible' && 'Faible'}
                        {evenement.gravite === 'moyenne' && 'Moyenne'}
                        {evenement.gravite === 'elevee' && 'Élevée'}
                      </Badge>
                      <span className="text-xs text-gray-500 font-mono">
                        {evenement.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          
          {evenementsFiltres.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun événement trouvé</p>
              <p className="text-gray-400 text-sm mt-1">
                Essayez de modifier le filtre d'actions
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}