"use client"
import { ListeMembresRisque } from "@/src/components/analyse-risques/ListeMembresRisque"
import { ScoreGlobalRisque } from "@/src/components/analyse-risques/ScoreGlobalRisque"
import { StatsCard } from "@/src/components/StatsCard"
import { useSetPageInfo } from "@/src/Context/pageContext"
import { AlertTriangle, Clock, TrendingUp, Users } from "lucide-react"


export default function AnalyseDesRisques() {

    useSetPageInfo({
        title: "Analyse des risques",
        description: "Identification des risques liés aux prêts et retards de paiement",
        notificationCount: 3
    })
    const statistiques = [
        {
            label: "Membres à risque",
            value: "12",
            icon: Users,
            iconColor: "text-red-600",
            iconBgColor: "bg-red-100"
        },
        {
            label: "Retards de paiement",
            value: "8",
            icon: Clock,
            iconColor: "text-orange-600",
            iconBgColor: "bg-orange-100"
        },
        {
            label: "Prêts en défaut",
            value: "3",
            icon: AlertTriangle,
            iconColor: "text-red-600",
            iconBgColor: "bg-red-100"
        },
        {
            label: "Score moyen",
            value: "73%",
            icon: TrendingUp,
            iconColor: "text-green-600",
            iconBgColor: "bg-green-100"
        }
    ]


    return (

        <div className="space-y-6 p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistiques.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Score global et liste des membres */}
            <div className="lg:col-span-1">
                <ScoreGlobalRisque />
            </div>
            <div className="lg:col-span-3">
                <ListeMembresRisque />
            </div>
        </div>
    );
}