// Données mock
export const mockWalletOverview = {
  totalFunds: 15420000,
  availableFunds: 12350000,
  frozenFunds: 2070000,
  tontineFunds: 1000000,
  dailyInflow: 850000,
  dailyOutflow: 420000,
  systemLiquidity: 95.2
};

export const mockOperatorStats = {
  mtn: { status: 'online', volume: 5200000, successRate: 98.5 },
  orange: { status: 'online', volume: 3100000, successRate: 97.8 },
  moov: { status: 'online', volume: 1800000, successRate: 96.2 },
  wave: { status: 'maintenance', volume: 950000, successRate: 94.1 }
};

export const mockAlerts = [
  { id: 1, type: 'negative_balance', message: '3 comptes avec soldes négatifs', severity: 'high' },
  { id: 2, type: 'suspicious', message: '12 mouvements suspects détectés', severity: 'medium' },
  { id: 3, type: 'fraud', message: '2 tentatives de fraude bloquées', severity: 'high' },
  { id: 4, type: 'threshold', message: '1 seuil de risque dépassé', severity: 'low' }
];

export const mockTransactions = Array.from({ length: 250 }, (_, i) => ({
  id: `TXN-${String(i + 1).padStart(6, '0')}`,
  type: ['Dépôt', 'Retrait', 'Cotisation', 'Commission'][Math.floor(Math.random() * 4)],
  status: ['En attente', 'Réussie', 'Échouée'][Math.floor(Math.random() * 3)],
  amount: Math.floor(Math.random() * 500000) + 1000,
  method: ['Mobile Money', 'Carte', 'Wallet'][Math.floor(Math.random() * 3)],
  operator: ['MTN', 'Orange', 'Moov', 'Wave'][Math.floor(Math.random() * 4)],
  date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  user: `Utilisateur ${i + 1}`,
  reference: `REF-${String(i + 1).padStart(8, '0')}`
}));