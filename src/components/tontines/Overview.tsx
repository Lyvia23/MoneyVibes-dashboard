import { progressionData, tontineDetails } from "@/src/types/tontine";
import { Calendar, DollarSign, Edit, Settings, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function VueEnsemble() {
  const metriques = [
    { 
      label: "Participants", 
      value: tontineDetails.nombreParticipants, 
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      label: "Montant collecté", 
      value: `${tontineDetails.montantCollecte.toLocaleString()} XOF`, 
      icon: DollarSign,
      color: "text-green-600", 
      bgColor: "bg-green-100"
    },
    { 
      label: "Progression", 
      value: `${tontineDetails.progression}%`, 
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      label: "Prochain tour", 
      value: new Date(tontineDetails.prochainTour).toLocaleDateString('fr-FR'), 
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{tontineDetails.nom}</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="capitalize">
                  {tontineDetails.type}
                </Badge>
                <Badge variant={tontineDetails.statut === 'active' ? 'default' : 'secondary'}>
                  {tontineDetails.statut}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-sm text-gray-800 mt-1">{tontineDetails.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date début</label>
                  <p className="text-sm text-gray-800 mt-1">
                    {new Date(tontineDetails.dateDebut).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date fin</label>
                  <p className="text-sm text-gray-800 mt-1">
                    {new Date(tontineDetails.dateFin).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Montant par cotisation</label>
                  <p className="text-sm text-gray-800 mt-1">{tontineDetails.montant.toLocaleString()} XOF</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Périodicité</label>
                  <p className="text-sm text-gray-800 mt-1 capitalize">{tontineDetails.periodicite}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Bénéficiaire actuel</label>
                <p className="text-sm text-gray-800 mt-1">{tontineDetails.beneficiaireActuel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metriques.map((metrique, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metrique.label}</p>
                  <p className="text-2xl font-bold mt-1">{metrique.value}</p>
                </div>
                <div className={`p-3 rounded-full ${metrique.bgColor}`}>
                  <metrique.icon className={`h-6 w-6 ${metrique.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphique progression */}
      <Card>
        <CardHeader>
          <CardTitle>Graphique de progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} XOF`, '']} />
                <Line type="monotone" dataKey="collecte" stroke="#2563eb" strokeWidth={2} name="Collecté" />
                <Line type="monotone" dataKey="objectif" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" name="Objectif" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
