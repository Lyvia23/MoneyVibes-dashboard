
export interface DonneesStatistiques {
  membresRisque: number
  retardsPaiement: number
  pretsDefaut: number
  scoreMoyen: number
}

export interface MembreRisque {
  id: string
  nom: string
  prenom: string
  avatar?: string
  membreDepuis: number
  scoreRisque: number
  niveauRisque: "ÉLEVÉ" | "MOYEN" | "FAIBLE"
  problemes: string[]
  email?: string
  telephone?: string
  montantPret?: number
  dateDernierPaiement?: Date
  prochainePaiement?: Date
}

export interface ProblemeRisque {
  type: "retard_paiement" | "cotisation_manquee" | "pret_defaut" | "historique_irregulier"
  description: string
  severite: "faible" | "moyenne" | "elevee"
  dateDetection: Date
  montantConcerne?: number
  joursRetard?: number
}

export interface AnalyseRisqueReponse {
  statistiques: DonneesStatistiques
  scoreGlobal: number
  membres: MembreRisque[]
  tendances: {
    evolutionScore: number[]
    periodes: string[]
  }
  alertes: {
    nouvelles: number
    critiques: number
  }
}

// Types pour les filtres
export type FiltreNiveauRisque = "tous" | "ÉLEVÉ" | "MOYEN" | "FAIBLE"
export type FiltreTypeProbleme = "tous" | "retard" | "defaut" | "cotisation" | "historique"

export interface FiltresAnalyse {
  rechercheTexte: string
  niveauRisque: FiltreNiveauRisque
  typeProbleme: FiltreTypeProbleme
  periodeDebut?: Date
  periodeFin?: Date
}

// Types pour les actions
export interface ActionRisque {
  id: string
  membreId: string
  type: "rappel" | "suspension" | "restructuration" | "suivi"
  statut: "planifie" | "en_cours" | "termine" | "reporte"
  dateCreation: Date
  dateEcheance: Date
  description: string
  assigneA?: string
}