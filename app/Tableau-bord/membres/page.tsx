"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation" // Use App Router navigation
import { Member } from "@/src/components/membres/MemberCard"
import { MembersFilters, FilterValues } from "@/src/components/membres/MembersFilters"
import { MembersTable } from "@/src/components/membres/MembersTable"
import { MembersGrid } from "@/src/components/membres/MembersGrid"
import { useSetPageInfo } from "@/src/Context/pageContext"
import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import { StatsCard } from "@/src/components/StatsCard"

// Type pour les vues disponibles
type ViewMode = 'table' | 'grid'

// Interface étendue pour les membres avec les nouvelles propriétés
interface ExtendedMember extends Member {
  accountType: 'independent' | 'microfinance'
  kycStatus: 'validated' | 'pending' | 'rejected'
  walletBalance: number
  email?: string
}

// Données d'exemple étendues - à remplacer par vos vraies données
const mockMembers: ExtendedMember[] = [
  {
    id: "1",
    name: "Marie Kouadio",
    phone: "+225 07 123 456",
    email: "marie.kouadio@email.com",
    joinDate: "2023-01-15",
    status: "active",
    accountType: "independent",
    kycStatus: "validated",
    walletBalance: 13482,
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "2",
    name: "Jean Baptiste",
    phone: "+225 05 987 654",
    email: "jean.baptiste@email.com",
    joinDate: "2023-03-20",
    status: "active",
    accountType: "microfinance",
    kycStatus: "validated",
    walletBalance: 279898,
    avatar: undefined,
    contributions: { current: 10, total: 12 }
  },
  {
    id: "3",
    name: "Fatou Diallo",
    phone: "+225 01 456 789",
    email: "fatou.diallo@email.com",
    joinDate: "2023-02-10",
    status: "inactive",
    accountType: "independent",
    kycStatus: "pending",
    walletBalance: 5200,
    avatar: undefined,
    contributions: { current: 8, total: 12 }
  },
  {
    id: "4",
    name: "Amadou Traoré",
    phone: "+225 03 321 654",
    email: "amadou.traore@email.com",
    joinDate: "2023-04-05",
    status: "active",
    accountType: "microfinance",
    kycStatus: "validated",
    walletBalance: 158750,
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "5",
    name: "Aïcha Sanogo",
    phone: "+225 06 789 123",
    email: "aicha.sanogo@email.com",
    joinDate: "2023-05-12",
    status: "active",
    accountType: "independent",
    kycStatus: "pending",
    walletBalance: 425,
    avatar: undefined,
    contributions: { current: 11, total: 12 }
  },
  {
    id: "6",
    name: "Koffi Asante",
    phone: "+225 02 654 987",
    email: "koffi.asante@email.com",
    joinDate: "2023-06-18",
    status: "suspended",
    accountType: "independent",
    kycStatus: "rejected",
    walletBalance: 0,
    avatar: undefined,
    contributions: { current: 5, total: 12 }
  },
  {
    id: "7",
    name: "Salimata Ouattara",
    phone: "+225 04 147 258",
    email: "salimata.ouattara@email.com",
    joinDate: "2023-07-22",
    status: "active",
    accountType: "microfinance",
    kycStatus: "validated",
    walletBalance: 89340,
    avatar: undefined,
    contributions: { current: 9, total: 12 }
  },
  {
    id: "8",
    name: "Ibrahim Keita",
    phone: "+225 08 369 741",
    email: "ibrahim.keita@email.com",
    joinDate: "2023-08-30",
    status: "active",
    accountType: "independent",
    kycStatus: "validated",
    walletBalance: 12650,
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "9",
    name: "Mariam Diarra",
    phone: "+225 07 852 963",
    email: "mariam.diarra@email.com",
    joinDate: "2023-09-15",
    status: "active",
    accountType: "independent",
    kycStatus: "pending",
    walletBalance: 3480,
    avatar: undefined,
    contributions: { current: 8, total: 12 }
  },
  {
    id: "10",
    name: "Ousmane Coulibaly",
    phone: "+225 06 147 258",
    email: "ousmane.coulibaly@email.com",
    joinDate: "2023-10-05",
    status: "inactive",
    accountType: "microfinance",
    kycStatus: "validated",
    walletBalance: 45800,
    avatar: undefined,
    contributions: { current: 3, total: 12 }
  },
  {
    id: "11",
    name: "Fatoumata Bamba",
    phone: "+225 05 369 147",
    email: "fatoumata.bamba@email.com",
    joinDate: "2023-11-12",
    status: "active",
    accountType: "independent",
    kycStatus: "validated",
    walletBalance: 67200,
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "12",
    name: "Seydou Koné",
    phone: "+225 04 258 369",
    email: "seydou.kone@email.com",
    joinDate: "2023-12-01",
    status: "suspended",
    accountType: "independent",
    kycStatus: "rejected",
    walletBalance: 150,
    avatar: undefined,
    contributions: { current: 2, total: 12 }
  }
]

// Composant pour les boutons de basculement de vue
const ViewToggleButtons = ({
  currentView,
  onViewChange
}: {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'table'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M3 6h18m-9 8h9m-9 4h9m-9-8h9m-9 4h9"
          />
        </svg>
        <span>Tableau</span>
      </button>

      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'grid'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span>Grille</span>
      </button>
    </div>
  )
}

export default function MembersPage() {
  const router = useRouter() // Use the hook inside the component
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    accountStatus: "all",
    accountType: "all",
    kycStatus: "all",
    sortBy: "name",
    dateFrom: undefined,
    dateTo: undefined,
    walletMin: "",
    walletMax: ""
  })


  // Calcul des statistiques
  const stats = useMemo(() => {
    const total = mockMembers.length
    const active = mockMembers.filter(m => m.status === 'active').length
    const inactive = mockMembers.filter(m => m.status === 'inactive').length
    const newThisMonth = mockMembers.filter(m => {
      const joinDate = new Date(m.joinDate)
      const now = new Date()
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
    }).length

    return { total, active, inactive, newThisMonth }
  }, [])



  const statistiques = [
    {
      label: "Total membres",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Actifs",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Inactifs",
      value: stats.inactive,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      label: "Nouveaux ce mois",
      value: stats.newThisMonth,
      icon: UserPlus,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  // Fonction de filtrage et tri des membres
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = mockMembers

    // Filtrage par recherche (nom, téléphone, email)
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(search) ||
        member.phone.includes(search) ||
        member.email?.toLowerCase().includes(search)
      )
    }

    // Filtrage par statut du compte
    if (filters.accountStatus !== "all") {
      filtered = filtered.filter(member => member.status === filters.accountStatus)
    }

    // Filtrage par type de compte
    if (filters.accountType !== "all") {
      filtered = filtered.filter(member => member.accountType === filters.accountType)
    }

    // Filtrage par statut KYC
    if (filters.kycStatus !== "all") {
      filtered = filtered.filter(member => member.kycStatus === filters.kycStatus)
    }

    // Filtrage par plage de dates d'inscription
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter(member => {
        const joinDate = new Date(member.joinDate)
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null

        let matchesDateRange = true
        if (fromDate && joinDate < fromDate) matchesDateRange = false
        if (toDate && joinDate > toDate) matchesDateRange = false

        return matchesDateRange
      })
    }

    // Filtrage par montant wallet
    if (filters.walletMin !== "" || filters.walletMax !== "") {
      filtered = filtered.filter(member => {
        const balance = member.walletBalance
        const min = filters.walletMin !== "" ? parseFloat(filters.walletMin) : 0
        const max = filters.walletMax !== "" ? parseFloat(filters.walletMax) : Infinity

        return balance >= min && balance <= max
      })
    }

    // Tri
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "joinDate":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        case "contributions":
          return (b.contributions.current / b.contributions.total) - (a.contributions.current / a.contributions.total)
        case "wallet":
          return b.walletBalance - a.walletBalance
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return filtered
  }, [filters])

  // Handlers pour les actions
  const handleView = (member: Member) => {
    console.log("Voir détails:", member)
    // Add error handling for router navigation
    try {
      router.push(`/Tableau-bord/membres/${member.id}`)
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback: you could show a modal or handle the error differently
    }
  }

  const handleEdit = (member: Member) => {
    console.log("Modifier:", member)
    // Ouvrir modal d'édition
  }

  const handleSuspend = (member: Member) => {
    console.log("Suspendre:", member)
    if (confirm(`Êtes-vous sûr de vouloir suspendre ${member.name} ?`)) {
      // API call pour suspendre le membre
    }
  }

  const handleContact = (member: Member) => {
    console.log("Contacter:", member)
    // Add error handling for phone calls
    try {
      window.open(`tel:${member.phone}`)
    } catch (error) {
      console.error("Contact error:", error)
      // Fallback: copy phone number to clipboard or show it in a modal
    }
  }
  useSetPageInfo({
    title: " Gestion des membres",
    description: "Gérez et suivez vos membres de tontine",
    notificationCount: 3
  })
  return (

    <div className="space-y-6 p-6">
      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistiques.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      {/* Section Filtres avec bouton de basculement de vue */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-6">
            <MembersFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Boutons de basculement de vue */}
          <div className="flex justify-end">
            <ViewToggleButtons
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>
        </div>
      </div>

      {/* Affichage conditionnel basé sur le mode de vue */}
      {filteredAndSortedMembers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">Aucun membre trouvé</div>
          <div className="text-gray-400 text-sm">
            Essayez de modifier vos critères de recherche ou filtres
          </div>
        </div>
      ) : viewMode === 'table' ? (
        <MembersTable
          members={filteredAndSortedMembers}
          itemsPerPage={10}
          onView={handleView}
          onEdit={handleEdit}
          onSuspend={handleSuspend}
          onContact={handleContact}
        />
      ) : (
        <MembersGrid
          members={filteredAndSortedMembers}
          itemsPerPage={12}
          onView={handleView}
          onEdit={handleEdit}
          onSuspend={handleSuspend}
          onContact={handleContact}
        />
      )}
    </div>
  )
}