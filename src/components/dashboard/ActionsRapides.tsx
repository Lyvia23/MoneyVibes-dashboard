"use client"

import { Plus, UserCheck, Send, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface ActionRapideProps {
  title: string
  description?: string
  icon: React.ReactNode
  onClick?: () => void
  className?: string
}

interface ActionsRapidesProps {
  className?: string
}

const ActionRapide = ({ title, description, icon, onClick, className = "" }: ActionRapideProps) => {

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center p-4 
        bg-white rounded-lg border border-gray-200 
     
        ${className}
      `}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="p-2 rounded-full  text-[#f97316] group-hover:bg-[#f97316] transition-colors">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-900 text-center leading-tight">
          {title}
        </span>
        {description && (
          <span className="text-xs text-gray-500 text-center">
            {description}
          </span>
        )}
      </div>
      
      {/* Effet hover subtil */}
      <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity" />
    </button>
  )
}


export const ActionsRapides = ({ className = "" }: ActionsRapidesProps) => {
const router = useRouter();

  const actions = [
    {
      title: "Créer nouvelle tontine",
      description: "Lancer un nouveau groupe",
      icon: <Plus className="h-5 w-5" />,
      onClick: () => {
        console.log("Créer nouvelle tontine")
        router.push('/Tableau-bord/tontines/creation');

      }
    },
    {
      title: "Valider KYC en attente",
      description: "3 dossiers à traiter",
      icon: <UserCheck className="h-5 w-5" />,
      onClick: () => {
        console.log("Valider KYC")
                router.push('/Tableau-bord/kyc');

      }
    },
    {
      title: "Envoyer notification globale",
      description: "Message à tous les membres",
      icon: <Send className="h-5 w-5" />,
      onClick: () => {
        console.log("Envoyer notification")
        // Ouvrir modal de notification
      }
    },
    {
      title: "Générer rapport mensuel",
      description: "Rapport de septembre",
      icon: <FileText className="h-5 w-5" />,
      onClick: () => {
        console.log("Générer rapport")
        // Lancer génération de rapport
      }
    }
  ]

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Actions Rapides</h2>
        <p className="text-sm text-gray-600 mt-1">Accédez rapidement aux fonctions principales</p>
      </div>
      
      {/* Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <ActionRapide
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  )
}