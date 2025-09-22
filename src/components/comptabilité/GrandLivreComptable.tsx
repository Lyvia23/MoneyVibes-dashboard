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
import { Search, ChevronLeft, ChevronRight, Calendar, FileText, Tag, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { TransactionComptable } from "@/src/types/comptabilite"

interface GrandLivreComptableProps {
  transactions: TransactionComptable[]
}

export function GrandLivreComptable({ transactions }: GrandLivreComptableProps) {
  const [recherche, setRecherche] = useState("")
  const [pageActuelle, setPageActuelle] = useState(1)
  const transactionsParPage = 5

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
        {signe}{montant.toLocaleString('fr-FR')} XOF
      </span>
    )
  }

  // Composant Card pour mobile
  const TransactionCard = ({ transaction }: { transaction: TransactionComptable }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {transaction.date}
          </div>
          <Badge 
            variant="outline" 
            className={getCouleurCategorie(transaction.categorie)}
          >
            {transaction.categorie}
          </Badge>
        </div>

        <div className="mb-3">
          <div className="flex items-start gap-2 mb-2">
            <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-900 font-medium leading-tight">
              {transaction.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Recettes</p>
              <p className="font-medium">
                {formaterMontant(transaction.recettes, 'recette')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Dépenses</p>
              <p className="font-medium">
                {formaterMontant(transaction.depenses, 'depense')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Solde</span>
            </div>
            <span className="font-bold text-gray-900">
              {transaction.solde.toLocaleString('fr-FR')} XOF
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Fonction pour générer les numéros de page à afficher
  const genererNumerosPagination = () => {
    const pages = []
    const maxPages = 5

    if (nombreTotalPages <= maxPages) {
      // Si le nombre total de pages est inférieur ou égal à maxPages, afficher toutes les pages
      for (let i = 1; i <= nombreTotalPages; i++) {
        pages.push(i)
      }
    } else {
      // Logique pour afficher les pages avec des ellipses
      const debut = Math.max(1, pageActuelle - 2)
      const fin = Math.min(nombreTotalPages, pageActuelle + 2)

      // Toujours afficher la première page
      if (debut > 1) {
        pages.push(1)
        if (debut > 2) {
          pages.push('...')
        }
      }

      // Afficher les pages autour de la page actuelle
      for (let i = debut; i <= fin; i++) {
        pages.push(i)
      }

      // Toujours afficher la dernière page
      if (fin < nombreTotalPages) {
        if (fin < nombreTotalPages - 1) {
          pages.push('...')
        }
        pages.push(nombreTotalPages)
      }
    }

    return pages
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-semibold">Grand livre comptable</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={recherche}
                onChange={(e) => {
                  setRecherche(e.target.value)
                  setPageActuelle(1) // Reset à la page 1 lors de la recherche
                }}
                className="pl-9 border border-gray-200"
              />
            </div>
          </div>
        </CardHeader>

        {/* Vue desktop - Tableau */}
        <CardContent className="p-0 hidden md:block">
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
                      {transaction.solde.toLocaleString('fr-FR')} XOF
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Vue mobile - Cards */}
      <div className="md:hidden">
        {transactionsAffichees.length > 0 ? (
          transactionsAffichees.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Aucune transaction trouvée</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination responsive */}
      {nombreTotalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Informations sur les résultats */}
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Affichage de {Math.min(indexDebut + 1, transactionsFiltrees.length)} à{' '}
                {Math.min(indexFin, transactionsFiltrees.length)} sur {transactionsFiltrees.length} transactions
              </div>
              
              {/* Contrôles de pagination */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageActuelle(Math.max(1, pageActuelle - 1))}
                  disabled={pageActuelle === 1}
                  className="flex items-center gap-1 px-2 sm:px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Précédent</span>
                </Button>
                
                <div className="flex items-center space-x-1">
                  {genererNumerosPagination().map((numeroPage, index) => (
                    <div key={index}>
                      {numeroPage === '...' ? (
                        <span className="px-2 py-1 text-gray-400">...</span>
                      ) : (
                        <Button
                          variant={pageActuelle === numeroPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPageActuelle(numeroPage as number)}
                          className="w-8 h-8 p-0 text-xs sm:text-sm"
                        >
                          {numeroPage}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageActuelle(Math.min(nombreTotalPages, pageActuelle + 1))}
                  disabled={pageActuelle === nombreTotalPages}
                  className="flex items-center gap-1 px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}