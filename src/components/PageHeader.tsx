"use client"

import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Bell, Settings, LogOut, User } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "./ui/button"
import { ReactNode } from "react"

interface User {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
}

interface PageHeaderProps {
  title: string
  description: string
  user: User
  notificationCount?: number
  onNotificationClick?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onLogoutClick?: () => void
  className?: string
  leftAction?: ReactNode // Nouveau prop pour le bouton toggle
}

export function PageHeader({
  title,
  description,
  user,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  className,
  leftAction
}: PageHeaderProps) {
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm", className)}>
      <div className="flex h-24 md:h-32 items-center px-6 md:px-8">
        {/* Action gauche (bouton toggle sidebar) */}
        {leftAction && (
          <div className="flex items-center">
            {leftAction}
          </div>
        )}

        {/* Titre et description */}
        <div className="flex-1 space-y-0,5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm md:text-base mb-2 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Actions et profil utilisateur */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative h-9 w-9"
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs font-medium"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 md:gap-3 h-auto p-1.5 md:p-2 rounded-lg hover:bg-accent">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold text-xs md:text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="font-medium text-sm md:text-base leading-none">{user.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="space-y-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email || user.role}</p>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={onLogoutClick} 
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}