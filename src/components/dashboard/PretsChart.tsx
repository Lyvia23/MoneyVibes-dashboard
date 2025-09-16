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
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Statut des prêts
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

  const total = data.reduce((sum, item) => sum + item.count, 0)

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.count} prêts ({data.value}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          Statut des prêts
        </CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
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

        {/* Légende personnalisée avec plus de détails */}
        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {item.count}
                </Badge>
                <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé total */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total des prêts</span>
            <Badge variant="outline" className="font-semibold">
              {total}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}