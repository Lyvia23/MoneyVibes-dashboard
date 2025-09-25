"use client"

import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from "recharts"
import { PieChart as PieChartIcon} from "lucide-react"
import {  TontineTypeData } from "@/src/types/dashboard"
import { ChartSkeleton } from "./InscriptionsChart"

interface TontineTypesChartProps {
  data?: TontineTypeData[]
  loading?: boolean
  className?: string
}

export const TontineTypesChart = ({ loading = false, className = "" }: TontineTypesChartProps) => {
  // Données fixes pour les 3 types de tontines
  const tontineTypesData: TontineTypeData[] = [
    { name: "Tontine de Groupe", value: 45, color: "#3b82f6", count: 15 },
    { name: "Tontine Personne", value: 35, color: "#10b981", count: 12 },
    { name: "Rejoindre une Tontine", value: 20, color: "#f59e0b", count: 8 }
  ]

  if (loading) {
    return (
      <div className={`bg-white rounded-lg  p-6 ${className}`}>
        <ChartSkeleton />
      </div>
    )
  }

  const total = tontineTypesData.reduce((sum, item) => sum + item.value, 0)

  const renderCustomLabel = (entry: TontineTypeData) => {
    const percent = ((entry.value / total) * 100).toFixed(0)
    return `${percent}%`
  }

  return (
    <div className={`bg-white shadow-lg rounded-lg  p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Types de tontines
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center">
        <div className="h-64 w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tontineTypesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
              >
                {tontineTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 ml-6">
          <div className="space-y-3">
            {tontineTypesData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.count} tontines</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
