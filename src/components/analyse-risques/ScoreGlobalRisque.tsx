"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface ScoreGlobalRisqueProps {
  score?: number
  className?: string
}

export function ScoreGlobalRisque({ 
  score = 73,
  className 
}: ScoreGlobalRisqueProps) {
  // Détermine la couleur basée sur le score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Score global de risque
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score principal */}
        <div className="flex items-center justify-center">
          <div className={`
            relative w-32 h-32 rounded-full flex items-center justify-center
            ${getScoreBgColor(score)}
          `}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-sm text-muted-foreground">
                Score moyen
              </div>
            </div>
            {/* Cercle de progression */}
            <svg 
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 128 128"
            >
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                className={getProgressColor(score).replace('bg-', 'text-')}
              />
            </svg>
          </div>
        </div>

        {/* Légende */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Excellent (80-100%)
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              Moyen (60-79%)
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              Élevé (0-59%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}