"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { MoreHorizontal } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { PretStatusData, TooltipPayload } from "@/src/types/dashboard"

interface PretsChartProps {
  data: PretStatusData[]
  loading?: boolean
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

export function PretsChart({ data, loading, className }: PretsChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.count} prêts ({data.value}%)
          </p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <Card className={`flex flex-col ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold">
            Statut des prêts
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
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-4 md:px-6">
        <CardTitle className="text-base md:text-lg font-semibold">
          Statut des prêts
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 px-4 md:px-6 pb-4 md:pb-6">
        <div className="h-64 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="70%"
                innerRadius="45%"
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Légende personnalisée avec hauteur contrôlée */}
        <div className="mt-4 space-y-2 min-h-[120px] flex flex-col justify-between">
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs md:text-sm font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary" className="text-xs h-5 px-2">
                    {item.count}
                  </Badge>
                  <span className="text-xs md:text-sm text-muted-foreground min-w-[2.5rem] text-right">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé total - hauteur fixe pour alignement */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm font-medium">Total des prêts</span>
              <Badge variant="outline" className="font-semibold text-xs h-5 px-2">
                {total}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}