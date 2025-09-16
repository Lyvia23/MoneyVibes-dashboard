
"use client"

import { ContributionForm } from '@/src/components/cotisations/ContributionForm';
import { ContributionHistory } from '@/src/components/cotisations/ContributionHistory';
import { StatsCards } from '@/src/components/cotisations/StatsCards';
import { PageWithHeader } from '@/src/components/PageWithHeader';
import React from 'react';

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

export interface Stats {
  totalCollected: number;
  thisMonth: number;
  pending: number;
  lateMembers: number;
}

// Données simulées - à remplacer par des appels API
const mockStats: Stats = {
  totalCollected: 2450000,
  thisMonth: 185000,
  pending: 25000,
  lateMembers: 15
};

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

export default function CotisationsPage() {
  const [contributions, setContributions] = React.useState<Contribution[]>(mockContributions);
  const [stats, setStats] = React.useState<Stats>(mockStats);

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
      updateStats();
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
      updateStats();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeleteContribution = async (id: string) => {
    try {
      // TODO: Remplacer par un appel API
      setContributions(prev => prev.filter(contrib => contrib.id !== id));
      updateStats();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const updateStats = () => {
    // Recalculer les statistiques
    const total = contributions.reduce((sum, contrib) =>
      contrib.status === 'payé' ? sum + contrib.amount : sum, 0
    );
    const pending = contributions.reduce((sum, contrib) =>
      contrib.status === 'en_attente' ? sum + contrib.amount : sum, 0
    );
    const lateCount = contributions.filter(contrib => contrib.status === 'en_retard').length;

    setStats(prev => ({
      ...prev,
      totalCollected: total,
      pending,
      lateMembers: lateCount
    }));
  };

  return (
    <PageWithHeader
      title="Gestion des cotisations"
      description="Enregistrez et suivez les cotisations des membres"
    >
      <div className="space-y-6 p-6">


        {/* Cartes statistiques */}
        <StatsCards stats={stats} />

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
      </div></PageWithHeader>
  );
}