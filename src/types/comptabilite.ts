import { LucideIcon } from 'lucide-react'

export interface StatistiqueComptable {
  label: string
  value: string
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  className?: string
}
export interface DonneeFlux {
  mois: string
  cotisations: number
  pretsAccordes: number
  remboursements: number
}

export interface TransactionComptable {
  id: string
  date: string
  description: string
  categorie: string
  recettes: number | null
  depenses: number | null
  solde: number
}


