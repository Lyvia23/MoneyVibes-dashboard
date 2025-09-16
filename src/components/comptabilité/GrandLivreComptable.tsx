"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { TransactionComptable } from "@/src/types/comptabilite"


interface GrandLivreComptableProps {
  transactions: TransactionComptable[]
}

export function GrandLivreComptable({ transactions }: GrandLivreComptableProps) {
  const [recherche, setRecherche] = useState("")
  const [pageActuelle, setPageActuelle] = useState(1)
  const transactionsParPage = 6

  // Filtrer les transactions selon la recherche
  const transactionsFiltrees = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(recherche.toLowerCase()) ||
    transaction.categorie.toLowerCase().includes(recherche.toLowerCase())
  )

  // Calculer les transactions à afficher pour la page actuelle
  const indexDebut = (pageActuelle - 1) * transactionsParPage
  const indexFin = indexDebut + transactionsParPage
  const transactionsAffichees = transactionsFiltrees.slice(indexDebut, indexFin)

  // Calculer le nombre total de pages
  const nombreTotalPages = Math.ceil(transactionsFiltrees.length / transactionsParPage)

  // Fonction pour obtenir la couleur du badge selon la catégorie
  const getCouleurCategorie = (categorie: string) => {
    const couleurs: { [key: string]: string } = {
      'Cotisations': 'bg-blue-100 text-blue-800 border-blue-200',
      'Prêts': 'bg-orange-100 text-orange-800 border-orange-200', 
      'Remboursement': 'bg-green-100 text-green-800 border-green-200',
      'Frais': 'bg-red-100 text-red-800 border-red-200',
      'Événements': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return couleurs[categorie] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Fonction pour formater les montants
  const formaterMontant = (montant: number | null, type: 'recette' | 'depense') => {
    if (montant === null) return "-"
    const signe = type === 'recette' ? '+' : '-'
    const couleur = type === 'recette' ? 'text-green-600' : 'text-red-600'
    return (
      <span className={`font-medium ${couleur}`}>
        {signe}{montant.toLocaleString('fr-FR')} FCFA
      </span>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Grand livre comptable</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700 px-6 py-4">DATE</TableHead>
                <TableHead className="font-semibold text-gray-700 px-6 py-4">DESCRIPTION</TableHead>
                <TableHead className="font-semibold text-gray-700 px-6 py-4">CATÉGORIE</TableHead>
                <TableHead className="font-semibold text-gray-700 px-6 py-4 text-right">RECETTES</TableHead>
                <TableHead className="font-semibold text-gray-700 px-6 py-4 text-right">DÉPENSES</TableHead>
                <TableHead className="font-semibold text-gray-700 px-6 py-4 text-right">SOLDE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsAffichees.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700 max-w-xs">
                    <div className="truncate" title={transaction.description}>
                      {transaction.description}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge 
                      variant="outline" 
                      className={getCouleurCategorie(transaction.categorie)}
                    >
                      {transaction.categorie}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {formaterMontant(transaction.recettes, 'recette')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {formaterMontant(transaction.depenses, 'depense')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right font-bold text-gray-900">
                    {transaction.solde.toLocaleString('fr-FR')} FCFA
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-700">
            Affichage de {indexDebut + 1} à {Math.min(indexFin, transactionsFiltrees.length)} sur {transactionsFiltrees.length} transactions
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageActuelle(Math.max(1, pageActuelle - 1))}
              disabled={pageActuelle === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, nombreTotalPages) }, (_, i) => {
                let numeroPage = i + 1
                if (nombreTotalPages > 5 && pageActuelle > 3) {
                  numeroPage = pageActuelle - 2 + i
                  if (numeroPage > nombreTotalPages) {
                    numeroPage = nombreTotalPages - 4 + i
                  }
                }
                
                return (
                  <Button
                    key={numeroPage}
                    variant={pageActuelle === numeroPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPageActuelle(numeroPage)}
                    className="w-8 h-8 p-0"
                  >
                    {numeroPage}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageActuelle(Math.min(nombreTotalPages, pageActuelle + 1))}
              disabled={pageActuelle === nombreTotalPages}
              className="flex items-center gap-2"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}