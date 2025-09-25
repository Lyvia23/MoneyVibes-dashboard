"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { MoreHorizontal } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Button } from "../ui/button"
import { CotisationData } from "@/src/types/dashboard"

interface CotisationsChartProps {
  data: CotisationData[]
  loading?: boolean
  className?: string
}

export function CotisationsChart({ data, loading, className }: CotisationsChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value) + ' F'
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const average = data.length > 0 ? total / data.length : 0

  if (loading) {
    return (
      <Card className={`bg-white shadow-lg rounded-lg  p-6 ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold">
            Évolution des cotisations
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 px-4 md:px-6 pb-4 md:pb-6">
          <div className="h-64 md:h-72 animate-pulse bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Chargement du graphique...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-white shadow-lg rounded-lg  p-6 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-4 md:px-6">
        <CardTitle className="text-base md:text-lg font-semibold">
          Évolution des cotisations
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 px-4 md:px-6 pb-4 md:pb-6">
        <div className="h-64 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                className="text-xs"
                width={45}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Montant']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ 
                  fill: '#f59e0b', 
                  strokeWidth: 2, 
                  r: 3
                }}
                activeDot={{ 
                  r: 5, 
                  fill: '#f59e0b',
                  stroke: '#fff',
                  strokeWidth: 2
                }}
                className="drop-shadow-sm"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Résumé des données - hauteur fixe pour alignement */}
        <div className="mt-4 pt-4 border-t min-h-[60px] flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs md:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-muted-foreground whitespace-nowrap">Total période:</span>
              <span className="font-medium">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-muted-foreground whitespace-nowrap">Moyenne:</span>
              <span className="font-medium">
                {formatCurrency(average)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}