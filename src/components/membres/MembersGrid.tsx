"use client"
import { useState } from "react"
import { MemberCard, Member } from "./MemberCard"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface MembersGridProps {
  members: Member[]
  itemsPerPage?: number
  onView?: (member: Member) => void
  onEdit?: (member: Member) => void
  onSuspend?: (member: Member) => void
  onContact?: (member: Member) => void
  className?: string
}

export function MembersGrid({
  members,
  itemsPerPage = 8,
  onView,
  onEdit,
  onSuspend,
  onContact,
  className
}: MembersGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(members.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = members.slice(startIndex, endIndex)

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  // Fonction pour générer les numéros de pages à afficher
  const getVisiblePages = () => {
    const delta = 2 // Nombre de pages à afficher de chaque côté de la page courante
    const range = []
    const rangeWithDots = []

    // Cas simple : moins de 7 pages au total
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
      return range
    }

    // Toujours inclure la première page
    range.push(1)

    // Pages autour de la page courante
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    // Toujours inclure la dernière page
    if (totalPages > 1) {
      range.push(totalPages)
    }

    // Ajouter les points de suspension si nécessaire
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

  // Fonction pour le rendu de la pagination mobile compacte
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

  // Fonction pour le rendu de la pagination desktop
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
      
      {/* Pagination intelligente pour desktop */}
      <div className="flex items-center gap-1">
        {totalPages <= 4 ? (
          // Affichage simple pour 4 pages ou moins
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
          // Affichage intelligent pour plus de 4 pages
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
      {/* Grille des membres - 4 colonnes */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {currentMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onView={onView}
            onEdit={onEdit}
            onSuspend={onSuspend}
            onContact={onContact}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4">
          {/* Informations sur l'affichage */}
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Affichage de {startIndex + 1} à {Math.min(endIndex, members.length)} sur {members.length} membres
          </p>
          
          {/* Pagination responsive */}
          <div className="flex justify-center">
            {renderMobilePagination()}
            {renderDesktopPagination()}
          </div>
        </div>
      )}
    </div>
  )
}