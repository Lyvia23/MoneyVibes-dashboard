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

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Évolution des cotisations
          </CardTitle>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 animate-pulse bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Chargement du graphique...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          Évolution des cotisations
        </CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                className="text-xs"
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Montant']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ 
                  fill: '#f59e0b', 
                  strokeWidth: 2, 
                  r: 4,
                  className: "hover:r-6 transition-all duration-200"
                }}
                activeDot={{ 
                  r: 6, 
                  fill: '#f59e0b',
                  stroke: '#fff',
                  strokeWidth: 2
                }}
                className="drop-shadow-sm"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Résumé des données */}
        <div className="mt-4 pt-4 border-t flex justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Total période: </span>
            <span className="font-medium">
              {formatCurrency(data.reduce((sum, item) => sum + item.value, 0))}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Moyenne: </span>
            <span className="font-medium">
              {formatCurrency(data.reduce((sum, item) => sum + item.value, 0) / data.length)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}