import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface RepaymentRateProps {
  // Vous pouvez ajouter des props ici si nécessaire pour afficher des données
  className?: string
}

export function RepaymentRate({ className }: RepaymentRateProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Taux de remboursement</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Contenu du taux de remboursement à définir selon vos besoins */}
        <div className="text-center py-8 text-muted-foreground">
          <p>Données du taux de remboursement</p>
          <p className="text-sm">Contenu à intégrer</p>
        </div>
      </CardContent>
    </Card>
  )
}