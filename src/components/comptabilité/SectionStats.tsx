"use client"

import { StatistiqueComptable } from "@/src/types/comptabilite"
import { StatsCard } from "../StatsCard"



interface SectionStatsProps {
  statistiques: StatistiqueComptable[]
}

export function SectionStats({ statistiques }: SectionStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statistiques.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBgColor={stat.iconBgColor}
          className={stat.className}
        />
      ))}
    </div>
  )
}