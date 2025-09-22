"use client"

import React, { useState, useMemo } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, Clock, AlertCircle, Users, DollarSign } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Echeance } from '@/src/types/tontine';


const mockEcheances: Echeance[] = [
  {
    id: "1",
    tontineId: "t1",
    tontineName: "Tontine Famille Nguema",
    date: "2025-08-25",
    montant: 50000,
    statut: "cotise",
    participants: 8,
    type: "personnel"
  },
  {
    id: "2",
    tontineId: "t2",
    tontineName: "Épargne Quartier Bonaberi",
    date: "2025-08-28",
    montant: 25000,
    statut: "en_attente",
    participants: 15,
    type: "groupe"
  },
  {
    id: "3",
    tontineId: "t3",
    tontineName: "Tontine des Commerçants",
    date: "2025-08-30",
    montant: 100000,
    statut: "en_retard",
    participants: 12,
    type: "rejoindre"
  },
  {
    id: "4",
    tontineId: "t4",
    tontineName: "Épargne Étudiants UY1",
    date: "2025-09-05",
    montant: 15000,
    statut: "en_attente",
    participants: 20,
    type: "groupe"
  },
  {
    id: "5",
    tontineId: "t5",
    tontineName: "Tontine Femmes Entrepreneures",
    date: "2025-09-10",
    montant: 75000,
    statut: "cotise",
    participants: 6,
    type: "personnel"
  },
  {
    id: "6",
    tontineId: "t6",
    tontineName: "Épargne Coopérative Akwa",
    date: "2025-09-15",
    montant: 40000,
    statut: "en_attente",
    participants: 25,
    type: "groupe"
  }
];

type ViewMode = 'month' | 'week' | 'year';

export const CalendrierEcheances = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  // Helpers pour les dates
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return formatDate(date1) === formatDate(date2);
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getYearMonths = (date: Date) => {
    const year = date.getFullYear();
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(year, i, 1));
    }
    return months;
  };

  // Navigation
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'year') {
      newDate.setFullYear(currentDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  // Récupérer les échéances pour une date donnée
  const getEcheancesForDate = (date: Date): Echeance[] => {
    return mockEcheances.filter(echeance => 
      isSameDay(new Date(echeance.date), date)
    );
  };

  // Récupérer les échéances pour un mois donné (vue année)
  const getEcheancesForMonth = (date: Date): Echeance[] => {
    return mockEcheances.filter(echeance => {
      const echeanceDate = new Date(echeance.date);
      return echeanceDate.getMonth() === date.getMonth() && 
             echeanceDate.getFullYear() === date.getFullYear();
    });
  };

  // Composant pour afficher les échéances dans un popover
  const EcheancePopover = ({ echeances, date }: { echeances: Echeance[], date: Date }) => {
    if (echeances.length === 0) return null;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute bottom-1 right-1 flex gap-1">
            {echeances.slice(0, 3).map((echeance) => (
              <div
                key={echeance.id}
                className={cn(
                  "w-2 h-2 rounded-full",
                  echeance.statut === 'cotise' && "bg-green-500",
                  echeance.statut === 'en_attente' && "bg-yellow-500",
                  echeance.statut === 'en_retard' && "bg-red-500"
                )}
              />
            ))}
            {echeances.length > 3 && (
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80" side="top">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">
              Échéances du {date.toLocaleDateString('fr-FR')}
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {echeances.map((echeance) => (
                <div key={echeance.id} className="p-2 border rounded-md space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm truncate">{echeance.tontineName}</h5>
                    <Badge
                      variant="outline"
                      className={cn(
                        echeance.statut === 'cotise' && "border-green-500 text-green-700",
                        echeance.statut === 'en_attente' && "border-yellow-500 text-yellow-700",
                        echeance.statut === 'en_retard' && "border-red-500 text-red-700"
                      )}
                    >
                      {echeance.statut === 'cotise' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {echeance.statut === 'en_attente' && <Clock className="w-3 h-3 mr-1" />}
                      {echeance.statut === 'en_retard' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {echeance.statut.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {echeance.montant.toLocaleString()} XOF
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {echeance.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  // Vue Mois
  const MonthView = () => {
    const days = getMonthDays(currentDate);
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return (
      <div className="space-y-2">
        {/* En-tête des jours */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const echeances = getEcheancesForDate(day);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={index}
                className={cn(
                  "relative min-h-[120px] p-2 border rounded-md hover:bg-gray-50 transition-colors",
                  !isCurrentMonth && "text-gray-300 bg-gray-50",
                  isToday && "border-blue-500 bg-blue-50"
                )}
              >
                <div className="text-sm font-medium mb-2">
                  {day.getDate()}
                </div>
                
                {/* Affichage des échéances */}
                <div className="space-y-1">
                  {echeances.slice(0, 2).map((echeance) => (
                    <div
                      key={echeance.id}
                      className={cn(
                        "p-1 rounded text-xs border-l-2",
                        echeance.statut === 'cotise' && "bg-green-50 border-green-500 text-green-800",
                        echeance.statut === 'en_attente' && "bg-yellow-50 border-yellow-500 text-yellow-800",
                        echeance.statut === 'en_retard' && "bg-red-50 border-red-500 text-red-800"
                      )}
                    >
                      <div className="font-medium truncate">{echeance.tontineName}</div>
                      <div className={cn(
                        "text-xs flex items-center gap-1",
                        echeance.statut === 'cotise' && "text-green-600",
                        echeance.statut === 'en_attente' && "text-yellow-600",
                        echeance.statut === 'en_retard' && "text-red-600"
                      )}>
                        {echeance.statut === 'cotise' && <CheckCircle className="w-3 h-3" />}
                        {echeance.statut === 'en_attente' && <Clock className="w-3 h-3" />}
                        {echeance.statut === 'en_retard' && <AlertCircle className="w-3 h-3" />}
                        {echeance.statut.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                  {echeances.length > 2 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{echeances.length - 2} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Vue Semaine
  const WeekView = () => {
    const days = getWeekDays(currentDate);
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, index) => {
            const echeances = getEcheancesForDate(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <Card key={index} className={cn(isToday && "border-blue-500")}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    {dayNames[index]}
                  </CardTitle>
                  <p className="text-2xl font-bold">
                    {day.getDate()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {echeances.slice(0, 4).map((echeance) => (
                    <div
                      key={echeance.id}
                      className={cn(
                        "p-2 rounded-md text-xs border-l-4",
                        echeance.statut === 'cotise' && "bg-green-50 border-green-500",
                        echeance.statut === 'en_attente' && "bg-yellow-50 border-yellow-500",
                        echeance.statut === 'en_retard' && "bg-red-50 border-red-500"
                      )}
                    >
                      <div className="font-medium truncate mb-1">{echeance.tontineName}</div>
                      <div className={cn(
                        "flex items-center gap-1 text-xs",
                        echeance.statut === 'cotise' && "text-green-600",
                        echeance.statut === 'en_attente' && "text-yellow-600",
                        echeance.statut === 'en_retard' && "text-red-600"
                      )}>
                        {echeance.statut === 'cotise' && <CheckCircle className="w-3 h-3" />}
                        {echeance.statut === 'en_attente' && <Clock className="w-3 h-3" />}
                        {echeance.statut === 'en_retard' && <AlertCircle className="w-3 h-3" />}
                        {echeance.statut.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                  {echeances.length > 4 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{echeances.length - 4} autres...
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Vue Année
  const YearView = () => {
    const months = getYearMonths(currentDate);
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {months.map((month, index) => {
          const echeances = getEcheancesForMonth(month);
          const cotisees = echeances.filter(e => e.statut === 'cotise').length;
          const enAttente = echeances.filter(e => e.statut === 'en_attente').length;
          const enRetard = echeances.filter(e => e.statut === 'en_retard').length;

          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setCurrentDate(month);
                    setViewMode('month');
                  }}>
              <CardHeader>
                <CardTitle className="text-lg">{monthNames[index]}</CardTitle>
                <p className="text-sm text-gray-600">
                  {echeances.length} échéance{echeances.length > 1 ? 's' : ''}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {cotisees > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Cotisées
                    </span>
                    <span className="font-medium">{cotisees}</span>
                  </div>
                )}
                {enAttente > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      En attente
                    </span>
                    <span className="font-medium">{enAttente}</span>
                  </div>
                )}
                {enRetard > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      En retard
                    </span>
                    <span className="font-medium">{enRetard}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Titre dynamique
  const getTitle = () => {
    const options: Intl.DateTimeFormatOptions = {};
    
    if (viewMode === 'month') {
      options.month = 'long';
      options.year = 'numeric';
    } else if (viewMode === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      const end = weekDays[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
      return `${start} - ${end}`;
    } else if (viewMode === 'year') {
      options.year = 'numeric';
    }
    
    return currentDate.toLocaleDateString('fr-FR', options);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {getTitle()}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Mois
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Semaine
            </Button>
            <Button
              variant={viewMode === 'year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('year')}
            >
              Année
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === 'month' && <MonthView />}
        {viewMode === 'week' && <WeekView />}
        {viewMode === 'year' && <YearView />}
      </CardContent>
    </Card>
  );
};

export default CalendrierEcheances;