'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ActionHistorique, DocumentIdentite, UtilisateurKYC, VerificationStatut } from '@/src/types/kyc';
import { InformationsUtilisateur } from '@/src/components/kyc/InformationsUtilisateur';
import { DocumentsIdentite } from '@/src/components/kyc/DocumentsIdentite';
import { VerificationValidation } from '@/src/components/kyc/VerificationValidation';
import { HistoriqueActions } from '@/src/components/kyc/HistoriqueActions';
import { PageWithHeader } from '@/src/components/PageWithHeader';

export default function ValidationKYCPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // Données d'exemple - à remplacer par des appels API
  const [utilisateur] = useState<UtilisateurKYC>({
    id: id || '1',
    nomComplet: 'Marie Kouadio',
    email: 'marie.kouadio@email.com',
    telephone: '+225 07 12 34 56 78',
    dateNaissance: '15 Mars 1985',
    adresse: 'Rue des Jardins, Cocody, Abidjan, Côte d\'Ivoire',
    photoProfile: '/api/placeholder/100/100',
    statut: 'en_attente'
  });

  const [documents] = useState<DocumentIdentite[]>([
    {
      id: '1',
      type: 'recto',
      nom: 'Carte Nationale d\'Identité',
      url: '/api/placeholder/400/250',
      dateUpload: '15 Jan 2025'
    },
    {
      id: '2',
      type: 'verso',
      nom: 'Verso de la CNI',
      url: '/api/placeholder/400/250',
      dateUpload: '15 Jan 2025'
    }
  ]);

  const [verification] = useState<VerificationStatut>({
    photoClaireEtLisible: true,
    informationsCorrespondantes: true,
    documentNonExpire: true,
    verificationEnCours: true
  });

  const [actions] = useState<ActionHistorique[]>([
    {
      id: '1',
      type: 'upload',
      titre: 'Documents uploadés',
      description: '',
      date: '15 Janvier 2025 à 14:30',
      statut: 'info'
    },
    {
      id: '2',
      type: 'verification',
      titre: 'En cours de vérification',
      description: '',
      date: '15 Janvier 2025 à 15:00',
      statut: 'warning'
    }
  ]);

  const handleApprouver = () => {
    console.log('KYC approuvé pour ID:', id);
    // Logique d'approbation
  };

  const handleRejeter = () => {
    console.log('KYC rejeté pour ID:', id);
    // Logique de rejet
  };

  const handleDemanderInfos = () => {
    console.log('Demande d\'informations supplémentaires pour ID:', id);
    // Logique de demande d'infos
  };

  return (
    <PageWithHeader
      title="Validation KYC"
      description="Vérification des documents d'identité"
    >
      <div className="space-y-6 p-6">
          
            <InformationsUtilisateur utilisateur={utilisateur} />
            <DocumentsIdentite documents={documents} />
            <VerificationValidation
              verification={verification}
              onApprouver={handleApprouver}
              onRejeter={handleRejeter}
              onDemanderInfos={handleDemanderInfos}
            />
            <HistoriqueActions actions={actions} />
          </div>
    </PageWithHeader>
  );
}