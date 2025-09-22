
"use client"

import { ChevronLeft, ChevronRight, Users } from "lucide-react"
import { TopUserData } from "@/src/types/dashboard"
import { ChartSkeleton } from "./InscriptionsChart"
import { useState } from "react"


interface TopUsersProps {
    data?: TopUserData[]
    loading?: boolean
    className?: string
}

export const TopUsersChart = ({ loading = false, className = "" }: TopUsersProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Données fixes pour 10 utilisateurs
    const topUsersData: TopUserData[] = [
        {
            id: "1",
            name: "Marie Kouassi",
            transactions: 145,
            volume: "2,450,000 F",
            rank: 1
        },
        {
            id: "2",
            name: "Jean Baptiste Ndong",
            transactions: 132,
            volume: "2,180,000 F",
            rank: 2
        },
        {
            id: "3",
            name: "Fatou Diallo",
            transactions: 118,
            volume: "1,950,000 F",
            rank: 3
        },
        {
            id: "4",
            name: "Pierre Mengue",
            transactions: 98,
            volume: "1,720,000 F",
            rank: 4
        },
        {
            id: "5",
            name: "Aminata Ba",
            transactions: 89,
            volume: "1,580,000 F",
            rank: 5
        },
        {
            id: "6",
            name: "Ousmane Traoré",
            transactions: 76,
            volume: "1,420,000 F",
            rank: 6
        },
        {
            id: "7",
            name: "Aïcha Diouf",
            transactions: 68,
            volume: "1,280,000 F",
            rank: 7
        },
        {
            id: "8",
            name: "Mamadou Sow",
            transactions: 59,
            volume: "1,150,000 F",
            rank: 8
        },
        {
            id: "9",
            name: "Khadija Camara",
            transactions: 52,
            volume: "980,000 F",
            rank: 9
        },
        {
            id: "10",
            name: "Ibrahim Dieng",
            transactions: 47,
            volume: "850,000 F",
            rank: 10
        }
    ]

    if (loading) {
        return (
            <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
                <ChartSkeleton />
            </div>
        )
    }

    const totalPages = Math.ceil(topUsersData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentUsers = topUsersData.slice(startIndex, startIndex + itemsPerPage)

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return "bg-yellow-100 text-yellow-800"
            case 2: return "bg-gray-100 text-gray-800"
            case 3: return "bg-orange-100 text-orange-800"
            default: return "bg-blue-100 text-blue-800"
        }
    }

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return "1"
            case 2: return "2"
            case 3: return "3"
            default: return rank.toString()
        }
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        Top 10 Utilisateurs Actifs
                    </h3>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {currentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(user.rank)}`}>
                                {getRankIcon(user.rank)}
                            </div>

                            <div className="flex items-center space-x-3">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}

                                <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.transactions} transactions</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-semibold text-gray-900">{user.volume}</div>
                            <div className="text-sm text-gray-500">Volume total</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages} • {topUsersData.length} utilisateurs au total
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}