// src/components/tontines/ConfigurationSection.tsx
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  
} from "../ui/card";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ConfigurationSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  const parametres = [
    { label: "Montant par cotisation", value: "50,000 XOF", editable: true },
    { label: "Périodicité", value: "Mensuelle", editable: true },
    { label: "Commission (%)", value: "2.5%", editable: true },
    { label: "Pénalité retard", value: "5,000 XOF", editable: true },
    { label: "Délai de grâce", value: "3 jours", editable: true },
    { label: "Mode de collecte", value: "Séquentiel", editable: true },
  ];

  const [rules, setRules] = useState(
    "Chaque membre doit cotiser sans faute pour avancer dans la tontine."
  );
  const [penaltiesBonuses, setPenaltiesBonuses] = useState(
    "Retard = pénalité de 10%; cotisation précoce = bonus 5%."
  );

  return (
    <section className="space-y-6">
      {/* Paramètres modifiables */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Paramètres de la tontine</CardTitle>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Sauvegarder" : "Modifier"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parametres.map((param, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-sm font-medium text-gray-600">{param.label}</label>
                {isEditing && param.editable ? (
                  <Input defaultValue={param.value} />
                ) : (
                  <p className="text-sm text-gray-800 p-2 bg-gray-50 rounded">{param.value}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Règles de fonctionnement */}
      <Card>
        <CardHeader>
          <CardTitle>Règles de fonctionnement</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-800">{rules}</p>
          )}
        </CardContent>
      </Card>

      {/* Pénalités et bonus */}
      <Card>
        <CardHeader>
          <CardTitle>Pénalités et bonus</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={penaltiesBonuses}
              onChange={(e) => setPenaltiesBonuses(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-800">{penaltiesBonuses}</p>
          )}
        </CardContent>
      </Card>

      {/* Actions administratives */}
      <div className="flex gap-4">
        <Button variant="destructive">Bloquer la tontine</Button>
        <Button variant="outline">Supprimer la tontine</Button>
      </div>
    </section>
  );
};
