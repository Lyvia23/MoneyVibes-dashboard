"use client"

import { useState, useMemo } from "react"
import { DonneeFlux } from "@/src/types/comptabilite"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { FileText, Download, Calendar, Filter, Loader2 } from "lucide-react"

interface GraphiqueFluxFinancierProps {
  donnees: DonneeFlux[]
}

interface TooltipPayloadEntry {
  name: string
  value: number
  color: string
}

interface TooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}

// Composant personnalisé pour le tooltip
const TooltipPersonnalise = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3  rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString('fr-FR')} XOF
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function GraphiqueFluxFinancier({ donnees }: GraphiqueFluxFinancierProps) {
  const [periode, setPeriode] = useState("toute-periode")
  const [typeTransaction, setTypeTransaction] = useState("toutes-transactions")
  const [categorieAffichage, setCategorieAffichage] = useState("toutes-categories")
  const [exportEnCours, setExportEnCours] = useState<'excel' | 'pdf' | null>(null)

  // Fonction pour filtrer les données selon la période
  const filtrerParPeriode = (donnees: DonneeFlux[], periode: string) => {
    const maintenant = new Date()
    const anneeActuelle = maintenant.getFullYear()
    const moisActuel = maintenant.getMonth() + 1
    
    switch (periode) {
      case "ce-mois":
        const moisActuelNom = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(maintenant)
        return donnees.filter(item => item.mois.toLowerCase().includes(moisActuelNom.toLowerCase()))
      
      case "mois-dernier":
        const moisDernier = new Date(anneeActuelle, moisActuel - 2, 1)
        const moisDernierNom = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(moisDernier)
        return donnees.filter(item => item.mois.toLowerCase().includes(moisDernierNom.toLowerCase()))
      
      case "trimestre":
        const trimestreActuel = Math.floor((moisActuel - 1) / 3) + 1
        const moisTrimestre: string[] = []
        for (let i = (trimestreActuel - 1) * 3; i < trimestreActuel * 3; i++) {
          const moisNom = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(anneeActuelle, i, 1))
          moisTrimestre.push(moisNom.toLowerCase())
        }
        return donnees.filter(item => moisTrimestre.some(mois => item.mois.toLowerCase().includes(mois)))
      
      case "annee":
        return donnees
      
      default:
        return donnees
    }
  }

  // Fonction pour transformer les données selon le type de transaction
  const transformerDonnees = (donnees: DonneeFlux[], type: string, categorie: string) => {
    return donnees.map(item => {
      let nouvelItem: any = { mois: item.mois }
      
      switch (type) {
        case "cotisations":
          nouvelItem.cotisations = item.cotisations
          break
        case "prets":
          nouvelItem.pretsAccordes = item.pretsAccordes
          break
        case "remboursements":
          nouvelItem.remboursements = item.remboursements
          break
        default:
          if (categorie === "recettes") {
            nouvelItem.cotisations = item.cotisations
            nouvelItem.remboursements = item.remboursements
          } else if (categorie === "depenses") {
            nouvelItem.pretsAccordes = item.pretsAccordes
          } else {
            nouvelItem.cotisations = item.cotisations
            nouvelItem.pretsAccordes = item.pretsAccordes
            nouvelItem.remboursements = item.remboursements
          }
          break
      }
      
      return nouvelItem
    })
  }

  // Données filtrées et transformées
  const donneesTraitees = useMemo(() => {
    const donneesFiltrees = filtrerParPeriode(donnees, periode)
    return transformerDonnees(donneesFiltrees, typeTransaction, categorieAffichage)
  }, [donnees, periode, typeTransaction, categorieAffichage])

  // Calculer les totaux pour la légende
  const calculerTotaux = () => {
    return {
      cotisations: donneesTraitees.reduce((sum, item) => sum + (item.cotisations || 0), 0),
      pretsAccordes: donneesTraitees.reduce((sum, item) => sum + (item.pretsAccordes || 0), 0),
      remboursements: donneesTraitees.reduce((sum, item) => sum + (item.remboursements || 0), 0),
    }
  }

  const totaux = calculerTotaux()

  // Fonction pour créer les données CSV
  const creerCSV = () => {
    const headers = ['Mois']
    const rows: string[][] = []

    // Ajouter les en-têtes selon les données visibles
    if (donneesTraitees.some(item => item.cotisations !== undefined)) headers.push('Cotisations (XOF)')
    if (donneesTraitees.some(item => item.pretsAccordes !== undefined)) headers.push('Prêts Accordés (XOF)')
    if (donneesTraitees.some(item => item.remboursements !== undefined)) headers.push('Remboursements (XOF)')

    // Ajouter les données
    donneesTraitees.forEach(item => {
      const row = [item.mois]
      if (donneesTraitees.some(i => i.cotisations !== undefined)) {
        row.push((item.cotisations || 0).toString())
      }
      if (donneesTraitees.some(i => i.pretsAccordes !== undefined)) {
        row.push((item.pretsAccordes || 0).toString())
      }
      if (donneesTraitees.some(i => i.remboursements !== undefined)) {
        row.push((item.remboursements || 0).toString())
      }
      rows.push(row)
    })

    // Ajouter une ligne de totaux
    const totalRow = ['TOTAL']
    if (donneesTraitees.some(item => item.cotisations !== undefined)) totalRow.push(totaux.cotisations.toString())
    if (donneesTraitees.some(item => item.pretsAccordes !== undefined)) totalRow.push(totaux.pretsAccordes.toString())
    if (donneesTraitees.some(item => item.remboursements !== undefined)) totalRow.push(totaux.remboursements.toString())
    rows.push(totalRow)

    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  // Fonction d'export Excel
  const exporterExcel = async () => {
    setExportEnCours('excel')
    try {
      const csvData = creerCSV()
      const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      
      const nomFichier = `flux-financiers-${periode}-${typeTransaction}-${new Date().toISOString().split('T')[0]}.csv`
      
      link.href = URL.createObjectURL(blob)
      link.download = nomFichier
      link.click()
      
      // Nettoyer l'URL
      setTimeout(() => {
        URL.revokeObjectURL(link.href)
      }, 100)
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error)
    } finally {
      setExportEnCours(null)
    }
  }

  // Fonction d'export PDF
  const exporterPDF = async () => {
    setExportEnCours('pdf')
    try {
      // Créer le contenu HTML du PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Rapport Flux Financiers</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 15px; }
            .filters { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .filters h3 { margin: 0 0 10px 0; color: #4f46e5; }
            .filters p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; color: #475569; }
            .number { text-align: right; }
            .total-row { background-color: #fef3c7; font-weight: bold; }
            .summary { background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .summary h3 { margin: 0 0 10px 0; color: #1e40af; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport des Flux Financiers</h1>
            <p>Généré le ${new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          
          <div class="filters">
            <h3>Filtres appliqués</h3>
            <p><strong>Période:</strong> ${periode.replace('-', ' ')}</p>
            <p><strong>Type de transaction:</strong> ${typeTransaction.replace('-', ' ')}</p>
            <p><strong>Catégorie:</strong> ${categorieAffichage.replace('-', ' ')}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Mois</th>
                ${donneesTraitees.some(item => item.cotisations !== undefined) ? '<th class="number">Cotisations (XOF)</th>' : ''}
                ${donneesTraitees.some(item => item.pretsAccordes !== undefined) ? '<th class="number">Prêts Accordés (XOF)</th>' : ''}
                ${donneesTraitees.some(item => item.remboursements !== undefined) ? '<th class="number">Remboursements (XOF)</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${donneesTraitees.map(item => `
                <tr>
                  <td>${item.mois}</td>
                  ${donneesTraitees.some(i => i.cotisations !== undefined) ? `<td class="number">${(item.cotisations || 0).toLocaleString('fr-FR')}</td>` : ''}
                  ${donneesTraitees.some(i => i.pretsAccordes !== undefined) ? `<td class="number">${(item.pretsAccordes || 0).toLocaleString('fr-FR')}</td>` : ''}
                  ${donneesTraitees.some(i => i.remboursements !== undefined) ? `<td class="number">${(item.remboursements || 0).toLocaleString('fr-FR')}</td>` : ''}
                </tr>
              `).join('')}
              <tr class="total-row">
                <td><strong>TOTAL</strong></td>
                ${donneesTraitees.some(item => item.cotisations !== undefined) ? `<td class="number"><strong>${totaux.cotisations.toLocaleString('fr-FR')}</strong></td>` : ''}
                ${donneesTraitees.some(item => item.pretsAccordes !== undefined) ? `<td class="number"><strong>${totaux.pretsAccordes.toLocaleString('fr-FR')}</strong></td>` : ''}
                ${donneesTraitees.some(item => item.remboursements !== undefined) ? `<td class="number"><strong>${totaux.remboursements.toLocaleString('fr-FR')}</strong></td>` : ''}
              </tr>
            </tbody>
          </table>

          <div class="summary">
            <h3>Résumé</h3>
            <p>Ce rapport présente les flux financiers selon les critères sélectionnés.</p>
            <p><strong>Nombre de périodes:</strong> ${donneesTraitees.length}</p>
            <p><strong>Total général:</strong> ${(totaux.cotisations + totaux.pretsAccordes + totaux.remboursements).toLocaleString('fr-FR')} XOF</p>
          </div>
        </body>
        </html>
      `

      // Créer et télécharger le PDF
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const link = document.createElement('a')
      
      const nomFichier = `rapport-flux-financiers-${periode}-${typeTransaction}-${new Date().toISOString().split('T')[0]}.html`
      
      link.href = URL.createObjectURL(blob)
      link.download = nomFichier
      link.click()
      
      // Nettoyer l'URL
      setTimeout(() => {
        URL.revokeObjectURL(link.href)
      }, 100)

      // Note: Pour un vrai PDF, vous pourriez utiliser une bibliothèque comme jsPDF ou Puppeteer
      console.log('PDF HTML généré. Pour un vrai PDF, intégrez jsPDF ou une solution serveur.')
      
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error)
    } finally {
      setExportEnCours(null)
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Filtres */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            {/* Titre des filtres sur mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filtres</h3>
            </div>

            {/* Conteneur principal des filtres */}
            <div className="flex flex-col xl:flex-row gap-4 xl:items-end xl:justify-between">
              
              {/* Groupe des selects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Période</span>
                  </label>
                  <Select value={periode} onValueChange={setPeriode}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toute-periode">Toute période</SelectItem>
                      <SelectItem value="ce-mois">Ce mois</SelectItem>
                      <SelectItem value="mois-dernier">Mois dernier</SelectItem>
                      <SelectItem value="trimestre">Ce trimestre</SelectItem>
                      <SelectItem value="annee">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Type</span>
                  </label>
                  <Select value={typeTransaction} onValueChange={setTypeTransaction}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes-transactions">Toutes transactions</SelectItem>
                      <SelectItem value="cotisations">Cotisations</SelectItem>
                      <SelectItem value="prets">Prêts accordés</SelectItem>
                      <SelectItem value="remboursements">Remboursements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Catégorie</span>
                  </label>
                  <Select value={categorieAffichage} onValueChange={setCategorieAffichage}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes-categories">Toutes catégories</SelectItem>
                      <SelectItem value="recettes">Recettes</SelectItem>
                      <SelectItem value="depenses">Dépenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Boutons d'export */}
              <div className="flex flex-col sm:flex-row gap-2 xl:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exporterExcel}
                  disabled={exportEnCours === 'excel'}
                  className="flex-1 sm:flex-none h-10 px-4 bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 rounded-lg font-medium transition-colors duration-200 disabled:opacity-60"
                >
                  {exportEnCours === 'excel' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  <span className="hidden sm:inline">Excel</span>
                  <span className="sm:hidden">CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exporterPDF}
                  disabled={exportEnCours === 'pdf'}
                  className="flex-1 sm:flex-none h-10 px-4 bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 rounded-lg font-medium transition-colors duration-200 disabled:opacity-60"
                >
                  {exportEnCours === 'pdf' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg lg:text-xl font-semibold">Flux financiers mensuels</CardTitle>
            {(periode !== "toute-periode" || typeTransaction !== "toutes-transactions" || categorieAffichage !== "toutes-categories") && (
              <div className="flex flex-wrap gap-1 text-xs lg:text-sm text-gray-600">
                {periode !== "toute-periode" && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1  rounded">
                    {periode.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
                  </span>
                )}
                {typeTransaction !== "toutes-transactions" && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {typeTransaction.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
                  </span>
                )}
                {categorieAffichage !== "toutes-categories" && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {categorieAffichage.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-2 lg:p-6">
          <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={donneesTraitees}
                margin={{
                  top: 20,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="mois" 
                  tick={{ fontSize: 11 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickFormatter={(value) => `${(value / 1000)}k`}
                />
                <Tooltip content={<TooltipPersonnalise />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                  iconType="circle"
                />
                
                {/* Affichage conditionnel des barres selon les filtres */}
                {(typeTransaction === "toutes-transactions" || typeTransaction === "cotisations") && 
                 (categorieAffichage === "toutes-categories" || categorieAffichage === "recettes") && (
                  <Bar 
                    dataKey="cotisations" 
                    fill="#22c55e" 
                    name="Cotisations"
                    radius={[2, 2, 0, 0]}
                  />
                )}
                
                {(typeTransaction === "toutes-transactions" || typeTransaction === "prets") && 
                 (categorieAffichage === "toutes-categories" || categorieAffichage === "depenses") && (
                  <Bar 
                    dataKey="pretsAccordes" 
                    fill="#f97316" 
                    name="Prêts accordés"
                    radius={[2, 2, 0, 0]}
                  />
                )}
                
                {(typeTransaction === "toutes-transactions" || typeTransaction === "remboursements") && 
                 (categorieAffichage === "toutes-categories" || categorieAffichage === "recettes") && (
                  <Bar 
                    dataKey="remboursements" 
                    fill="#6b7280" 
                    name="Remboursements"
                    radius={[2, 2, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Légende personnalisée avec les totaux filtrés - Responsive */}
          <div className="mt-4 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {((typeTransaction === "toutes-transactions" || typeTransaction === "cotisations") && 
              (categorieAffichage === "toutes-categories" || categorieAffichage === "recettes")) && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Cotisations</span>
                </div>
                <span className="text-sm font-bold text-green-600 text-right">
                  {totaux.cotisations.toLocaleString('fr-FR')} <span className="hidden sm:inline">XOF</span>
                </span>
              </div>
            )}
            
            {((typeTransaction === "toutes-transactions" || typeTransaction === "prets") && 
              (categorieAffichage === "toutes-categories" || categorieAffichage === "depenses")) && (
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Prêts accordés</span>
                </div>
                <span className="text-sm font-bold text-orange-600 text-right">
                  {totaux.pretsAccordes.toLocaleString('fr-FR')} <span className="hidden sm:inline">XOF</span>
                </span>
              </div>
            )}
            
            {((typeTransaction === "toutes-transactions" || typeTransaction === "remboursements") && 
              (categorieAffichage === "toutes-categories" || categorieAffichage === "recettes")) && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Remboursements</span>
                </div>
                <span className="text-sm font-bold text-gray-600 text-right">
                  {totaux.remboursements.toLocaleString('fr-FR')} <span className="hidden sm:inline">XOF</span>
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}