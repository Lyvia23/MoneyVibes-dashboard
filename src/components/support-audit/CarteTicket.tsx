"use client"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/src/lib/utils"
import { Ticket } from "./ListeTickets"

interface CarteTicketProps {
  ticket: Ticket
}

const configStatut = {
  ouvert: {
    label: 'OUVERT',
    couleur: 'bg-red-100 text-red-800 border-red-200',
    point: 'bg-red-500'
  },
  'en-cours': {
    label: 'EN COURS',
    couleur: 'bg-orange-100 text-orange-800 border-orange-200',
    point: 'bg-orange-500'
  },
  ferme: {
    label: 'FERMÉ',
    couleur: 'bg-green-100 text-green-800 border-green-200',
    point: 'bg-green-500'
  }
}

const configPriorite = {
  urgent: {
    label: 'Urgent',
    couleur: 'bg-red-100 text-red-600'
  },
  normal: {
    label: 'Normal',
    couleur: 'bg-yellow-100 text-yellow-600'
  },
  info: {
    label: 'Info',
    couleur: 'bg-blue-100 text-blue-600'
  }
}

export function CarteTicket({ ticket }: CarteTicketProps) {
  const statutConfig = configStatut[ticket.statut]
  const prioriteConfig = configPriorite[ticket.priorite]

  // Initiales pour l'avatar
  const initiales = ticket.utilisateur.nom
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn("w-2 h-2 rounded-full", statutConfig.point)} />
            <Badge variant="outline" className={cn("text-xs font-medium", statutConfig.couleur)}>
              {statutConfig.label}
            </Badge>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            #{ticket.numero}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {ticket.titre}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {ticket.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ticket.utilisateur.avatar} />
              <AvatarFallback className="text-xs bg-gray-100">
                {initiales}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">
              {ticket.utilisateur.nom}
            </span>
          </div>
          
          <Badge variant="secondary" className={cn("text-xs", prioriteConfig.couleur)}>
            {prioriteConfig.label}
          </Badge>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
          {ticket.tempsEcoule}
        </div>
      </CardContent>
    </Card>
  )
}