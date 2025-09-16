"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageInfo {
  title: string;
  description: string;
}

interface PageContextType {
  pageInfo: PageInfo;
  setPageInfo: (info: PageInfo) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    title: "Tableau de bord",
    description: "Vue d'ensemble de votre tontine"
  });

  return (
    <PageContext.Provider value={{ pageInfo, setPageInfo }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageInfo() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageInfo must be used within a PageProvider');
  }
  return context;
}

// Hook personnalisé pour définir les informations de page
export function useSetPageInfo(title: string, description: string) {
  const { setPageInfo } = usePageInfo();
  
  React.useEffect(() => {
    setPageInfo({ title, description });
  }, [title, description, setPageInfo]);
}