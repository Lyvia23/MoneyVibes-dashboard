"use client"

import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { 
  Phone, 
  Calendar,
  CreditCard,
  MoreVertical,
  Eye,
  Edit,
  UserX,
  MessageCircle
} from "lucide-react"
import { cn } from "@/src/lib/utils"

export interface Member {
  id: string
  name: string
  phone: string
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  contributions: {
    current: number
    total: number
  }
}

interface MemberCardProps {
  member: Member
  onView?: (member: Member) => void
  onEdit?: (member: Member) => void
  onSuspend?: (member: Member) => void
  onContact?: (member: Member) => void
  className?: string
}

export function MemberCard({ 
  member, 
  onView,
  onEdit,
  onSuspend,
  onContact,
  className 
}: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusConfig = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Actif',
          className: 'bg-green-100 text-green-700 text-xs px-2 py-1'
        }
      case 'inactive':
        return {
          label: 'Inactif',
          className: 'bg-red-100 text-red-700 text-xs px-2 py-1'
        }
      case 'suspended':
        return {
          label: 'En attente',
          className: 'bg-yellow-100 text-yellow-700 text-xs px-2 py-1'
        }
      default:
        return {
          label: 'Inconnu',
          className: 'bg-gray-100 text-gray-700 text-2xl px-2 py-1'
        }
    }
  }

  const statusConfig = getStatusConfig(member.status)
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card className={cn("group relative overflow-hidden bg-white border border-gray-200 ", className)}>
      <CardContent className="p-6">
        {/* Header avec avatar, nom, statut et menu */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col items-center text-center flex-1">
            <Avatar className="h-14 w-14 mb-2">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-xl">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-900 text-xl mb-1">
              {member.name}
            </h3>
            <p className="text-xl text-gray-500 mb-2">
              Membre depuis {formatDate(member.joinDate)}
            </p>
            <span className={cn("rounded-full font-medium", statusConfig.className)}>
              {statusConfig.label}
            </span>
          </div>

          {/* Menu actions - visible au hover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && (
                <DropdownMenuItem onClick={() => onView(member)} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(member)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
              )}
              {onContact && (
                <DropdownMenuItem onClick={() => onContact(member)} className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contacter
                </DropdownMenuItem>
              )}
              {onSuspend && (
                <DropdownMenuItem 
                  onClick={() => onSuspend(member)} 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Suspendre
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Informations membre */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-xl">Téléphone:</span>
            <span className="text-gray-900">{member.phone}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-xl">Cotisations:</span>
            <span className="text-gray-900 font-semibold">
              {member.contributions.current}/{member.contributions.total}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}