

import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import BarreRechercheTickets from "./BarreRechercheTickets"
import CarteTicket from "./CarteTicket"
import { Pagination } from "../pagination"

// Types
export interface Ticket {
  id: string
  numero: string
  titre: string
  description: string
  utilisateur: {
    nom: string
    avatar?: string
  }
  statut: 'ouvert' | 'en-cours' | 'ferme'
  priorite: 'urgent' | 'normal' | 'info'
  tempsEcoule: string
}

// Fonction utilitaire cn
const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ')

// Données des tickets
const donneesTickets: Ticket[] = [
  {
    id: '1',
    numero: 'T-001',
    titre: 'Problème de connexion',
    description: 'Impossible de se connecter à l\'application depuis ce matin',
    utilisateur: {
      nom: 'Koffi Asante',
      avatar: '/avatar1.jpg'
    },
    statut: 'ouvert',
    priorite: 'urgent',
    tempsEcoule: 'Il y a 2h'
  },
  {
    id: '2',
    numero: 'T-002',
    titre: 'Erreur de calcul',
    description: 'Les intérêts ne sont pas calculés correctement',
    utilisateur: {
      nom: 'Aisha Diallo',
      avatar: '/avatar2.jpg'
    },
    statut: 'en-cours',
    priorite: 'normal',
    tempsEcoule: 'Il y a 4h'
  },
  {
    id: '3',
    numero: 'T-003',
    titre: 'Demande d\'historique',
    description: 'Besoin de l\'historique complet des transactions',
    utilisateur: {
      nom: 'Ibrahim Ouattara',
      avatar: '/avatar3.jpg'
    },
    statut: 'ferme',
    priorite: 'info',
    tempsEcoule: 'Il y a 1j'
  },
  {
    id: '4',
    numero: 'T-004',
    titre: 'Modification cotisation',
    description: 'Impossible de modifier le montant de ma cotisation',
    utilisateur: {
      nom: 'Fatou Coulibaly',
      avatar: '/avatar4.jpg'
    },
    statut: 'ouvert',
    priorite: 'normal',
    tempsEcoule: 'Il y a 30m'
  },
  {
    id: '5',
    numero: 'T-005',
    titre: 'Notification manquante',
    description: 'Je ne reçois plus les notifications de rappel',
    utilisateur: {
      nom: 'Moussa Koné',
      avatar: '/avatar5.jpg'
    },
    statut: 'en-cours',
    priorite: 'info',
    tempsEcoule: 'Il y a 1h'
  },
  {
    id: '6',
    numero: 'T-006',
    titre: 'Récupération mot de passe',
    description: 'Aide pour réinitialiser mon mot de passe',
    utilisateur: {
      nom: 'Aminata Traoré',
      avatar: '/avatar6.jpg'
    },
    statut: 'ferme',
    priorite: 'normal',
    tempsEcoule: 'Il y a 3j'
  },
  {
    id: '7',
    numero: 'T-007',
    titre: 'Bug interface mobile',
    description: 'L\'interface ne s\'affiche pas correctement sur mobile',
    utilisateur: {
      nom: 'Yves Kouassi',
      avatar: '/avatar7.jpg'
    },
    statut: 'ouvert',
    priorite: 'urgent',
    tempsEcoule: 'Il y a 45m'
  },
  {
    id: '8',
    numero: 'T-008',
    titre: 'Demande de formation',
    description: 'Besoin d\'aide pour utiliser les nouvelles fonctionnalités',
    utilisateur: {
      nom: 'Marie Akissi',
      avatar: '/avatar8.jpg'
    },
    statut: 'en-cours',
    priorite: 'info',
    tempsEcoule: 'Il y a 3h'
  }
]

const optionsStatut = [
  { value: 'tous', label: 'Tous les statuts' },
  { value: 'ouvert', label: 'Ouverts' },
  { value: 'en-cours', label: 'En cours' },
  { value: 'ferme', label: 'Fermés' }
]






export default function SupportDashboard() {
  const [recherche, setRecherche] = useState('')
  const [statutFiltre, setStatutFiltre] = useState('tous')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const ticketsFiltres = donneesTickets.filter(ticket => {
    const correspondRecherche = ticket.titre.toLowerCase().includes(recherche.toLowerCase()) ||
                               ticket.numero.toLowerCase().includes(recherche.toLowerCase())
    const correspondStatut = statutFiltre === 'tous' || ticket.statut === statutFiltre
    
    return correspondRecherche && correspondStatut
  })

  const totalPages = Math.ceil(ticketsFiltres.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const ticketsPagines = ticketsFiltres.slice(startIndex, startIndex + itemsPerPage)

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [recherche, statutFiltre])

  const handleNouveauTicket = () => {
    console.log('Créer un nouveau ticket')
  }

  return (
      <div className="w-full">
        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="tickets" className="text-orange-600">
              Tickets Support
            </TabsTrigger>
            <TabsTrigger value="chat">
              Chat Support
            </TabsTrigger>
            <TabsTrigger value="audit">
              Audit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <BarreRechercheTickets
              recherche={recherche}
              setRecherche={setRecherche}
              statutFiltre={statutFiltre}
              setStatutFiltre={setStatutFiltre}
              optionsStatut={optionsStatut}
              onNouveauTicket={handleNouveauTicket}
              placeholder="Rechercher un ticket..."
            />

            {/* Liste des tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ticketsPagines.map((ticket) => (
                <CarteTicket key={ticket.id} ticket={ticket} />
              ))}
            </div>

            {ticketsFiltres.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun ticket trouvé</p>
                <p className="text-gray-400 text-sm mt-2">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}

            {/* Pagination */}
            {ticketsFiltres.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={ticketsFiltres.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Chat Support</h2>
              <p className="text-gray-500">
                Interface de chat en cours de développement
              </p>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Audit</h2>
              <p className="text-gray-500">
                Outils d'audit en cours de développement
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}