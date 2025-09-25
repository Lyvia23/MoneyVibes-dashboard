// components/cotisations/ContributionForm.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Contribution, Member } from '@/app/Tableau-bord/cotisations/page';

interface ContributionFormProps {
  members: Member[];
  onSubmit: (contribution: Omit<Contribution, 'id'>) => void;
}

export function ContributionForm({ members, onSubmit }: ContributionFormProps) {
  const [formData, setFormData] = React.useState({
    memberId: '',
    amount: '',
    date: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.memberId || !formData.amount || !formData.date) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedMember = members.find(m => m.id === formData.memberId);
      if (!selectedMember) throw new Error('Membre non trouvé');

      const contribution: Omit<Contribution, 'id'> = {
        member: selectedMember,
        amount: parseInt(formData.amount),
        scheduledDate: formData.date,
        status: 'en_attente'
      };

      await onSubmit(contribution);

      // Reset form
      setFormData({
        memberId: '',
        amount: '',
        date: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Enregistrer une cotisation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            {/* Sélection du membre */}
            <div className="space-y-2">
              <Label htmlFor="member" className="text-sm font-medium text-gray-700">
                Membre
              </Label>
                  <Select
              value={formData.memberId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, memberId: value }))}
            >
              <SelectTrigger className="h-12 bg-gray-50  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <SelectValue placeholder="Sélectionner un membre" className="text-base" />
              </SelectTrigger>
              <SelectContent className="bg-white  shadow-lg z-[1000]">
                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id}
                    className="bg-white hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-gray-500">{member.phone}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
           
            </div>
        
            {/* Montant */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Montant (XOF)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="10000"
                className="h-12 bg-gray-50  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                min="0"
                step="1000"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="h-12 bg-gray-50  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            {/* Bouton d'enregistrement */}
            <div className="lg:mt-0 mt-4 flex-shrink-0">
              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <Plus className="h-4 w-4" />
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}