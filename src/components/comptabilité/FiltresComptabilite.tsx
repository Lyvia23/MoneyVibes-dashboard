"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { FileText, Download } from "lucide-react"

export function FiltresComptabilite() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Période
                            </label>
                            <Select defaultValue="ce-mois">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Période" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ce-mois">Ce mois</SelectItem>
                                    <SelectItem value="mois-dernier">Mois dernier</SelectItem>
                                    <SelectItem value="trimestre">Ce trimestre</SelectItem>
                                    <SelectItem value="annee">Cette année</SelectItem>
                                    <SelectItem value="personnalise">Personnalisé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <Select defaultValue="toutes-transactions">
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="toutes-transactions">Toutes transactions</SelectItem>
                                    <SelectItem value="cotisations">Cotisations</SelectItem>
                                    <SelectItem value="prets">Prêts accordés</SelectItem>
                                    <SelectItem value="remboursements">Remboursements</SelectItem>
                                    <SelectItem value="frais">Frais de gestion</SelectItem>
                                    <SelectItem value="evenements">Événements</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Catégorie
                            </label>

                            <Select defaultValue="toutes-categories">
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="toutes-categories">Toutes catégories</SelectItem>
                                    <SelectItem value="recettes">Recettes</SelectItem>
                                    <SelectItem value="depenses">Dépenses</SelectItem>
                                    <SelectItem value="transferts">Transferts</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { }}
                            className="h-10 px-4 bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 rounded-lg font-medium transition-colors duration-200"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Excel
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { }}
                            className="h-10 px-4 bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 rounded-lg font-medium transition-colors duration-200"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            PDF
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}