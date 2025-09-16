"use client"

import { useState } from "react"
import { Ticket, MessageCircle, Search } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/src/lib/utils"

const onglets = [
  {
    id: 'tickets',
    label: 'Tickets Support',
    icon: Ticket,
    actif: true
  },
  {
    id: 'chat',
    label: 'Chat Support',
    icon: MessageCircle,
    actif: false
  },
  {
    id: 'audit',
    label: 'Audit',
    icon: Search,
    actif: false
  }
]

export function OngletSupport() {
  const [ongletActif, setOngletActif] = useState('tickets')

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        {onglets.map((onglet) => {
          const Icon = onglet.icon
          const estActif = ongletActif === onglet.id
          
          return (
            <button
              key={onglet.id}
              onClick={() => setOngletActif(onglet.id)}
              className={cn(
                "flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                estActif 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{onglet.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}