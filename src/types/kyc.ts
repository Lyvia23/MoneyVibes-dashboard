export interface UtilisateurKYC {
  id: string;
  nomComplet: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  photoProfile: string;
  statut: 'en_attente' | 'approuve' | 'rejete' | 'verification_en_cours';
}

export interface DocumentIdentite {
  id: string;
  type: 'recto' | 'verso';
  nom: string;
  url: string;
  dateUpload: string;
}

export interface VerificationStatut {
  photoClaireEtLisible: boolean;
  informationsCorrespondantes: boolean;
  documentNonExpire: boolean;
  verificationEnCours: boolean;
}

export interface ActionHistorique {
  id: string;
  type: 'upload' | 'verification' | 'approbation' | 'rejet';
  titre: string;
  description: string;
  date: string;
  statut: 'success' | 'warning' | 'info' | 'error';
}
