import { mockParticipants } from "@/src/types/tontine";
import { AlertCircle, CheckCircle, Edit, Eye, MoreHorizontal, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import { Badge} from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Pagination } from "../pagination";

export default function ParticipantsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const itemsPerPage = 10;

  const filteredParticipants = mockParticipants.filter(participant => {
    const matchesSearch = participant.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || participant.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  const getStatutBadge = (statut: string) => {
    const variants = {
      'actif': { variant: 'default', icon: CheckCircle },
      'en_retard': { variant: 'destructive', icon: AlertCircle },
      'inactif': { variant: 'secondary', icon: XCircle }
    };
    
    const config = variants[statut] || variants['inactif'];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {statut.replace('_', ' ')}
      </Badge>
    );
  };

  const getNotationStars = (notation) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < notation ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un participant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="en_retard">En retard</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des participants */}
      <Card>
        <CardHeader>
          <CardTitle>Liste détaillée des participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Participant</th>
                  <th className="text-left p-4">Statut</th>
                  <th className="text-left p-4">Cotisations</th>
                  <th className="text-left p-4">Montant total</th>
                  <th className="text-left p-4">Dernière paie</th>
                  <th className="text-left p-4">Notation</th>
                  <th className="text-left p-4">Position</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/avatars/${participant.id}.jpg`} />
                          <AvatarFallback>
                            {participant.nom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{participant.nom}</div>
                          <div className="text-sm text-gray-500">{participant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatutBadge(participant.statut)}
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          {participant.cotisationsPayees}/{participant.cotisationsTotal}
                        </div>
                        <Progress 
                          value={(participant.cotisationsPayees / participant.cotisationsTotal) * 100} 
                          className="h-2"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      {participant.montantTotal.toLocaleString()} XOF
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(participant.dernierePaie).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {getNotationStars(participant.notation)}
                        <span className="ml-2 text-sm text-gray-600">({participant.notation}/5)</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">#{participant.position}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredParticipants.length}
            itemsPerPage={itemsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};