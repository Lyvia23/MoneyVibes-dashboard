'se client';

import { AlertTriangle, Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { mockAlerts } from "@/src/types/transactions";

export default function AlertFinancieres() {
    
  return (
    <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertes Financières
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'high' ? 'text-red-500' : 
                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    alert.severity === 'high' ? 'border-red-200 text-red-700' : 
                    alert.severity === 'medium' ? 'border-yellow-200 text-yellow-700' : 
                    'border-blue-200 text-blue-700'
                  }
                >
                  {alert.severity === 'high' ? 'Critique' : 
                   alert.severity === 'medium' ? 'Moyen' : 'Faible'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}       