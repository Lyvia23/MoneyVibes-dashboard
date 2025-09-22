"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  AlertTriangle,
  Calendar,
  HandCoins,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { NotificationData } from "@/src/types/dashboard"
import { cn } from "@/src/lib/utils"

const iconMap = {
  error: AlertTriangle,
  warning: HandCoins,
  info: Calendar,
  success: CheckCircle,
}

const colorMap = {
  error: {
    bg: 'bg-red-50 border-l-red-500',
    text: 'text-red-900',
    icon: 'text-red-600',
    badge: 'bg-red-100 text-red-800',
  },
  warning: {
    bg: 'bg-yellow-50 border-l-yellow-500',
    text: 'text-yellow-900',
    icon: 'text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  info: {
    bg: 'bg-blue-50 border-l-blue-500',
    text: 'text-blue-900',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-800',
  },
  success: {
    bg: 'bg-green-50 border-l-green-500',
    text: 'text-green-900',
    icon: 'text-green-600',
    badge: 'bg-green-100 text-green-800',
  },
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-gray-600">
        Affichage de {startItem} à {endItem} sur {totalItems} notification{totalItems > 1 ? 's' : ''}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Précédent</span>
        </Button>
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={currentPage === page ? "bg-black hover:bg-black/10" : ""}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <span className="hidden sm:inline mr-1">Suivant</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface NotificationItemProps {
  notification: NotificationData
  onAction?: (notification: NotificationData) => void
}

function NotificationItem({ notification, onAction }: NotificationItemProps) {
  const Icon = iconMap[notification.type]
  const colors = colorMap[notification.type]

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const handleAction = () => {
    if (onAction) {
      onAction(notification)
    }
  }

  return (
    <div className={cn(
      "border-l-4 p-4 rounded-r-lg transition-all duration-200 hover:shadow-sm",
      colors.bg
    )}>
      <div className="flex items-start gap-3 flex-wrap">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", colors.icon)} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h4 className={cn("font-medium truncate", colors.text)}>
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(notification.createdAt)}
              </Badge>
            </div>
          </div>

          <p className={cn("text-sm mb-3 leading-relaxed", colors.text, "opacity-90")}>
            {notification.message}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-3 font-medium hover:bg-white/50 mt-2 sm:mt-0",
              colors.text
            )}
            onClick={handleAction}
          >
            {notification.action}
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface NotificationsProps {
  data: NotificationData[]
  loading?: boolean
  onAction?: (notification: NotificationData) => void
  className?: string
  // Nouvelles props pour la pagination
  currentPage?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  enablePagination?: boolean
}

export function Notifications({ 
  data, 
  loading, 
  onAction, 
  className,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  enablePagination = false
}: NotificationsProps) {
  // Calculs pour la pagination
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Données paginées
  const paginatedData = enablePagination 
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Alertes et notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="border-l-4 border-gray-200 p-4 rounded-r-lg bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-300 rounded mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-3 bg-gray-300 rounded w-full" />
                      <div className="h-3 bg-gray-300 rounded w-2/3" />
                      <div className="h-6 bg-gray-300 rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const unreadCount = data.filter(n => !n.isRead).length

  return (
    <Card className={className}>
      <CardHeader className="flex flex-wrap items-center justify-between gap-2 space-y-0">
        <div className="flex items-center gap-3 min-w-0">
          <CardTitle className="text-lg font-semibold truncate">
            Alertes et notifications
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs whitespace-nowrap">
              {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}
            </Badge>
          )}
        </div>

        {data.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap mt-2 sm:mt-0"
          >
            Tout marquer comme lu
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">
              Aucune notification
            </h3>
            <p className="text-sm text-muted-foreground">
              Toutes vos alertes ont été traitées
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedData.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onAction={onAction}
                />
              ))}
            </div>

            {/* Pagination */}
            {enablePagination && totalPages > 1 && onPageChange && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}