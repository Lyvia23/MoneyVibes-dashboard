"use client"


import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import {PieChart as  BarChart3 } from "lucide-react"
import { ChartSkeleton, DateSelector } from "./InscriptionsChart"
import { TransactionData } from "@/src/types/dashboard"
import { useState } from "react"

interface TransactionsChartProps {
  data: TransactionData[]
  loading?: boolean
  className?: string
}

export const TransactionsChart = ({ data, loading = false, className = "" }: TransactionsChartProps) => {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <ChartSkeleton />
      </div>
    )
  }

  // Filtrer les données selon la date sélectionnée
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate.getMonth() === selectedDate.month && itemDate.getFullYear() === selectedDate.year
  })

  const totalVolume = filteredData.reduce((sum, item) => sum + item.volume, 0)
  const averageWeekly = filteredData.length > 0 ? Math.round(totalVolume / filteredData.length) : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(value) + ' F'
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Volume des transactions
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalVolume)}</div>
          <div className="text-sm text-gray-600">Total • {formatCurrency(averageWeekly)}/sem</div>
        </div>
      </div>

      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
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
              tickFormatter={formatCurrency}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Volume']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="volume" 
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}