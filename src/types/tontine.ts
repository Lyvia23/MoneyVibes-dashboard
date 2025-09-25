export interface Tontine {
  id: string;
  nom: string;
  type: 'personnel' | 'groupe' | 'rejoindre';
  nombreParticipants: number;
  montant: number;
  dateDebut: string;
  dateFin: string;
  progression: number;
  statut: 'active' | 'terminee' | 'en_attente';
}

export interface Echeance {
  id: string;
  tontineId: string;
  tontineName: string;
  date: string;
  montant: number;
  statut: 'cotise' | 'en_attente' | 'en_retard';
  participants: number;
  type: 'personnel' | 'groupe' | 'rejoindre';
}

export const tontineDetails = {
  id: "1",
  nom: "Tontine Famille Nguema",
  type: "personnel",
  nombreParticipants: 8,
  montant: 50000,
  dateDebut: "2024-01-15",
  dateFin: "2024-12-15",
  progression: 65,
  statut: "active",
  description: "Tontine familiale pour l'épargne collective et le soutien mutuel",
  periodicite: "mensuelle",
  montantCollecte: 32500,
  prochainTour: "2025-10-15",
  beneficiaireActuel: "Marie Nguema",
  commission: 2.5
};

export const progressionData = [
  { mois: 'Jan', collecte: 50000, objectif: 50000 },
  { mois: 'Fév', collecte: 100000, objectif: 100000 },
  { mois: 'Mar', collecte: 150000, objectif: 150000 },
  { mois: 'Avr', collecte: 200000, objectif: 200000 },
  { mois: 'Mai', collecte: 245000, objectif: 250000 },
  { mois: 'Jui', collecte: 290000, objectif: 300000 },
  { mois: 'Jul', collecte: 325000, objectif: 350000 }
];

export const mockParticipants = [
  {
    id: "1",
    nom: "Marie Nguema",
    email: "marie.nguema@email.com",
    statut: "actif",
    cotisationsPayees: 7,
    cotisationsTotal: 7,
    montantTotal: 350000,
    dernierePaie: "2025-09-15",
    notation: 5,
    position: 1
  },
  {
    id: "2", 
    nom: "Jean Mbarga",
    email: "jean.mbarga@email.com",
    statut: "en_retard",
    cotisationsPayees: 6,
    cotisationsTotal: 7,
    montantTotal: 300000,
    dernierePaie: "2025-08-15",
    notation: 3,
    position: 2
  },
  {
    id: "3",
    nom: "Claire Fouda",
    email: "claire.fouda@email.com", 
    statut: "actif",
    cotisationsPayees: 7,
    cotisationsTotal: 7,
    montantTotal: 350000,
    dernierePaie: "2025-09-15",
    notation: 5,
    position: 3
  },
  // Ajout de participants supplémentaires pour la pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 4}`,
    nom: `Participant ${i + 4}`,
    email: `participant${i + 4}@email.com`,
    statut: i % 3 === 0 ? "en_retard" : "actif",
    cotisationsPayees: Math.floor(Math.random() * 7) + 1,
    cotisationsTotal: 7,
    montantTotal: (Math.floor(Math.random() * 7) + 1) * 50000,
    dernierePaie: "2025-09-15",
    notation: Math.floor(Math.random() * 5) + 1,
    position: i + 4
  }))
];

export const mockTransactions = [
  {
    id: "1",
    date: "2025-09-15",
    type: "cotisation",
    participantNom: "Marie Nguema",
    montant: 50000,
    statut: "validee",
    commission: 1250
  },
  {
    id: "2",
    date: "2025-09-15", 
    type: "collection",
    participantNom: "Jean Mbarga",
    montant: -350000,
    statut: "validee",
    commission: 0
  },
  // Ajout de transactions supplémentaires pour la pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 3}`,
    date: `2025-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    type: i % 2 === 0 ? "cotisation" : "collection",
    participantNom: `Participant ${i + 1}`,
    montant: i % 2 === 0 ? 50000 : -350000,
    statut: Math.random() > 0.1 ? "validee" : "en_attente",
    commission: i % 2 === 0 ? 1250 : 0
  }))
];