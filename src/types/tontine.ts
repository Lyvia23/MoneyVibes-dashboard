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