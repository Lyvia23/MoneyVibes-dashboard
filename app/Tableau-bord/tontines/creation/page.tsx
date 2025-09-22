"use client"


import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/src/components/ui/select';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Badge } from '@/src/components/ui/badge';
import { Progress } from '@/src/components/ui/progress';

import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Settings, 
  Check,
  Info,
  Calendar,
  Shield,
  Star
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Alert, AlertDescription } from '@/src/components/ui/alert';
import { useSetPageInfo } from '@/src/Context/pageContext';

const TontineCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1: Informations de base
    name: '',
    description: '',
    type: '',
    visibility: '',
    
    // Étape 2: Configuration financière
    amount: '',
    maxParticipants: '',
    frequency: '',
    fees: '',
    startDate: '',
    
    // Étape 3: Règles spéciales
    penalties: {
      enabled: false,
      amount: '',
      type: 'fixed'
    },
    bonuses: {
      enabled: false,
      amount: '',
      criteria: ''
    },
    rating: false,
    exclusionRules: ''
  });

  const steps = [
    { number: 1, title: 'Informations de Base', icon: Users },
    { number: 2, title: 'Configuration Financière', icon: DollarSign },
    { number: 3, title: 'Règles Spéciales', icon: Settings },
    { number: 4, title: 'Validation', icon: Check }
  ];

    useSetPageInfo({
      title: "Création de Tontine",
      description: "Enregistrez une nouvelle tontine en quelques étapes simples",
      notificationCount: 3
    });
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepValidation = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.type && formData.visibility;
      case 2:
        return formData.amount && formData.maxParticipants && formData.frequency;
      case 3:
        return true; // Règles optionnelles
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Nom de la tontine *
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Tontine Amis 2025"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement l'objectif de votre tontine..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Type de tontine *</Label>
                <Select onValueChange={(value) => updateFormData('type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">Tontine de groupe</SelectItem>
                    <SelectItem value="personal">Tontine personnelle</SelectItem>
                    <SelectItem value="join">Rejoindre une tontine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Visibilité *</Label>
                <Select onValueChange={(value) => updateFormData('visibility', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir la visibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Publique</SelectItem>
                    <SelectItem value="private">Privée</SelectItem>
                    <SelectItem value="invite">Sur invitation uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Le nom et le type de tontine ne pourront pas être modifiés après création.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium">
                  Montant de cotisation *
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => updateFormData('amount', e.target.value)}
                    className="pl-8"
                  />
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="participants" className="text-sm font-medium">
                  Nombre max de participants *
                </Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="Ex: 12"
                  value={formData.maxParticipants}
                  onChange={(e) => updateFormData('maxParticipants', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium">Fréquence de cotisation *</Label>
                <Select onValueChange={(value) => updateFormData('frequency', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir la fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="biweekly">Bimensuelle</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                    <SelectItem value="quarterly">Trimestrielle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fees" className="text-sm font-medium">
                  Frais de gestion (%)
                </Label>
                <Input
                  id="fees"
                  type="number"
                  placeholder="Ex: 2"
                  value={formData.fees}
                  onChange={(e) => updateFormData('fees', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="startDate" className="text-sm font-medium">
                Date de début
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData('startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Calcul automatique
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Montant total par cycle: {formData.amount && formData.maxParticipants ? 
                  `€${(parseFloat(formData.amount) * parseInt(formData.maxParticipants)).toLocaleString()}` : 
                  'À calculer'
                }
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="penalties"
                  checked={formData.penalties.enabled}
                  onCheckedChange={(checked) => updateNestedFormData('penalties', 'enabled', checked)}
                />
                <Label htmlFor="penalties" className="font-medium">
                  Activer les pénalités de retard
                </Label>
              </div>
              
              {formData.penalties.enabled && (
                <div className="grid gap-3 ml-6">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <Label className="text-sm">Type de pénalité</Label>
                      <Select 
                        value={formData.penalties.type}
                        onValueChange={(value) => updateNestedFormData('penalties', 'type', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Montant fixe</SelectItem>
                          <SelectItem value="percentage">Pourcentage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">
                        {formData.penalties.type === 'percentage' ? 'Pourcentage (%)' : 'Montant (€)'}
                      </Label>
                      <Input
                        type="number"
                        value={formData.penalties.amount}
                        onChange={(e) => updateNestedFormData('penalties', 'amount', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="bonuses"
                  checked={formData.bonuses.enabled}
                  onCheckedChange={(checked) => updateNestedFormData('bonuses', 'enabled', checked)}
                />
                <Label htmlFor="bonuses" className="font-medium">
                  Système de bonus
                </Label>
              </div>
              
              {formData.bonuses.enabled && (
                <div className="grid gap-3 ml-6">
                  <div>
                    <Label className="text-sm">Critères de bonus</Label>
                    <Select 
                      value={formData.bonuses.criteria}
                      onValueChange={(value) => updateNestedFormData('bonuses', 'criteria', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un critère" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early_payment">Paiement anticipé</SelectItem>
                        <SelectItem value="referral">Parrainage</SelectItem>
                        <SelectItem value="perfect_attendance">Assiduité parfaite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Montant du bonus (€)</Label>
                    <Input
                      type="number"
                      value={formData.bonuses.amount}
                      onChange={(e) => updateNestedFormData('bonuses', 'amount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="rating"
                  checked={formData.rating}
                  onCheckedChange={(checked) => updateFormData('rating', checked)}
                />
                <Label htmlFor="rating" className="font-medium">
                  Système de notation des participants
                </Label>
              </div>
              <p className="text-sm text-gray-600">
                Permettre aux participants de se noter mutuellement pour la fiabilité
              </p>
            </div>

            <div>
              <Label htmlFor="exclusion" className="text-sm font-medium">
                Règles d'exclusion
              </Label>
              <Textarea
                id="exclusion"
                placeholder="Ex: Exclusion après 3 retards de paiement consécutifs..."
                value={formData.exclusionRules}
                onChange={(e) => updateFormData('exclusionRules', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Alert>
              <Check className="h-4 w-4" />
              <AlertDescription>
                Vérifiez tous les détails avant de créer votre tontine. Une fois créée, certains paramètres ne pourront plus être modifiés.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <Badge variant="secondary">{formData.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visibilité:</span>
                    <Badge variant="outline">{formData.visibility}</Badge>
                  </div>
                  {formData.description && (
                    <div>
                      <span className="text-gray-600">Description:</span>
                      <p className="text-sm mt-1">{formData.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Configuration financière</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cotisation:</span>
                    <span className="font-medium">€{formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants max:</span>
                    <span className="font-medium">{formData.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fréquence:</span>
                    <span className="font-medium">{formData.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total par cycle:</span>
                    <span className="font-bold text-green-600">
                      €{formData.amount && formData.maxParticipants ? 
                        (parseFloat(formData.amount) * parseInt(formData.maxParticipants)).toLocaleString() : 
                        '0'
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Règles spéciales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pénalités:</span>
                    {formData.penalties.enabled ? (
                      <Badge className="bg-red-100 text-red-800">
                        {formData.penalties.amount}
                        {formData.penalties.type === 'percentage' ? '%' : '€'}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Désactivées</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bonus:</span>
                    {formData.bonuses.enabled ? (
                      <Badge className="bg-green-100 text-green-800">
                        €{formData.bonuses.amount}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Désactivés</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Notation:</span>
                    <Badge variant={formData.rating ? "default" : "outline"}>
                      {formData.rating ? "Activée" : "Désactivée"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-12 w-12" />
            </Button>
           
          </div>

          {/* Progress Steps */}
          <div className="w-full mb-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                const isValid = getStepValidation(step.number);

                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                      ${isActive ? 'bg-blue-600 text-white' : 
                        isCompleted ? 'bg-green-600 text-white' : 
                        'bg-gray-200 text-gray-600'}
                    `}>
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                        Étape {step.number}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block max-w-20">
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Progress value={(currentStep / 4) * 100} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Étape {currentStep} sur 4
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>

          {currentStep < 4 ? (
            <Button 
              onClick={nextStep}
              disabled={!getStepValidation(currentStep)}
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => {
                alert('Tontine créée avec succès!');
                // Ici vous pourriez rediriger vers la page de gestion
              }}
            >
              <Check className="h-4 w-4" />
              Créer la tontine
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TontineCreation;