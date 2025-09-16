"use client"

import { useState, useMemo } from "react"
import { PageWithHeader } from "@/src/components/PageWithHeader"
import { Member } from "@/src/components/membres/MemberCard"
import { MembersStatsCards } from "@/src/components/membres/MembersStatsCards"
import { MembersFilters } from "@/src/components/membres/MembersFilters"
import { MembersGrid } from "@/src/components/membres/MembersGrid"


// Données d'exemple - à remplacer par vos vraies données
const mockMembers: Member[] = [
  {
    id: "1",
    name: "Marie Kouadio",
    phone: "+225 07 123 456",
    joinDate: "2023-01-15",
    status: "active",
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "2",
    name: "Jean Baptiste",
    phone: "+225 05 987 654",
    joinDate: "2023-03-20",
    status: "active",
    avatar: undefined,
    contributions: { current: 10, total: 12 }
  },
  {
    id: "3",
    name: "Fatou Diallo",
    phone: "+225 01 456 789",
    joinDate: "2023-02-10",
    status: "inactive",
    avatar: undefined,
    contributions: { current: 8, total: 12 }
  },
  {
    id: "4",
    name: "Amadou Traoré",
    phone: "+225 03 321 654",
    joinDate: "2023-04-05",
    status: "active",
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  },
  {
    id: "5",
    name: "Aïcha Sanogo",
    phone: "+225 06 789 123",
    joinDate: "2023-05-12",
    status: "active",
    avatar: undefined,
    contributions: { current: 11, total: 12 }
  },
  {
    id: "6",
    name: "Koffi Asante",
    phone: "+225 02 654 987",
    joinDate: "2023-06-18",
    status: "suspended",
    avatar: undefined,
    contributions: { current: 5, total: 12 }
  },
  {
    id: "7",
    name: "Salimata Ouattara",
    phone: "+225 04 147 258",
    joinDate: "2023-07-22",
    status: "active",
    avatar: undefined,
    contributions: { current: 9, total: 12 }
  },
  {
    id: "8",
    name: "Ibrahim Keita",
    phone: "+225 08 369 741",
    joinDate: "2023-08-30",
    status: "active",
    avatar: undefined,
    contributions: { current: 12, total: 12 }
  }
]

export default function MembersPage() {
  const [searchValue, setSearchValue] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

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

  // Filtrage et tri des membres
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = mockMembers

    // Filtrage par recherche
    if (searchValue) {
      const search = searchValue.toLowerCase()
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(search) ||
        member.phone.includes(search)
      )
    }

    // Filtrage par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(member => member.status === statusFilter)
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "joinDate":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        case "contributions":
          return (b.contributions.current / b.contributions.total) - (a.contributions.current / a.contributions.total)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return filtered
  }, [searchValue, statusFilter, sortBy])

  // Handlers pour les actions
  const handleView = (member: Member) => {
    console.log("Voir détails:", member)
    // Ajouter votre logique de vue détails
  }

  const handleEdit = (member: Member) => {
    console.log("Modifier:", member)
    // Ajouter votre logique de modification
  }

  const handleSuspend = (member: Member) => {
    console.log("Suspendre:", member)
    // Ajouter votre logique de suspension
  }

  const handleContact = (member: Member) => {
    console.log("Contacter:", member)
    // Ajouter votre logique de contact
  }


  return (
    <PageWithHeader
      title="Gestion des membres"
      description="Gérez et suivez vos membres de tontine"
    >
      <div className="space-y-6 p-6">

          {/* Filtres et recherche */}
        <MembersFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
        {/* Cartes statistiques */}
        <MembersStatsCards stats={stats} />

      

        {/* Grille des membres */}
        <MembersGrid
          members={filteredAndSortedMembers}
          itemsPerPage={8}
          onView={handleView}
          onEdit={handleEdit}
          onSuspend={handleSuspend}
          onContact={handleContact}
        />
      </div>
    </PageWithHeader>
  )
}