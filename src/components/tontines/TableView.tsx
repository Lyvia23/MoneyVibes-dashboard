"use client"

import { Tontine } from "@/src/types/tontine";
import { CheckCircle, CircleDollarSignIcon, Clock, DollarSign, HelpCircle, Ticket, Timer, Users, Users2, Wallet2, Search, Filter, Grid3X3, Table2, Edit, Trash2, MoreHorizontal, Calendar, MapPin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const TableView = ({ tontines, onEdit, onDelete }: { 
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
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tontines.map((tontine) => (
              <tr key={tontine.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{tontine.nom}</div>
                    <Badge variant="outline" className={getStatutColor(tontine.statut)}>
                      {tontine.statut.replace('_', ' ')}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getTypeColor(tontine.type)}>
                    {tontine.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    {tontine.nombreParticipants}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tontine.montant.toLocaleString()} XOF
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(tontine.dateDebut).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(tontine.dateFin).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${tontine.progression}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">{tontine.progression}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
