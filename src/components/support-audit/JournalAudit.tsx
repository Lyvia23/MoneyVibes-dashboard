"use client"

import React, { useState, ReactNode, MouseEvent, ButtonHTMLAttributes } from "react"
import { Download, ChevronDown, LogIn, Shield, Settings, User, ChevronLeft, ChevronRight } from "lucide-react"

// Types pour les composants UI
interface CardProps {
  children: ReactNode
  className?: string
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "outline"
  className?: string
}

interface DropdownMenuProps {
  children: ReactNode
}

interface DropdownMenuTriggerProps {
  children: ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

interface DropdownMenuContentProps {
  children: ReactNode
  align?: "start" | "end"
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

interface DropdownMenuItemProps {
  children: ReactNode
  onClick?: () => void
}

// Composants UI avec types TypeScript
const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white shadow-lg rounded-lg border border-gray-200 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "" }: CardProps) => (
  <h3 className={`text-lg font-medium text-gray-900 ${className}`}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6"
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "bg-gray-100 text-gray-900 border-gray-200",
    outline: "border-current"
  }
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, child => 
        React.cloneElement(child as React.ReactElement, { isOpen, setIsOpen })
      )}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, isOpen, setIsOpen }: DropdownMenuTriggerProps) => (
  <div onClick={() => setIsOpen && setIsOpen(!isOpen)}>
    {children}
  </div>
)

const DropdownMenuContent = ({ children, align = "start", isOpen, setIsOpen }: DropdownMenuContentProps) => {
  if (!isOpen) return null
  
  const alignClasses = {
    start: "left-0",
    end: "right-0"
  }
  
  return (
    <>
      <div 
        className="fixed inset-0 z-10" 
        onClick={() => setIsOpen && setIsOpen(false)}
      />
      <div className={`absolute z-20 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignClasses[align]}`}>
        <div className="py-1">
          {children}
        </div>
      </div>
    </>
  )
}

const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => (
  <button
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    onClick={onClick}
  >
    {children}
  </button>
)

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

// Type pour les options de filtre
interface OptionFiltre {
  value: string
  label: string
}

// Type pour la configuration des types d'événements
interface ConfigType {
  icon: React.ComponentType<{ className?: string }>
  couleur: string
}

// Type pour la configuration des niveaux de gravité
interface ConfigGravite {
  couleur: string
}

// Données d'exemple étendues pour la pagination
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
  },
  {
    id: '6',
    type: 'connexion',
    titre: 'Connexion échouée',
    description: 'Tentative de connexion échouée pour l\'utilisateur test@example.com',
    utilisateur: 'Système',
    timestamp: '14:05:42',
    adresseIp: '192.168.1.255',
    gravite: 'moyenne'
  },
  {
    id: '7',
    type: 'modification',
    titre: 'Modification des permissions',
    description: 'Permissions de l\'utilisateur Sarah Kouassi modifiées',
    utilisateur: 'Admin Principal',
    timestamp: '13:58:17',
    gravite: 'elevee'
  },
  {
    id: '8',
    type: 'creation',
    titre: 'Nouvel utilisateur',
    description: 'Compte utilisateur créé pour Jean Dupont',
    utilisateur: 'Admin Principal',
    timestamp: '13:45:33',
    gravite: 'moyenne'
  },
  {
    id: '9',
    type: 'export',
    titre: 'Export rapports',
    description: 'Export des rapports de performance mensuelle',
    utilisateur: 'Sarah Kouassi',
    timestamp: '13:30:21',
    gravite: 'faible'
  },
  {
    id: '10',
    type: 'suppression',
    titre: 'Suppression de fichier',
    description: 'Fichier temporaire temp_backup.sql supprimé',
    utilisateur: 'Système',
    timestamp: '13:15:08',
    gravite: 'faible'
  }
]

const optionsFiltre: OptionFiltre[] = [
  { value: 'toutes', label: 'Toutes les actions' },
  { value: 'connexion', label: 'Connexions' },
  { value: 'modification', label: 'Modifications' },
  { value: 'creation', label: 'Créations' },
  { value: 'suppression', label: 'Suppressions' },
  { value: 'export', label: 'Exports' }
]

const configType: Record<EvenementAudit['type'], ConfigType> = {
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

const configGravite: Record<EvenementAudit['gravite'], ConfigGravite> = {
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

export default function JournalAudit() {
  const [filtreAction, setFiltreAction] = useState('toutes')
  const [pageActuelle, setPageActuelle] = useState(1)
  const elementsParPage = 5

  // Filtrer les événements
  const evenementsFiltres = donneesAudit.filter(evenement => {
    if (filtreAction === 'toutes') return true
    return evenement.type === filtreAction
  })

  // Calculer la pagination
  const nombreTotalPages = Math.ceil(evenementsFiltres.length / elementsParPage)
  const indexDebut = (pageActuelle - 1) * elementsParPage
  const indexFin = indexDebut + elementsParPage
  const evenementsAffiches = evenementsFiltres.slice(indexDebut, indexFin)

  // Reset page when filter changes
  const handleFilterChange = (newFilter: string): void => {
    setFiltreAction(newFilter)
    setPageActuelle(1)
  }

  const allerPagePrecedente = (): void => {
    setPageActuelle(prev => Math.max(prev - 1, 1))
  }

  const allerPageSuivante = (): void => {
    setPageActuelle(prev => Math.min(prev + 1, nombreTotalPages))
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-semibold">Journal d'audit</CardTitle>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="sm" className="justify-between min-w-[180px]">
                    <span className="truncate">
                      {optionsFiltre.find(option => option.value === filtreAction)?.label}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {optionsFiltre.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleFilterChange(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Exporter</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {evenementsAffiches.map((evenement, index) => {
              const typeConfig = configType[evenement.type]
              const graviteConfig = configGravite[evenement.gravite]
              const Icon = typeConfig.icon
              
              return (
                <div
                  key={evenement.id}
                  className={`flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border bg-white transition-all hover:shadow-md ${
                    index === 0 ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${typeConfig.couleur}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2 lg:gap-4">
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">
                          {evenement.titre}
                        </h4>
                        <p className="text-sm text-gray-600 break-words">
                          {evenement.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500">
                          <span className="truncate">Par {evenement.utilisateur}</span>
                          {evenement.adresseIp && (
                            <span className="font-mono">IP: {evenement.adresseIp}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col lg:flex-col items-start sm:items-end lg:items-end gap-2 flex-shrink-0">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${graviteConfig.couleur}`}
                        >
                          {evenement.gravite === 'faible' && 'Faible'}
                          {evenement.gravite === 'moyenne' && 'Moyenne'}
                          {evenement.gravite === 'elevee' && 'Élevée'}
                        </Badge>
                        <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                          {evenement.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {evenementsAffiches.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun événement trouvé</p>
                <p className="text-gray-400 text-sm mt-1">
                  Essayez de modifier le filtre d'actions
                </p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {nombreTotalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Affichage de {indexDebut + 1} à {Math.min(indexFin, evenementsFiltres.length)} sur {evenementsFiltres.length} éléments
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={allerPagePrecedente}
                  disabled={pageActuelle === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Précédent</span>
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: nombreTotalPages }, (_, i) => i + 1)
                    .filter(page => {
                      const delta = 2
                      return page === 1 || page === nombreTotalPages || 
                             (page >= pageActuelle - delta && page <= pageActuelle + delta)
                    })
                    .map((page, index, array) => {
                      const showEllipsisBefore = index > 0 && array[index - 1] < page - 1
                      const showEllipsisAfter = index < array.length - 1 && array[index + 1] > page + 1
                      
                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="text-gray-400 px-2">...</span>
                          )}
                          <Button
                            variant={pageActuelle === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setPageActuelle(page)}
                            className="min-w-[32px] h-8"
                          >
                            {page}
                          </Button>
                          {showEllipsisAfter && (
                            <span className="text-gray-400 px-2">...</span>
                          )}
                        </React.Fragment>
                      )
                    })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={allerPageSuivante}
                  disabled={pageActuelle === nombreTotalPages}
                  className="disabled:opacity-50"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}