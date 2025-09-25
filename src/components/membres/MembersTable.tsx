"use client"
import { useState } from "react"
import { Member } from "./MemberCard"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  UserX, 
  MessageSquare,
  Mail,
  Phone
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { cn } from "@/src/lib/utils"

interface MembersTableProps {
  members: Member[]
  itemsPerPage?: number
  onView?: (member: Member) => void
  onEdit?: (member: Member) => void
  onSuspend?: (member: Member) => void
  onContact?: (member: Member) => void
  className?: string
}

// Extension du type Member pour les nouvelles données
interface ExtendedMember extends Member {
  email?: string
  accountType?: "premium" | "standard" | "basic"
  kycStatus?: "verified" | "pending" | "rejected" | "not_started"
  walletBalance?: number
  loyaltyPoints?: number
  lastConnection?: string
}

// Fonction pour convertir Member en ExtendedMember avec des données mockées
const extendMemberData = (member: Member): ExtendedMember => ({
  ...member,
  email: `${member.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
  accountType: Math.random() > 0.5 ? "premium" : Math.random() > 0.5 ? "standard" : "basic",
  kycStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.5 ? "pending" : Math.random() > 0.5 ? "rejected" : "not_started",
  walletBalance: Math.floor(Math.random() * 500000) + 10000,
  loyaltyPoints: Math.floor(Math.random() * 1000) + 50,
  lastConnection: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
})

const getAccountTypeBadge = (type: ExtendedMember["accountType"]) => {
  const variants = {
    premium: "default",
    standard: "secondary", 
    basic: "outline"
  } as const
  
  const labels = {
    premium: "Premium",
    standard: "Standard",
    basic: "Basique"
  }
  
  return (
    <Badge variant={variants[type || "basic"]}>
      {labels[type || "basic"]}
    </Badge>
  )
}

const getKycStatusBadge = (status: ExtendedMember["kycStatus"]) => {
  const variants = {
    verified: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    not_started: "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
  
  const labels = {
    verified: "Vérifié",
    pending: "En attente",
    rejected: "Rejeté",
    not_started: "Non démarré"
  }
  
  return (
    <Badge className={variants[status || "not_started"]}>
      {labels[status || "not_started"]}
    </Badge>
  )
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' XOF'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`
  } else if (diffInHours < 24 * 7) {
    const days = Math.floor(diffInHours / 24)
    return `Il y a ${days}j`
  } else {
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function MembersTable({
  members,
  itemsPerPage = 10,
  onView,
  onEdit,
  onSuspend,
  onContact,
  className
}: MembersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Convertir les membres avec les données étendues
  const extendedMembers = members.map(extendMemberData)
  
  const totalPages = Math.ceil(extendedMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = extendedMembers.slice(startIndex, endIndex)

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
      return range
    }

    range.push(1)

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (totalPages > 1) {
      range.push(totalPages)
    }

    let prev = 0
    for (const page of range) {
      if (page - prev === 2) {
        rangeWithDots.push(prev + 1)
      } else if (page - prev !== 1) {
        rangeWithDots.push('...')
      }
      rangeWithDots.push(page)
      prev = page
    }

    return rangeWithDots
  }

  const renderMobilePagination = () => (
    <div className="sm:hidden flex items-center justify-between w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </Button>
      
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
        <span className="text-sm font-medium">{currentPage}</span>
        <span className="text-sm text-gray-500">/</span>
        <span className="text-sm text-gray-500">{totalPages}</span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Suivant
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  const renderDesktopPagination = () => (
    <div className="hidden sm:flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </Button>
      
      <div className="flex items-center gap-1">
        {totalPages <= 4 ? (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))
        ) : (
          getVisiblePages().map((page, index) => (
            page === '...' ? (
              <div key={`dots-${index}`} className="flex items-center justify-center w-8 h-8">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page as number)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            )
          ))
        )}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Suivant
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun membre trouvé</h3>
        <p className="text-gray-500">Aucun membre ne correspond aux critères de recherche.</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Version Mobile - Cards */}
      <div className="block lg:hidden space-y-4">
        {currentMembers.map((member) => (
          <div key={member.id} className="bg-white  rounded-lg p-4 space-y-3">
            {/* Header avec avatar et nom */}
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {member.email && <Mail className="h-3 w-3" />}
                  {member.email && <span className="truncate">{member.email}</span>}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-3 w-3" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {getAccountTypeBadge(member.accountType)}
              {getKycStatusBadge(member.kycStatus)}
            </div>

            {/* Informations financières */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Solde wallet</span>
                <p className="font-medium">{formatCurrency(member.walletBalance || 0)}</p>
              </div>
              <div>
                <span className="text-gray-500">Points fidélité</span>
                <p className="font-medium">{member.loyaltyPoints || 0} pts</p>
              </div>
            </div>

            {/* Dernière connexion */}
            <div className="text-sm">
              <span className="text-gray-500">Dernière connexion: </span>
              <span className="font-medium">{formatDate(member.lastConnection || member.joinDate)}</span>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(member)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Voir détails
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(member)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onContact?.(member)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contacter
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onSuspend?.(member)}
                    className="text-red-600"
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Suspendre
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Version Desktop - Tableau */}
      <div className="hidden lg:block">
        <div className="bg-white  rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de compte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut KYC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solde wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points fidélité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  {/* Photo + Nom */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {member.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {member.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.phone}
                    </div>
                  </td>

                  {/* Type de compte */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getAccountTypeBadge(member.accountType)}
                  </td>

                  {/* Statut KYC */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getKycStatusBadge(member.kycStatus)}
                  </td>

                  {/* Solde wallet */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(member.walletBalance || 0)}
                  </td>

                  {/* Points fidélité */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.loyaltyPoints || 0} pts
                  </td>

                  {/* Dernière connexion */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(member.lastConnection || member.joinDate)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(member)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(member)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onContact?.(member)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contacter
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onSuspend?.(member)}
                          className="text-red-600"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Suspendre
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Affichage de {startIndex + 1} à {Math.min(endIndex, members.length)} sur {members.length} membres
          </p>
          
          <div className="flex justify-center">
            {renderMobilePagination()}
            {renderDesktopPagination()}
          </div>
        </div>
      )}
    </div>
  )
}