
"use client"

import { ContributionForm } from '@/src/components/cotisations/ContributionForm';
import { ContributionHistory } from '@/src/components/cotisations/ContributionHistory';
import { StatsCard } from '@/src/components/StatsCard';
import { useSetPageInfo } from '@/src/Context/pageContext';
import React from 'react';
import { Banknote, Calendar, Clock, AlertTriangle } from 'lucide-react';

// Types pour les données
export interface Member {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Contribution {
  id: string;
  member: Member;
  amount: number;
  scheduledDate: string;
  paidDate?: string;
  status: 'payé' | 'en_attente' | 'en_retard';
}


const mockMembers: Member[] = [
  { id: '1', name: 'Marie Kouadio', phone: '+225 07 123 456' },
  { id: '2', name: 'Jean Baptiste', phone: '+225 05 987 654' },
  { id: '3', name: 'Fatou Diallo', phone: '+225 01 456 789' },
  { id: '4', name: 'Amadou Traoré', phone: '+225 03 321 654' },
  { id: '5', name: 'Aicha Sanogo', phone: '+225 06 789 123' }
];

const mockContributions: Contribution[] = [
  {
    id: '1',
    member: mockMembers[0],
    amount: 10000,
    scheduledDate: '2024-01-15',
    paidDate: '2024-01-15',
    status: 'payé'
  },
  {
    id: '2',
    member: mockMembers[1],
    amount: 10000,
    scheduledDate: '2024-01-15',
    status: 'en_attente'
  },
  {
    id: '3',
    member: mockMembers[2],
    amount: 10000,
    scheduledDate: '2023-12-15',
    status: 'en_retard'
  },
  {
    id: '4',
    member: mockMembers[3],
    amount: 10000,
    scheduledDate: '2024-01-15',
    paidDate: '2024-01-14',
    status: 'payé'
  },
  {
    id: '5',
    member: mockMembers[4],
    amount: 10000,
    scheduledDate: '2024-01-15',
    paidDate: '2024-01-16',
    status: 'payé'
  }
];
const cards = [
  {
    label: 'Total collecté',
    value: `2450000 XOF`,
    icon: Banknote,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100'
  },
  {
    label: 'Ce mois',
    value: `185000 XOF`,
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100'
  },
  {
    label: 'En attente',
    value: `25000 XOF`,
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100'
  },
  {
    label: 'En retard',
    value: `15 membres`,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100'
  }
];
export default function CotisationsPage() {
  const [contributions, setContributions] = React.useState<Contribution[]>(mockContributions);

  // Handlers pour les actions CRUD - à connecter avec l'API
  const handleAddContribution = async (newContribution: Omit<Contribution, 'id'>) => {
    try {
      // TODO: Remplacer par un appel API
      const contribution: Contribution = {
        ...newContribution,
        id: Date.now().toString()
      };
      setContributions(prev => [contribution, ...prev]);

      // Mettre à jour les stats
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la cotisation:', error);
    }
  };

  const handleUpdateContribution = async (id: string, updates: Partial<Contribution>) => {
    try {
      // TODO: Remplacer par un appel API
      setContributions(prev =>
        prev.map(contrib => contrib.id === id ? { ...contrib, ...updates } : contrib)
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeleteContribution = async (id: string) => {
    try {
      // TODO: Remplacer par un appel API
      setContributions(prev => prev.filter(contrib => contrib.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  useSetPageInfo({
    title: "Gestion des cotisations",
    description: "Enregistrez et suivez les cotisations des membres",
    notificationCount: 3
  })

  return (

    <div className="space-y-6 p-6">


      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Formulaire d'enregistrement */}
      <ContributionForm
        members={mockMembers}
        onSubmit={handleAddContribution}
      />

      {/* Historique des cotisations */}
      <ContributionHistory
        contributions={contributions}
        onUpdate={handleUpdateContribution}
        onDelete={handleDeleteContribution}
      />
    </div>
  );
}