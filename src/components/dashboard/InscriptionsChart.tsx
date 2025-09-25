"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { InscriptionData } from "@/src/types/dashboard"
import { useState } from "react"

interface InscriptionsChartProps {
  data: InscriptionData[]
  loading?: boolean
  className?: string
}

export const ChartSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
)

// Sélecteur de mois/année
interface DateSelectorProps {
  selectedDate: { month: number; year: number }
  onChange: (date: { month: number; year: number }) => void
}

export const DateSelector = ({ selectedDate, onChange }: DateSelectorProps) => {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  const currentYear = new Date().getFullYear()
  const years = [2025] // Seulement 2025

  return (
    <div className="flex items-center gap-2 mb-4">
      <select
        value={selectedDate.month}
        onChange={(e) => onChange({ ...selectedDate, month: parseInt(e.target.value) })}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={selectedDate.year}
        onChange={(e) => onChange({ ...selectedDate, year: parseInt(e.target.value) })}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

interface InscriptionsChartProps {
  data: InscriptionData[]
  loading?: boolean
  className?: string
}

export const InscriptionsChart = ({ data, loading = false, className = "" }: InscriptionsChartProps) => {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: 2025
  })

  if (loading) {
    return (
      <div className={`bg-white rounded-lg  p-6 ${className}`}>
        <ChartSkeleton />
      </div>
    )
  }

  // Données fixes pour chaque mois de 2025
  const mockWeeklyData = {
    0: [ // Janvier 2025
      { week: "Semaine 1", inscriptions: 12, month: "Janvier", date: "2025-01-01" },
      { week: "Semaine 2", inscriptions: 18, month: "Janvier", date: "2025-01-08" },
      { week: "Semaine 3", inscriptions: 15, month: "Janvier", date: "2025-01-15" },
      { week: "Semaine 4", inscriptions: 22, month: "Janvier", date: "2025-01-22" }
    ],
    1: [ // Février 2025
      { week: "Semaine 1", inscriptions: 16, month: "Février", date: "2025-02-01" },
      { week: "Semaine 2", inscriptions: 14, month: "Février", date: "2025-02-08" },
      { week: "Semaine 3", inscriptions: 19, month: "Février", date: "2025-02-15" },
      { week: "Semaine 4", inscriptions: 21, month: "Février", date: "2025-02-22" }
    ],
    2: [ // Mars 2025
      { week: "Semaine 1", inscriptions: 20, month: "Mars", date: "2025-03-01" },
      { week: "Semaine 2", inscriptions: 17, month: "Mars", date: "2025-03-08" },
      { week: "Semaine 3", inscriptions: 23, month: "Mars", date: "2025-03-15" },
      { week: "Semaine 4", inscriptions: 25, month: "Mars", date: "2025-03-22" }
    ],
    3: [ // Avril 2025
      { week: "Semaine 1", inscriptions: 24, month: "Avril", date: "2025-04-01" },
      { week: "Semaine 2", inscriptions: 28, month: "Avril", date: "2025-04-08" },
      { week: "Semaine 3", inscriptions: 21, month: "Avril", date: "2025-04-15" },
      { week: "Semaine 4", inscriptions: 26, month: "Avril", date: "2025-04-22" }
    ],
    4: [ // Mai 2025
      { week: "Semaine 1", inscriptions: 30, month: "Mai", date: "2025-05-01" },
      { week: "Semaine 2", inscriptions: 27, month: "Mai", date: "2025-05-08" },
      { week: "Semaine 3", inscriptions: 32, month: "Mai", date: "2025-05-15" },
      { week: "Semaine 4", inscriptions: 29, month: "Mai", date: "2025-05-22" }
    ],
    5: [ // Juin 2025
      { week: "Semaine 1", inscriptions: 25, month: "Juin", date: "2025-06-01" },
      { week: "Semaine 2", inscriptions: 31, month: "Juin", date: "2025-06-08" },
      { week: "Semaine 3", inscriptions: 28, month: "Juin", date: "2025-06-15" },
      { week: "Semaine 4", inscriptions: 33, month: "Juin", date: "2025-06-22" }
    ],
    6: [ // Juillet 2025
      { week: "Semaine 1", inscriptions: 35, month: "Juillet", date: "2025-07-01" },
      { week: "Semaine 2", inscriptions: 32, month: "Juillet", date: "2025-07-08" },
      { week: "Semaine 3", inscriptions: 38, month: "Juillet", date: "2025-07-15" },
      { week: "Semaine 4", inscriptions: 34, month: "Juillet", date: "2025-07-22" }
    ],
    7: [ // Août 2025
      { week: "Semaine 1", inscriptions: 36, month: "Août", date: "2025-08-01" },
      { week: "Semaine 2", inscriptions: 40, month: "Août", date: "2025-08-08" },
      { week: "Semaine 3", inscriptions: 33, month: "Août", date: "2025-08-15" },
      { week: "Semaine 4", inscriptions: 37, month: "Août", date: "2025-08-22" }
    ],
    8: [ // Septembre 2025
      { week: "Semaine 1", inscriptions: 42, month: "Septembre", date: "2025-09-01" },
      { week: "Semaine 2", inscriptions: 39, month: "Septembre", date: "2025-09-08" },
      { week: "Semaine 3", inscriptions: 45, month: "Septembre", date: "2025-09-15" },
      { week: "Semaine 4", inscriptions: 41, month: "Septembre", date: "2025-09-22" }
    ],
    9: [ // Octobre 2025
      { week: "Semaine 1", inscriptions: 38, month: "Octobre", date: "2025-10-01" },
      { week: "Semaine 2", inscriptions: 43, month: "Octobre", date: "2025-10-08" },
      { week: "Semaine 3", inscriptions: 40, month: "Octobre", date: "2025-10-15" },
      { week: "Semaine 4", inscriptions: 44, month: "Octobre", date: "2025-10-22" }
    ],
    10: [ // Novembre 2025
      { week: "Semaine 1", inscriptions: 37, month: "Novembre", date: "2025-11-01" },
      { week: "Semaine 2", inscriptions: 41, month: "Novembre", date: "2025-11-08" },
      { week: "Semaine 3", inscriptions: 35, month: "Novembre", date: "2025-11-15" },
      { week: "Semaine 4", inscriptions: 39, month: "Novembre", date: "2025-11-22" }
    ],
    11: [ // Décembre 2025
      { week: "Semaine 1", inscriptions: 46, month: "Décembre", date: "2025-12-01" },
      { week: "Semaine 2", inscriptions: 43, month: "Décembre", date: "2025-12-08" },
      { week: "Semaine 3", inscriptions: 48, month: "Décembre", date: "2025-12-15" },
      { week: "Semaine 4", inscriptions: 45, month: "Décembre", date: "2025-12-22" }
    ]
  }

  const weeklyData = mockWeeklyData[selectedDate.month as keyof typeof mockWeeklyData] || mockWeeklyData[0]
  const total = weeklyData.reduce((sum, item) => sum + item.inscriptions, 0)
  const average = Math.round(total / weeklyData.length)

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  return (
    <div className={`bg-white shadow-lg rounded-lg  p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Inscriptions - {monthNames[selectedDate.month]} {selectedDate.year}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-600">Total • {average}/semaine</div>
        </div>
      </div>

      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [value, 'Inscriptions']}
              labelFormatter={(label) => `${label} - ${monthNames[selectedDate.month]} ${selectedDate.year}`}
            />
            <Line 
              type="monotone" 
              dataKey="inscriptions" 
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Résumé hebdomadaire */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Détail par semaine</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {weeklyData.map((week, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">{week.week}</div>
              <div className="text-lg font-semibold text-gray-900">{week.inscriptions}</div>
              <div className="text-xs text-gray-500">inscriptions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}