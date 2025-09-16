"use client"

import { PageHeader } from "./PageHeader"

interface User {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
}

interface PageWithHeaderProps {
  title: string
  description: string
  children: React.ReactNode
  showHeader?: boolean
}

// Utilisateur par défaut (à remplacer par votre système d'auth)
const getCurrentUser = (): User => ({
  id: "1",
  name: "Admin Principal",
  role: "Administrateur",
  email: "admin@tontineapp.com",
  avatar: undefined
})

export function PageWithHeader({ 
  title, 
  description, 
  children, 
  showHeader = true 
}: PageWithHeaderProps) {
  const currentUser = getCurrentUser()

  // Handlers pour les actions utilisateur
  const handleNotificationClick = () => {
    console.log("Notifications clicked")
    // Ajouter votre logique de notifications ici
  }

  const handleProfileClick = () => {
    console.log("Profile clicked")
    // Ajouter votre logique de profil ici
  }

  const handleSettingsClick = () => {
    console.log("Settings clicked")
    // Ajouter votre logique de paramètres ici
  }

  const handleLogoutClick = () => {
    console.log("Logout clicked")
    // Ajouter votre logique de déconnexion ici
  }

  return (
    <>
      {showHeader && (
        <PageHeader
          title={title}
          description={description}
          user={currentUser}
          notificationCount={3} // À remplacer par vos données réelles
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onLogoutClick={handleLogoutClick}
        />
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </>
  )
}