"use client"

import { Ticket, Clock, CheckCircle, Timer } from "lucide-react"

import { PageWithHeader } from "@/src/components/PageWithHeader"
import { StatsCard } from "@/src/components/StatsCard";
import { OngletSupport } from "@/src/components/support-audit/OngletSupport";
import SupportDashboard from "@/src/components/support-audit/SupportDashboard";
import JournalAudit from "@/src/components/support-audit/JournalAudit";

// Données pour les stats
const donneesStats = [
  {
    label: "Tickets ouverts",
    value: 8,
    icon: Ticket,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100"
  },
  {
    label: "En cours",
    value: 5,
    icon: Clock,
    iconColor: "text-yellow-600",
    iconBgColor: "bg-yellow-100"
  },
  {
    label: "Résolus aujourd'hui",
    value: 12,
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100"
  },
  {
    label: "Temps moyen",
    value: "2.4h",
    icon: Timer,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100"
  }
]

export default function SupportAuditPage() {
  return (
     <PageWithHeader
                title="Support & Audit"
                description="Gestion des réclamations, assistance et vérifications système"
            >
                <div className="space-y-6 p-6">
      
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donneesStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Onglets et contenu */}
        <div className="space-y-6">
          
      
          <SupportDashboard />
          <JournalAudit />
        </div>
      </div>
    </PageWithHeader>);
}