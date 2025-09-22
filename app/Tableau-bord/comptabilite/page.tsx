"use client"

import { GrandLivreComptable } from "@/src/components/comptabilité/GrandLivreComptable"
import { GraphiqueFluxFinancier } from "@/src/components/comptabilité/GraphiqueFluxFinancier"
import { StatsCard } from "@/src/components/StatsCard"
import { useSetPageInfo } from "@/src/Context/pageContext"
import { DonneeFlux, StatistiqueComptable, TransactionComptable } from "@/src/types/comptabilite"
import { TrendingUp, TrendingDown, DollarSign, Receipt } from "lucide-react"




export default function PageComptabilite() {
  // Données des statistiques
  const statistiques: StatistiqueComptable[] = [
    {
      label: "Total Recettes",
      value: "2,450,000 XOF",
      icon: TrendingUp,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      label: "Total Dépenses",
      value: "1,850,000 XOF",
      icon: TrendingDown,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    },
    {
      label: "Solde Net",
      value: "600,000 XOF",
      icon: DollarSign,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      label: "Transactions",
      value: "142",
      icon: Receipt,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"
    }
  ]

  // Données du graphique
  const donneesFlux: DonneeFlux[] = [
    { mois: "Oct 2023", cotisations: 180000, pretsAccordes: 120000, remboursements: 80000 },
    { mois: "Nov 2023", cotisations: 220000, pretsAccordes: 150000, remboursements: 95000 },
    { mois: "Déc 2023", cotisations: 190000, pretsAccordes: 180000, remboursements: 110000 },
    { mois: "Jan 2024", cotisations: 250000, pretsAccordes: 200000, remboursements: 125000 },
    { mois: "Fév 2024", cotisations: 210000, pretsAccordes: 170000, remboursements: 140000 },
    { mois: "Mar 2024", cotisations: 280000, pretsAccordes: 190000, remboursements: 160000 }
  ]

  // Données du grand livre
  const transactionsComptables: TransactionComptable[] = [
    {
      id: "1",
      date: "15 Jan 2024",
      description: "Cotisation mensuelle - Marie Kouadio",
      categorie: "Cotisations",
      recettes: 25000,
      depenses: null,
      solde: 625000
    },
    {
      id: "2",
      date: "14 Jan 2024",
      description: "Prêt accordé - Jean Baptiste",
      categorie: "Prêts",
      recettes: null,
      depenses: 150000,
      solde: 600000
    },
    {
      id: "3",
      date: "12 Jan 2024",
      description: "Frais de gestion mensuel",
      categorie: "Frais",
      recettes: null,
      depenses: 5000,
      solde: 750000
    },
    {
      id: "4",
      date: "10 Jan 2024",
      description: "Remboursement prêt - Fatou Diallo",
      categorie: "Remboursement",
      recettes: 15000,
      depenses: null,
      solde: 755000
    },
    {
      id: "5",
      date: "08 Jan 2024",
      description: "Cotisation mensuelle - Amadou Traoré",
      categorie: "Cotisations",
      recettes: 30000,
      depenses: null,
      solde: 740000
    },
    {
      id: "6",
      date: "05 Jan 2024",
      description: "Assemblée générale - Location salle",
      categorie: "Événements",
      recettes: null,
      depenses: 20000,
      solde: 710000
    }
  ]

  useSetPageInfo({
    title: "Comptabilité",
    description: "Suivi des finances globales et grand livre comptable",
    notificationCount: 3
  })

  return (

    <div className="space-y-6 p-6 overflow-x-hidden ">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistiques.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      {/* Section du graphique */}
      <GraphiqueFluxFinancier donnees={donneesFlux} />

      {/* Section du grand livre comptable */}
      <GrandLivreComptable transactions={transactionsComptables} />
    </div>

  )
}