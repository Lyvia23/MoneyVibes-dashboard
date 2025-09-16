"use client"
import { ListeMembresRisque } from "@/src/components/analyse-risques/ListeMembresRisque"
import { ScoreGlobalRisque } from "@/src/components/analyse-risques/ScoreGlobalRisque"
import { StatistiquesRisques } from "@/src/components/analyse-risques/StatistiquesRisques"
import { PageWithHeader } from "@/src/components/PageWithHeader"
import { Users, Clock, AlertTriangle, TrendingUp } from "lucide-react"


export default function AnalyseDesRisques() {
    return (
        <PageWithHeader
            title="Analyse des risques"
            description="          Identification des risques liés aux prêts et retards de paiement
"
        >
            <div className="space-y-6 p-6">

                <StatistiquesRisques />

                {/* Score global et liste des membres */}
                    <div className="lg:col-span-1">
                        <ScoreGlobalRisque />
                    </div>
                    <div className="lg:col-span-3">
                        <ListeMembresRisque />
                    </div>
                </div>
        </PageWithHeader>);
}