import { Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/src/utils";
import { mockOperatorStats } from "@/src/types/transactions";

export default function StatutOperateurs(){

    return(
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Statut des Opérateurs Mobile Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(mockOperatorStats).map(([operator, stats]) => (
              <div key={operator} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold capitalize">{operator}</h4>
                  <Badge 
                    variant={stats.status === 'online' ? 'default' : 'destructive'}
                    className={stats.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {stats.status === 'online' ? 'En ligne' : 'Maintenance'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Volume: {formatCurrency(stats.volume)}</p>
                <p className="text-sm text-gray-600">Taux de réussite: {stats.successRate}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    );
}