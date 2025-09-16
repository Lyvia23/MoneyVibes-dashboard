import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Upload, Search, CheckCircle, XCircle } from "lucide-react";
import { ActionHistorique } from "@/src/types/kyc";

interface HistoriqueActionsProps {
  actions: ActionHistorique[];
}

export function HistoriqueActions({ actions }: HistoriqueActionsProps) {
  const getIcon = (type: string) => {
    const icons = {
      upload: Upload,
      verification: Search,
      approbation: CheckCircle,
      rejet: XCircle
    };
    return icons[type as keyof typeof icons] || Upload;
  };

  const getIconColor = (statut: string) => {
    const colors = {
      success: "text-green-600 bg-green-100",
      warning: "text-orange-600 bg-orange-100",
      info: "text-blue-600 bg-blue-100",
      error: "text-red-600 bg-red-100"
    };
    return colors[statut as keyof typeof colors] || colors.info;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Historique des actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => {
            const Icon = getIcon(action.type);
            const iconColorClass = getIconColor(action.statut);
            
            return (
              <div key={action.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                <div className={`p-2 rounded-full ${iconColorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{action.titre}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {action.date}
                    </span>
                  </div>
                  {action.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}