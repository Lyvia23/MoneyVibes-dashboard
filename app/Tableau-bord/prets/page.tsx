"use client"

import { PendingRequests } from "@/src/components/prets/PendingRequests"
import { PretsHistorique } from "@/src/components/prets/PretsHistorique"
import { RepaymentRate } from "@/src/components/prets/RepaymentRate"
import { StatsGrid } from "@/src/components/prets/StatsGrid"
import { UpcomingRepayments } from "@/src/components/prets/UpcomingRepayments"
import { useSetPageInfo } from "@/src/Context/pageContext"
import { useState } from "react"

// Types pour les données
interface StatsData {
    activeLoans: number
    totalAmount: string
    pending: number
    overdue: number
}

interface PendingRequest {
    id: string
    name: string
    avatar?: string
    memberSince: string
    amount: string
    duration: string
    purpose: string
}

interface UpcomingRepayment {
    id: string
    memberName: string
    amount: string
    dueDate: string
    status: 'upcoming' | 'overdue' | 'today'
}

interface LoanHistoryItem {
    id: string
    memberName: string
    avatar?: string
    category: string
    amount: string
    duration: string
    progress: number
    progressLabel: string
    status: 'active' | 'completed' | 'overdue' | 'cancelled'
}

export default function LoanManagementPage() {
    // États pour les données
    const [statsData] = useState<StatsData>({
        activeLoans: 12,
        totalAmount: "1,850,000 FCFA",
        pending: 5,
        overdue: 3
    })

    const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
        {
            id: "1",
            name: "Jean Baptiste",
            memberSince: "Membre depuis 2 ans",
            amount: "150,000 FCFA",
            duration: "12 mois",
            purpose: "Commerce"
        },
        {
            id: "2",
            name: "Fatou Diallo",
            memberSince: "Membre depuis 1 an",
            amount: "80,000 FCFA",
            duration: "6 mois",
            purpose: "Education"
        },
        {
            id: "3",
            name: "Amadou Traoré",
            memberSince: "Membre depuis 3 ans",
            amount: "200,000 FCFA",
            duration: "18 mois",
            purpose: "Agriculture"
        }
    ])

    const [upcomingRepayments] = useState<UpcomingRepayment[]>([
        {
            id: "1",
            memberName: "Marie Kouadio",
            amount: "25,000 FCFA",
            dueDate: "25 Jan 2024",
            status: "upcoming"
        },
        {
            id: "2",
            memberName: "Jean Baptiste",
            amount: "15,000 FCFA",
            dueDate: "20 Jan",
            status: "overdue"
        },
        {
            id: "3",
            memberName: "Aicha Sanogo",
            amount: "30,000 FCFA",
            dueDate: "30 Jan 2024",
            status: "today"
        }
    ])

    const [loanHistory] = useState<LoanHistoryItem[]>([
        {
            id: "1",
            memberName: "Marie Kouadio",
            category: "Commerce",
            amount: "120,000 FCFA",
            duration: "12 mois",
            progress: 75,
            progressLabel: "75% remboursé",
            status: "active"
        },
        {
            id: "2",
            memberName: "Jean Baptiste",
            category: "Agriculture",
            amount: "150,000 FCFA",
            duration: "12 mois",
            progress: 40,
            progressLabel: "40% remboursé",
            status: "active"
        },
        {
            id: "3",
            memberName: "Fatou Diallo",
            category: "Education",
            amount: "80,000 FCFA",
            duration: "6 mois",
            progress: 100,
            progressLabel: "Remboursé",
            status: "completed"
        },
        {
            id: "4",
            memberName: "Amadou Traoré",
            category: "Commerce",
            amount: "200,000 FCFA",
            duration: "18 mois",
            progress: 20,
            progressLabel: "20% remboursé",
            status: "overdue"
        }
    ])

    // Gestionnaires d'événements
    const handleApproveRequest = (id: string) => {
        console.log("Approuver la demande:", id)
        // Logique pour approuver une demande
        setPendingRequests(prev => prev.filter(req => req.id !== id))
    }

    const handleRejectRequest = (id: string) => {
        console.log("Rejeter la demande:", id)
        // Logique pour rejeter une demande
        setPendingRequests(prev => prev.filter(req => req.id !== id))
    }

    const handleStatusFilter = (status: string) => {
        console.log("Filtrer par statut:", status)
        // Logique pour filtrer l'historique par statut
    }

    // Gestionnaires individuels pour les actions sur les prêts
    const handleViewDetails = (loanId: string) => {
        console.log("Voir les détails du prêt:", loanId)
        // Logique pour afficher les détails d'un prêt
        // Exemple: ouvrir un modal ou naviguer vers une page de détails
    }

    const handleEditLoan = (loanId: string) => {
        console.log("Modifier le prêt:", loanId)
        // Logique pour modifier un prêt
        // Exemple: ouvrir un formulaire d'édition
    }

    const handleDeleteLoan = (loanId: string) => {
        console.log("Supprimer le prêt:", loanId)
        // Logique pour supprimer un prêt
        // Exemple: afficher une confirmation puis supprimer
        if (confirm("Êtes-vous sûr de vouloir supprimer ce prêt ?")) {
            // Ici vous pourriez mettre à jour l'état pour retirer le prêt de la liste
            // setLoanHistory(prev => prev.filter(loan => loan.id !== loanId))
        }
    }
      useSetPageInfo({
    title: "Gestion des prêts",
    description: "Gérez les demandes et remboursements de prêts",
    notificationCount: 3
  })

    return (

            <div className="space-y-6 p-6">
                {/* Section des statistiques */}
                <StatsGrid data={statsData} />

                {/* Section principale restructurée */}
                <div className="space-y-6">
                    {/* Demandes en attente - Ligne complète en haut */}
                    <div>
                        <PendingRequests
                            requests={pendingRequests}
                            onApprove={handleApproveRequest}
                            onReject={handleRejectRequest}
                        />
                    </div>

                    {/* Taux de remboursement et Échéances à venir - Deux colonnes en bas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RepaymentRate />
                        <UpcomingRepayments repayments={upcomingRepayments} />
                    </div>
                </div>

                {/* Section inférieure - Historique des prêts */}
                <div>
                    <PretsHistorique
                        loans={loanHistory}
                        onStatusFilter={handleStatusFilter}
                        onViewDetails={handleViewDetails}
                        onEditLoan={handleEditLoan}
                        onDeleteLoan={handleDeleteLoan}
                    />
                </div>
            </div>

    )
}