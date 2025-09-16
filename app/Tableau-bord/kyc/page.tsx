"use client";
import { useState } from 'react';
import Link from 'next/link';
import { PageWithHeader } from '@/src/components/PageWithHeader';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent} from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Eye, User } from 'lucide-react';

interface UtilisateurKYCListe {
  id: string;
  nomComplet: string;
  email: string;
  statut: 'en_attente' | 'approuve' | 'rejete' | 'en_cours';
  dateCreation: string;
}

export default function KYCListePage() {
  // Données d'exemple - à remplacer par des appels API
  const [utilisateurs] = useState<UtilisateurKYCListe[]>([
    {
      id: '1',
      nomComplet: 'Marie Kouadio',
      email: 'marie.kouadio@email.com',
      statut: 'en_attente',
      dateCreation: '15 Jan 2025'
    },
    {
      id: '2',
      nomComplet: 'Jean Bakayoko',
      email: 'jean.bakayoko@email.com',
      statut: 'en_cours',
      dateCreation: '14 Jan 2025'
    },
    {
      id: '3',
      nomComplet: 'Fatou Traoré',
      email: 'fatou.traore@email.com',
      statut: 'approuve',
      dateCreation: '13 Jan 2025'
    }
  ]);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'approuve': return 'bg-green-100 text-green-800';
      case 'rejete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'approuve': return 'Approuvé';
      case 'rejete': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  return (
    <PageWithHeader
      title="Gestion KYC"
      description="Liste des demandes de validation KYC"
    >
      <div className="space-y-6 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-4">
            {utilisateurs.map((utilisateur) => (
              <Card key={utilisateur.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{utilisateur.nomComplet}</h3>
                        <p className="text-sm text-gray-600">{utilisateur.email}</p>
                        <p className="text-xs text-gray-500">Créé le {utilisateur.dateCreation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(utilisateur.statut)}>
                        {getStatusLabel(utilisateur.statut)}
                      </Badge>
                      <Link href={`/Tableau-bord/kyc/${utilisateur.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageWithHeader>
  );
}