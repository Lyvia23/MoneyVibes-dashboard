"use client"
import { StatsCard } from '@/src/components/StatsCard';
import { useSetPageInfo } from '@/src/Context/pageContext';
import {  CircleDollarSignIcon, Clock, DollarSign, HelpCircle, Ticket, Users, Users2, Wallet2, Search, Grid3X3, Table2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Pagination } from '@/src/components/pagination';
import { Tontine } from '@/src/types/tontine';
import { TableView } from '@/src/components/tontines/TableView';
import { GridView } from '@/src/components/tontines/GridView';
import { FilterSection } from '@/src/components/tontines/FilterSection';
import { CalendrierEcheances } from '@/src/components/tontines/CalendrierEcheances';
import { useRouter } from 'next/navigation';
export interface Stats {
  totalCollected: number;
  thisMonth: number;
  pending: number;
  lateMembers: number;
}


const donneesStats = [
  {
    label: "Tontines Actives",
    value: 8,
    icon: Ticket,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100"
  },
  {
    label: "Volume Circulation",
    value: 5,
    icon: Clock,
    iconColor: "text-yellow-600",
    iconBgColor: "bg-yellow-100"
  },
  {
    label: "Participants Actifs",
    value: 12,
    icon: Users,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100"
  },
  {
    label: "Commissions Mois",
    value: "70000 XOF",
    icon: CircleDollarSignIcon,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100"
  },
  {
    label: "Aide système",
    value: 8,
    icon: HelpCircle,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100"
  },
  {
    label: "Montant aide système",
    value: 2000,
    icon: Wallet2,
    iconColor: "text-yellow-600",
    iconBgColor: "bg-yellow-100"
  },
  {
    label: "Participants système",
    value: 12,
    icon: Users2,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100"
  },
  {
    label: "Montant participant système",
    value: "400 XOF",
    icon: DollarSign,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100"
  }
];

// Données mock pour les tontines
const mockTontines: Tontine[] = [
  {
    id: "1",
    nom: "Tontine Famille Nguema",
    type: "personnel",
    nombreParticipants: 8,
    montant: 50000,
    dateDebut: "2024-01-15",
    dateFin: "2024-12-15",
    progression: 65,
    statut: "active"
  },
  {
    id: "2",
    nom: "Épargne Quartier Bonaberi",
    type: "groupe",
    nombreParticipants: 15,
    montant: 25000,
    dateDebut: "2024-02-01",
    dateFin: "2024-11-30",
    progression: 80,
    statut: "active"
  },
  {
    id: "3",
    nom: "Tontine des Commerçants",
    type: "rejoindre",
    nombreParticipants: 12,
    montant: 100000,
    dateDebut: "2024-03-01",
    dateFin: "2025-02-28",
    progression: 45,
    statut: "active"
  },
  {
    id: "4",
    nom: "Épargne Étudiants UY1",
    type: "groupe",
    nombreParticipants: 20,
    montant: 15000,
    dateDebut: "2023-10-01",
    dateFin: "2024-09-30",
    progression: 100,
    statut: "terminee"
  },
  {
    id: "5",
    nom: "Tontine Femmes Entrepreneures",
    type: "personnel",
    nombreParticipants: 6,
    montant: 75000,
    dateDebut: "2024-04-01",
    dateFin: "2024-10-01",
    progression: 30,
    statut: "en_attente"
  },
  {
    id: "6",
    nom: "Épargne Coopérative Akwa",
    type: "groupe",
    nombreParticipants: 25,
    montant: 40000,
    dateDebut: "2024-01-01",
    dateFin: "2024-12-31",
    progression: 55,
    statut: "active"
  }
];


export default function TontinePage() {
  useSetPageInfo({
    title: "Gestion des tontines",
    description: "Enregistrez et suivez les tontines des membres",
    notificationCount: 3
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [dateDebutFilter, setDateDebutFilter] = useState<string>('');
  const [dateFinFilter, setDateFinFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const itemsPerPage = 6;

  // Filtrage des tontines
  const filteredTontines = useMemo(() => {
    return mockTontines.filter((tontine) => {
      const matchesSearch = tontine.nom.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'tous' || tontine.type === typeFilter;
      const matchesDateDebut = !dateDebutFilter || new Date(tontine.dateDebut) >= new Date(dateDebutFilter);
      const matchesDateFin = !dateFinFilter || new Date(tontine.dateFin) <= new Date(dateFinFilter);
      
      return matchesSearch && matchesType && matchesDateDebut && matchesDateFin;
    });
  }, [searchTerm, typeFilter, dateDebutFilter, dateFinFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTontines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTontines = filteredTontines.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, dateDebutFilter, dateFinFilter]);

 const handleEdit = (id: string) => {
    };

  const handleDelete = (id: string) => {
    console.log('Delete tontine:', id);
    // Ici vous pouvez afficher une confirmation et supprimer la tontine
  };
   const handleView = (id: string) => {
      router.push(`/Tableau-bord/tontines/${id}`);

    // Ici vous pouvez afficher les détails de la tontine
  };


const router = useRouter();

  const handleCreateTontine = () => {
    router.push('/Tableau-bord/tontines/creation');
  };


  return (
    <div className="space-y-6 p-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donneesStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Section des Tontines */}
      <div className="space-y-6">
        <div className="flex justify-end items-end">
          <Button onClick={handleCreateTontine} >Créer une tontine</Button>
        </div>
        <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        dateDebutFilter={dateDebutFilter}
        setDateDebutFilter={setDateDebutFilter}
        dateFinFilter={dateFinFilter}
        setDateFinFilter={setDateFinFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
  
        
        />
        {/* Affichage des résultats */}
        {paginatedTontines.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">Aucune tontine trouvée avec ces critères.</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <TableView 
                  tontines={paginatedTontines}
                  onEdit={handleEdit}
                  onDelete={handleDelete} 
                  onView={handleView}              />
            ) : (
              <GridView 
                tontines={paginatedTontines} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
               onView={handleView}             

              />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredTontines.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
      <CalendrierEcheances />
    </div>
  );
}