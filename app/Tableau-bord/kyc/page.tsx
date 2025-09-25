"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent} from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { StatsCard } from '@/src/components/StatsCard';
import { 
  Eye, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Clock,
  AlertCircle,
  Timer,
  TrendingUp,
  FileCheck,
  ArrowUpDown
} from 'lucide-react';
import { useSetPageInfo } from '@/src/Context/pageContext';

interface DocumentInfo {
  type: 'identity' | 'address' | 'selfie';
  status: 'present' | 'missing' | 'invalid';
  imageUrl?: string; // URL de l'image du document
}

interface UtilisateurKYCListe {
  id: string;
  nomComplet: string;
  email: string;
  statut: 'en_attente' | 'approuve' | 'rejete' | 'en_cours';
  dateCreation: string;
  photo?: string;
  documents: DocumentInfo[];
  scoreQualite: number;
  tempsAttente: number; // en heures
  assignedAgent?: string;
}

type SortField = 'nomComplet' | 'scoreQualite' | 'tempsAttente' | 'dateCreation';
type SortDirection = 'asc' | 'desc';

export default function KYCListePage() {
  // Données d'exemple étendues avec les URLs des images de documents
  const [utilisateurs] = useState<UtilisateurKYCListe[]>([
    {
      id: '1',
      nomComplet: 'Marie Kouadio',
      email: 'marie.kouadio@email.com',
      statut: 'en_attente',
      dateCreation: '15 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b630?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'missing' }
      ],
      scoreQualite: 78,
      tempsAttente: 24
    },
    {
      id: '2',
      nomComplet: 'Jean Bakayoko',
      email: 'jean.bakayoko@email.com',
      statut: 'en_cours',
      dateCreation: '14 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 92,
      tempsAttente: 6,
      assignedAgent: 'Agent A'
    },
    {
      id: '3',
      nomComplet: 'Fatou Traoré',
      email: 'fatou.traore@email.com',
      statut: 'approuve',
      dateCreation: '13 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 95,
      tempsAttente: 0
    },
    {
      id: '4',
      nomComplet: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      statut: 'rejete',
      dateCreation: '12 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'invalid', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'missing' }
      ],
      scoreQualite: 35,
      tempsAttente: 0
    },
    {
      id: '5',
      nomComplet: 'Aissatou Bah',
      email: 'aissatou.bah@email.com',
      statut: 'en_attente',
      dateCreation: '11 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'missing' },
        { type: 'selfie', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 67,
      tempsAttente: 48
    },
    {
      id: '6',
      nomComplet: 'Ibrahim Sow',
      email: 'ibrahim.sow@email.com',
      statut: 'approuve',
      dateCreation: '10 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 88,
      tempsAttente: 0
    },
    {
      id: '7',
      nomComplet: 'Kadiatou Camara',
      email: 'kadiatou.camara@email.com',
      statut: 'en_cours',
      dateCreation: '09 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 84,
      tempsAttente: 12,
      assignedAgent: 'Agent B'
    },
    {
      id: '8',
      nomComplet: 'Moussa Keita',
      email: 'moussa.keita@email.com',
      statut: 'en_attente',
      dateCreation: '08 Jan 2025',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      documents: [
        { type: 'identity', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop' },
        { type: 'address', status: 'present', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop' },
        { type: 'selfie', status: 'invalid', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=60&fit=crop&crop=face' }
      ],
      scoreQualite: 72,
      tempsAttente: 72
    }
  ]);

  // États pour la pagination, les filtres et le tri
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('tempsAttente');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Calcul des métriques
  const metrics = useMemo(() => {
    const enAttente = utilisateurs.filter(u => u.statut === 'en_attente').length;
    const enCours = utilisateurs.filter(u => u.statut === 'en_cours').length;
    const approuves = utilisateurs.filter(u => u.statut === 'approuve').length;
    const rejetes = utilisateurs.filter(u => u.statut === 'rejete').length;
    const total = utilisateurs.length;
    
    const tempsAttenteTotal = utilisateurs
      .filter(u => u.statut !== 'en_attente')
      .reduce((sum, u) => sum + (u.tempsAttente || 0), 0);
    const usersProcessed = utilisateurs.filter(u => u.statut !== 'en_attente').length;
    const tempsTraitementMoyen = usersProcessed > 0 ? Math.round(tempsAttenteTotal / usersProcessed) : 0;
    
    const tauxApprobation = total > 0 ? Math.round((approuves / (approuves + rejetes)) * 100) : 0;
    const backlog = enAttente + enCours;

    return {
      enAttente,
      tempsTraitementMoyen,
      tauxApprobation,
      backlog
    };
  }, [utilisateurs]);

  // Données filtrées et triées
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = utilisateurs.filter(user => {
      const matchesSearch = user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.statut === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'dateCreation') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [utilisateurs, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en_cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approuve': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejete': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const formatWaitTime = (hours: number) => {
    if (hours === 0) return 'Traité';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}j ${remainingHours}h` : `${days}j`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="w-8 h-8 p-0"
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  useSetPageInfo({
    title: "Gestion KYC",
    description: "Liste des demandes de validation KYC",
    notificationCount: metrics.enAttente
  });
  
  return (
    <div className="space-y-6 p-6">
      <div className="container w-full">
        {/* Métriques KYC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="En attente"
            value={metrics.enAttente}
            icon={AlertCircle}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
          <StatsCard
            label="Temps moyen"
            value={`${metrics.tempsTraitementMoyen}h`}
            icon={Timer}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            label="Taux d'approbation"
            value={`${metrics.tauxApprobation}%`}
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatsCard
            label="Backlog"
            value={metrics.backlog}
            icon={FileCheck}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="approuve">Approuvé</option>
              <option value="rejete">Rejeté</option>
            </select>
          </div>
        </div>

        {/* Tableau */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm text-gray-900">
                      <button
                        onClick={() => handleSort('nomComplet')}
                        className="flex items-center space-x-1 hover:text-blue-600"
                      >
                        <span>Utilisateur</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-center p-4 font-semibold text-sm text-gray-900">
                      Documents
                    </th>
                    <th className="text-center p-4 font-semibold text-sm text-gray-900">
                      <button
                        onClick={() => handleSort('scoreQualite')}
                        className="flex items-center space-x-1 hover:text-blue-600 mx-auto"
                      >
                        <span>Score</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-center p-4 font-semibold text-sm text-gray-900">
                      <button
                        onClick={() => handleSort('tempsAttente')}
                        className="flex items-center space-x-1 hover:text-blue-600 mx-auto"
                      >
                        <span>Temps d'attente</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-center p-4 font-semibold text-sm text-gray-900">
                      Statut
                    </th>
                    <th className="text-center p-4 font-semibold text-sm text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((utilisateur, index) => (
                      <tr key={utilisateur.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        {/* Utilisateur */}
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                              {utilisateur.photo ? (
                                <img 
                                  src={utilisateur.photo} 
                                  alt={utilisateur.nomComplet}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-gray-900 truncate">
                                {utilisateur.nomComplet}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {utilisateur.email}
                              </p>
                              <p className="text-xs text-gray-500">
                                {utilisateur.dateCreation}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Documents */}
                        <td className="p-4">
                          <div className="flex justify-center items-center space-x-2">
                            {utilisateur.documents.map((doc, docIndex) => (
                              <div key={docIndex} className="relative group">
                                {doc.status === 'present' && doc.imageUrl ? (
                                  <div className="relative">
                                    <img
                                      src={doc.imageUrl}
                                      alt={`Document ${doc.type}`}
                                      className={`w-12 h-8 object-cover rounded border-2 ${
                                        doc.status === 'invalid' 
                                          ? 'border-red-300 opacity-75' 
                                          : 'border-green-300'
                                      }`}
                                    />
                                    {doc.status === 'invalid' && (
                                      <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded"></div>
                                    )}
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      {doc.type === 'identity' ? 'Pièce d\'identité' : 
                                       doc.type === 'address' ? 'Justificatif d\'adresse' : 
                                       'Selfie'}
                                    </div>
                                  </div>
                                ) : (
                                  <div className={`w-12 h-8 rounded border-2 border-dashed flex items-center justify-center ${
                                    doc.status === 'missing' 
                                      ? 'border-gray-300 bg-gray-50' 
                                      : 'border-red-300 bg-red-50'
                                  }`}>
                                    <span className="text-xs text-gray-400">
                                      {doc.status === 'missing' ? '?' : '✕'}
                                    </span>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      {doc.type === 'identity' ? 'Pièce d\'identité' : 
                                       doc.type === 'address' ? 'Justificatif d\'adresse' : 
                                       'Selfie'} - {doc.status === 'missing' ? 'Manquant' : 'Invalide'}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Score qualité */}
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${getScoreColor(utilisateur.scoreQualite)}`}>
                            {utilisateur.scoreQualite}%
                          </span>
                        </td>

                        {/* Temps d'attente */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {formatWaitTime(utilisateur.tempsAttente)}
                            </span>
                          </div>
                        </td>

                        {/* Statut */}
                        <td className="p-4 text-center">
                          <Badge className={getStatusColor(utilisateur.statut)}>
                            {getStatusLabel(utilisateur.statut)}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center">
                          <Link href={`/Tableau-bord/kyc/${utilisateur.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Examiner
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        Aucun utilisateur trouvé avec les critères actuels.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAndSortedUsers.length)} sur {filteredAndSortedUsers.length} résultats
            </div>
            
            <div className="flex items-center space-x-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="hidden xs:inline">Précédent</span>
              </Button>

              <div className="hidden sm:flex space-x-1">
                {renderPaginationButtons()}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                <span className="hidden xs:inline">Suivant</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
           
