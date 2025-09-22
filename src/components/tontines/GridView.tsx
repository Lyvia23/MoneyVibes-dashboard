"use client"

import { Tontine } from "@/src/types/tontine";
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {  DollarSign, Users, Edit, Trash2, MoreHorizontal, Calendar } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
export const GridView = ({ tontines, onEdit, onDelete }: { 
  tontines: Tontine[], 
  onEdit: (id: string) => void, 
  onDelete: (id: string) => void 
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personnel': return 'bg-blue-100 text-blue-800';
      case 'groupe': return 'bg-green-100 text-green-800';
      case 'rejoindre': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'terminee': return 'bg-gray-100 text-gray-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tontines.map((tontine) => (
        <Card key={tontine.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold truncate">{tontine.nom}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(tontine.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(tontine.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge className={getTypeColor(tontine.type)}>
                {tontine.type}
              </Badge>
              <Badge variant="outline" className={getStatutColor(tontine.statut)}>
                {tontine.statut.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{tontine.nombreParticipants} participants</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span>{tontine.montant.toLocaleString()} XOF</span>
              </div>
            </div>
            
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Début: {new Date(tontine.dateDebut).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Fin: {new Date(tontine.dateFin).toLocaleDateString('fr-FR')}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span className="font-medium">{tontine.progression}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${tontine.progression}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
