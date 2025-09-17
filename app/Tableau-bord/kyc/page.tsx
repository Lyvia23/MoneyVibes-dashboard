"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageWithHeader } from '@/src/components/PageWithHeader';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent} from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Eye, User, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

interface UtilisateurKYCListe {
  id: string;
  nomComplet: string;
  email: string;
  statut: 'en_attente' | 'approuve' | 'rejete' | 'en_cours';
  dateCreation: string;
}

export default function KYCListePage() {
  // Données d'exemple étendues
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
    },
    {
      id: '4',
      nomComplet: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      statut: 'rejete',
      dateCreation: '12 Jan 2025'
    },
    {
      id: '5',
      nomComplet: 'Aissatou Bah',
      email: 'aissatou.bah@email.com',
      statut: 'en_attente',
      dateCreation: '11 Jan 2025'
    },
    {
      id: '6',
      nomComplet: 'Ibrahim Sow',
      email: 'ibrahim.sow@email.com',
      statut: 'approuve',
      dateCreation: '10 Jan 2025'
    },
    {
      id: '7',
      nomComplet: 'Kadiatou Camara',
      email: 'kadiatou.camara@email.com',
      statut: 'en_cours',
      dateCreation: '09 Jan 2025'
    },
    {
      id: '8',
      nomComplet: 'Moussa Keita',
      email: 'moussa.keita@email.com',
      statut: 'en_attente',
      dateCreation: '08 Jan 2025'
    },
    {
      id: '9',
      nomComplet: 'Salimata Touré',
      email: 'salimata.toure@email.com',
      statut: 'approuve',
      dateCreation: '07 Jan 2025'
    },
    {
      id: '10',
      nomComplet: 'Ousmane Diabaté',
      email: 'ousmane.diabate@email.com',
      statut: 'rejete',
      dateCreation: '06 Jan 2025'
    },
    {
      id: '11',
      nomComplet: 'Fatoumata Sidibé',
      email: 'fatoumata.sidibe@email.com',
      statut: 'en_attente',
      dateCreation: '05 Jan 2025'
    },
    {
      id: '12',
      nomComplet: 'Sekou Condé',
      email: 'sekou.conde@email.com',
      statut: 'en_cours',
      dateCreation: '04 Jan 2025'
    }
  ]);

  // États pour la pagination et les filtres
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Données filtrées
  const filteredUsers = useMemo(() => {
    return utilisateurs.filter(user => {
      const matchesSearch = user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.statut === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [utilisateurs, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

 

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

  return (
    <PageWithHeader
      title="Gestion KYC"
      description="Liste des demandes de validation KYC"
    >
      <div className="space-y-6 p-3 sm:p-6">
        <div className="container mx-auto max-w-7xl">
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

          {/* Compteur de résultats */}
          <div className="mb-4 text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredUsers.length)} sur {filteredUsers.length} résultats
          </div>

          {/* Liste des utilisateurs */}
          <div className="grid gap-4 mb-6">
            {currentUsers.length > 0 ? (
              currentUsers.map((utilisateur) => (
                <Card key={utilisateur.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    {/* Version desktop */}
                    <div className="hidden sm:flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg truncate">{utilisateur.nomComplet}</h3>
                          <p className="text-sm text-gray-600 truncate">{utilisateur.email}</p>
                          <p className="text-xs text-gray-500">Créé le {utilisateur.dateCreation}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 flex-shrink-0">
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

                    {/* Version mobile */}
                    <div className="sm:hidden space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-base truncate">{utilisateur.nomComplet}</h3>
                          <p className="text-sm text-gray-600 truncate">{utilisateur.email}</p>
                          <p className="text-xs text-gray-500">Créé le {utilisateur.dateCreation}</p>
                        </div>
                      </div>
                      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between">
                        <Badge className={`${getStatusColor(utilisateur.statut)} w-fit`}>
                          {getStatusLabel(utilisateur.statut)}
                        </Badge>
                        <Link href={`/Tableau-bord/kyc/${utilisateur.id}`} className="w-full xs:w-auto">
                          <Button variant="outline" size="sm" className="w-full xs:w-auto">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Aucun utilisateur trouvé avec les critères actuels.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 order-2 sm:order-1">
                Page {currentPage} sur {totalPages}
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
    </PageWithHeader>
  );
}