"use client"

import { useState } from "react"
import { BarreRechercheTickets } from "./BarreRechercheTickets"
import { CarteTicket } from "./CarteTicket"

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
  }
]

const optionsStatut = [
  { value: 'tous', label: 'Tous les statuts' },
  { value: 'ouvert', label: 'Ouverts' },
  { value: 'en-cours', label: 'En cours' },
  { value: 'ferme', label: 'Fermés' }
]

export function ListeTickets() {
  const [recherche, setRecherche] = useState('')
  const [statutFiltre, setStatutFiltre] = useState('tous')

  const ticketsFiltres = donneesTickets.filter(ticket => {
    const correspondRecherche = ticket.titre.toLowerCase().includes(recherche.toLowerCase()) ||
                               ticket.numero.toLowerCase().includes(recherche.toLowerCase())
    const correspondStatut = statutFiltre === 'tous' || ticket.statut === statutFiltre
    
    return correspondRecherche && correspondStatut
  })

  const handleNouveauTicket = () => {
    console.log('Créer un nouveau ticket')
    // Logique pour ouvrir un modal ou naviguer vers une page de création
  }

  return (
    <div className="space-y-6">
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
        {ticketsFiltres.map((ticket) => (
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
    </div>
  )
}