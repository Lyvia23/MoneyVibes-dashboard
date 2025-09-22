"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
}

interface PageInfo {
  title: string
  description: string
  user: User
  notificationCount: number
}

interface PageContextType {
  pageInfo: PageInfo
  setPageInfo: (info: Partial<PageInfo>) => void
  updatePageInfo: (updates: Partial<PageInfo>) => void
}

const defaultUser: User = {
  id: "1",
  name: "Admin Principal",
  role: "Administrateur",
  email: "admin@moneyvibes.com"
}

const defaultPageInfo: PageInfo = {
  title: "Tableau de bord",
  description: "Vue d'ensemble de votre gestion financière",
  user: defaultUser,
  notificationCount: 0
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageInfo, setPageInfoState] = useState<PageInfo>(defaultPageInfo)

  const setPageInfo = (info: Partial<PageInfo>) => {
    setPageInfoState(prev => ({
      ...prev,
      ...info
    }))
  }

  const updatePageInfo = (updates: Partial<PageInfo>) => {
    setPageInfoState(prev => ({
      ...prev,
      ...updates
    }))
  }

  return (
    <PageContext.Provider value={{ pageInfo, setPageInfo, updatePageInfo }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePageInfo() {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePageInfo must be used within a PageProvider')
  }
  return context
}

// ✅ Hook personnalisé avec protection contre la boucle infinie
export function useSetPageInfo(info: Partial<PageInfo>) {
  const { setPageInfo, pageInfo } = usePageInfo()
  
  useEffect(() => {
    const hasChanged = Object.entries(info).some(
      ([key, value]) => (pageInfo as any)[key] !== value
    )

    if (hasChanged) {
      setPageInfo(info)
    }
  }, [info, pageInfo, setPageInfo])
}
