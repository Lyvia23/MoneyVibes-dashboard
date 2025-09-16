"use client"

import { useState } from "react"
import { MemberCard, Member } from "./MemberCard"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)))
  }

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
    <div className={cn("space-y-2", className)}>
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
        <div className="flex items-center justify-center pt-4">
          <p className="text-sm text-gray-500">
            Affichage de {startIndex + 1} à {Math.min(endIndex, members.length)} sur {members.length} membres
          </p>
        </div>
      )}
    </div>
  )
}