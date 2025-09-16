"use client"

import { DonneeFlux } from "@/src/types/comptabilite"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"


interface GraphiqueFluxFinancierProps {
  donnees: DonneeFlux[]
}
interface TooltipPayloadEntry {
  name: string
  value: number
  color: string
}

interface TooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}

// Composant personnalisé pour le tooltip
const TooltipPersonnalise = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString('fr-FR')} FCFA
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function GraphiqueFluxFinancier({ donnees }: GraphiqueFluxFinancierProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Flux financiers mensuels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={donnees}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="mois" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#e0e0e0' }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#e0e0e0' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickFormatter={(value) => `${(value / 1000)}k`}
              />
              <Tooltip content={<TooltipPersonnalise />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="cotisations" 
                fill="#22c55e" 
                name="Cotisations"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="pretsAccordes" 
                fill="#f97316" 
                name="Prêts accordés"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="remboursements" 
                fill="#6b7280" 
                name="Remboursements"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Légende personnalisée avec les totaux */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Cotisations</span>
            </div>
            <span className="text-sm font-bold text-green-600">
              {donnees.reduce((sum, item) => sum + item.cotisations, 0).toLocaleString('fr-FR')} FCFA
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Prêts accordés</span>
            </div>
            <span className="text-sm font-bold text-orange-600">
              {donnees.reduce((sum, item) => sum + item.pretsAccordes, 0).toLocaleString('fr-FR')} FCFA
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Remboursements</span>
            </div>
            <span className="text-sm font-bold text-gray-600">
              {donnees.reduce((sum, item) => sum + item.remboursements, 0).toLocaleString('fr-FR')} FCFA
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}