"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  User, 
  ArrowLeft, 
  Edit3, 
  Shield, 
  Wallet, 
  TrendingUp, 
  Activity, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CreditCard,
  Lock,
  Unlock,
  Plus,
  Minus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react"
import { useSetPageInfo } from "@/src/Context/pageContext"

// Types pour les données utilisateur étendues
interface UserDetail {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  joinDate: string
  lastLogin: string
  status: 'active' | 'inactive' | 'suspended'
  accountType: 'independent' | 'microfinance'
  kycStatus: 'validated' | 'pending' | 'rejected'
  
  // Informations personnelles
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: 'male' | 'female' | 'other'
    address: {
      street: string
      city: string
      country: string
      postalCode: string
    }
    nationality: string
    profession: string
    emergencyContact: {
      name: string
      phone: string
      relationship: string
    }
  }
  
  // Wallet & Transactions
  wallet: {
    mainBalance: number
    frozenBalance: number
    availableBalance: number
    loyaltyPoints: number
    totalDeposits: number
    totalWithdrawals: number
    lastTransaction: string
  }
  
  // KYC & Documents
  kyc: {
    status: 'validated' | 'pending' | 'rejected'
    submissionDate: string
    validationDate?: string
    documents: {
      id: string
      type: 'identity' | 'address' | 'income'
      name: string
      status: 'approved' | 'pending' | 'rejected'
      uploadDate: string
    }[]
    riskScore: number
  }
  
  // Tontines
  tontines: {
    active: {
      id: string
      name: string
      amount: number
      position: number
      nextPayment: string
      performance: number
    }[]
    history: {
      id: string
      name: string
      completedDate: string
      finalAmount: number
      performance: number
    }[]
  }
  
  // Activité & Sécurité
  activity: {
    loginHistory: {
      date: string
      ip: string
      device: string
      location: string
      success: boolean
    }[]
    recentActions: {
      date: string
      action: string
      details: string
    }[]
    reports: {
      received: number
      sent: number
      details: {
        date: string
        type: string
        status: string
      }[]
    }
  }
}

// Données mockées - à remplacer par l'API
const mockUserDetail: UserDetail = {
  id: "1",
  name: "Marie Kouadio",
  email: "marie.kouadio@email.com", 
  phone: "+225 07 123 456",
  joinDate: "2023-01-15",
  lastLogin: "2024-01-20T10:30:00Z",
  status: "active",
  accountType: "independent",
  kycStatus: "validated",
  
  personalInfo: {
    firstName: "Marie",
    lastName: "Kouadio", 
    dateOfBirth: "1985-06-15",
    gender: "female",
    address: {
      street: "123 Rue des Jardins",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      postalCode: "00225"
    },
    nationality: "Ivoirienne",
    profession: "Commerçante",
    emergencyContact: {
      name: "Jean Kouadio",
      phone: "+225 07 654 321", 
      relationship: "Époux"
    }
  },
  
  wallet: {
    mainBalance: 125000,
    frozenBalance: 15000,
    availableBalance: 110000,
    loyaltyPoints: 1250,
    totalDeposits: 500000,
    totalWithdrawals: 375000,
    lastTransaction: "2024-01-19T14:20:00Z"
  },
  
  kyc: {
    status: "validated",
    submissionDate: "2023-01-16T09:00:00Z",
    validationDate: "2023-01-18T16:30:00Z",
    documents: [
      {
        id: "doc1",
        type: "identity",
        name: "Carte d'identité nationale",
        status: "approved",
        uploadDate: "2023-01-16T09:00:00Z"
      },
      {
        id: "doc2", 
        type: "address",
        name: "Facture d'électricité",
        status: "approved",
        uploadDate: "2023-01-16T09:05:00Z"
      }
    ],
    riskScore: 25
  },
  
  tontines: {
    active: [
      {
        id: "t1",
        name: "Tontine des Commerçants",
        amount: 50000,
        position: 3,
        nextPayment: "2024-02-01",
        performance: 95
      }
    ],
    history: [
      {
        id: "t2", 
        name: "Tontine Familiale 2023",
        completedDate: "2023-12-15",
        finalAmount: 120000,
        performance: 100
      }
    ]
  },
  
  activity: {
    loginHistory: [
      {
        date: "2024-01-20T10:30:00Z",
        ip: "197.149.90.15",
        device: "Mobile - Android",
        location: "Abidjan, CI",
        success: true
      },
      {
        date: "2024-01-19T08:15:00Z", 
        ip: "197.149.90.15",
        device: "Desktop - Chrome",
        location: "Abidjan, CI",
        success: true
      }
    ],
    recentActions: [
      {
        date: "2024-01-19T14:20:00Z",
        action: "Dépôt",
        details: "Dépôt de 25 000 XOF"
      },
      {
        date: "2024-01-18T16:45:00Z",
        action: "Mise à jour profil", 
        details: "Modification du numéro de téléphone"
      }
    ],
    reports: {
      received: 0,
      sent: 1,
      details: [
        {
          date: "2024-01-10T12:00:00Z",
          type: "Signalement technique",
          status: "Résolu"
        }
      ]
    }
  }
}



// Composants utilitaires
const StatusBadge = ({ status, type }: { status: string, type: 'account' | 'kyc' }) => {
  const getStatusConfig = () => {
    if (type === 'account') {
      switch (status) {
        case 'active': return { label: 'Actif', class: 'bg-green-100 text-green-800' }
        case 'inactive': return { label: 'Inactif', class: 'bg-yellow-100 text-yellow-800' }
        case 'suspended': return { label: 'Suspendu', class: 'bg-red-100 text-red-800' }
        default: return { label: status, class: 'bg-gray-100 text-gray-800' }
      }
    } else {
      switch (status) {
        case 'validated': return { label: 'Validé', class: 'bg-green-100 text-green-800' }
        case 'pending': return { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' }
        case 'rejected': return { label: 'Rejeté', class: 'bg-red-100 text-red-800' }
        default: return { label: status, class: 'bg-gray-100 text-gray-800' }
      }
    }
  }
  
  const config = getStatusConfig()
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
      {config.label}
    </span>
  )
}

const InfoCard = ({ 
  title, 
  icon: Icon, 
  children, 
  action 
}: { 
  title: string
  icon: any
  children: React.ReactNode
  action?: React.ReactNode 
}) => (
  <div className="bg-white rounded-lg  overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {action}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
)

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulation de chargement des données API
    const fetchUserData = async () => {
      try {
        setLoading(true)
        // Remplacer par l'appel API réel
        // const response = await fetch(`/api/members/${params.id}`)
        // const data = await response.json()
        
        // Simulation avec données mockées
        setTimeout(() => {
          setUserData(mockUserDetail)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [params.id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit'
    })
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes('Mobile')) return Smartphone
    if (device.includes('Desktop')) return Monitor
    return Globe
  }

  const handleWalletAction = (action: 'freeze' | 'unfreeze' | 'adjust') => {
    console.log(`Action wallet: ${action} pour l'utilisateur ${userData?.id}`)
    // Implémenter les actions wallet
  }

  const handleKycAction = (action: 'approve' | 'reject', documentId?: string) => {
    console.log(`Action KYC: ${action}`, documentId)
    // Implémenter les actions KYC
  }

  
  if (loading) {
     useSetPageInfo({
    title: "Chargement...",
    description: "Chargement des informations de l'utilisateur",
    notificationCount: 3
  })
    return (
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    )
  }

  if (!userData) {
     useSetPageInfo({
    title: "Utilisateur introuvable",
    description: "Aucun utilisateur trouvé avec cet identifiant.",
    notificationCount: 3
  })
    return (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">Utilisateur introuvable</div>
          <button 
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            Retour à la liste
          </button>
        </div>
    )
  }
  useSetPageInfo({
    title: `Détails de ${userData.name}`,
    description: "Informations complètes du membre",
    notificationCount: 3
  })
  return (
  
      <div className="w-full mx-auto p-6 space-y-6">
        {/* Header avec actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Retour</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span>Compte</span> <StatusBadge status={userData.status} type="account" /> 
            <span>KYC</span> <StatusBadge status={userData.kycStatus} type="kyc" />
            <button className="flex items-center space-x-1 px-3 py-2 bg-[#f97316] text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit3 className="h-4 w-4" />
              <span>Modifier</span>
            </button>
          </div>
        </div>

        {/* Profil utilisateur principal */}
        <InfoCard title="Informations Personnelles" icon={User}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Photo de profil */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userData.personalInfo.firstName[0]}{userData.personalInfo.lastName[0]}
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-[#f97316] text-white rounded-full hover:bg-blue-700">
                  <Edit3 className="h-3 w-3" />
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-gray-500">{userData.personalInfo.profession}</p>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date de naissance</p>
                    <p className="font-medium">{formatDate(userData.personalInfo.dateOfBirth)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-medium">
                      {userData.personalInfo.address.street}, {userData.personalInfo.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact d'urgence</p>
                    <p className="font-medium">{userData.personalInfo.emergencyContact.name}</p>
                    <p className="text-sm text-gray-400">{userData.personalInfo.emergencyContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Membre depuis</p>
                    <p className="font-medium">{formatDate(userData.joinDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InfoCard>

        {/* Wallet & Transactions */}
        <InfoCard 
          title="Wallet & Transactions" 
          icon={Wallet}
          action={
            <div className="flex space-x-2">
              <button 
                onClick={() => handleWalletAction('freeze')}
                className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm"
              >
                <Lock className="h-3 w-3" />
                <span>Geler</span>
              </button>
              <button 
                onClick={() => handleWalletAction('adjust')}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm"
              >
                <Edit3 className="h-3 w-3" />
                <span>Ajuster</span>
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white  p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black  text-sm font-medium">Solde disponible</p>
                  <p className="text-xl font-bold text-green-700">
                    {formatCurrency(userData.wallet.availableBalance)}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white  p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Solde principal</p>
                  <p className="text-xl font-bold text-blue-700">
                    {formatCurrency(userData.wallet.mainBalance)}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white  p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Solde gelé</p>
                  <p className="text-xl font-bold text-orange-700">
                    {formatCurrency(userData.wallet.frozenBalance)}
                  </p>
                </div>
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-white  p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Points fidélité</p>
                  <p className="text-xl font-bold text-purple-700">
                    {userData.wallet.loyaltyPoints.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Résumé des transactions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total dépôts</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(userData.wallet.totalDeposits)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total retraits</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(userData.wallet.totalWithdrawals)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600">Dernière transaction</span>
                  <span className="font-medium">{formatDate(userData.wallet.lastTransaction)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Graphique évolution (30j)</h4>
              <div className="h-32 flex items-end justify-center text-gray-500">
                <TrendingUp className="h-8 w-8" />
                <span className="ml-2">Graphique à intégrer</span>
              </div>
            </div>
          </div>
        </InfoCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tontines */}
          <InfoCard title="Tontines & Performances" icon={TrendingUp}>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tontines actives</h4>
                {userData.tontines.active.length > 0 ? (
                  <div className="space-y-3">
                    {userData.tontines.active.map((tontine) => (
                      <div key={tontine.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{tontine.name}</h5>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {tontine.performance}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span>Montant: </span>
                            <span className="font-medium">{formatCurrency(tontine.amount)}</span>
                          </div>
                          <div>
                            <span>Position: </span>
                            <span className="font-medium">{tontine.position}</span>
                          </div>
                          <div className="col-span-2">
                            <span>Prochain paiement: </span>
                            <span className="font-medium">{formatDate(tontine.nextPayment)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune tontine active</p>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Historique</h4>
                {userData.tontines.history.length > 0 ? (
                  <div className="space-y-2">
                    {userData.tontines.history.map((tontine) => (
                      <div key={tontine.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <p className="font-medium">{tontine.name}</p>
                          <p className="text-sm text-gray-500">
                            Terminée le {formatDate(tontine.completedDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(tontine.finalAmount)}</p>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {tontine.performance}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aucun historique</p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* KYC & Documents */}
          <InfoCard 
            title="KYC & Documents" 
            icon={Shield}
            action={
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  userData.kyc.riskScore < 30 ? 'bg-green-500' : 
                  userData.kyc.riskScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  Score risque: {userData.kyc.riskScore}%
                </span>
              </div>
            }
          >
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Statut KYC</h4>
                  <StatusBadge status={userData.kycStatus} type="kyc" />
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Soumis le: {formatDate(userData.kyc.submissionDate)}</p>
                  {userData.kyc.validationDate && (
                    <p>Validé le: {formatDate(userData.kyc.validationDate)}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
                <div className="space-y-3">
                  {userData.kyc.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {doc.status === 'approved' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : doc.status === 'rejected' ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploadé le {formatDate(doc.uploadDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {userData.kycStatus === 'pending' && (
                  <div className="flex space-x-3 mt-4">
                    <button 
                      onClick={() => handleKycAction('approve')}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approuver</span>
                    </button>
                    <button 
                      onClick={() => handleKycAction('reject')}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Rejeter</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Activité & Sécurité */}
        <InfoCard 
          title="Activité & Sécurité" 
          icon={Activity}
          action={
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                userData.activity.reports.received === 0 ? 'bg-green-500' : 
                userData.activity.reports.received < 3 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {userData.activity.reports.received} signalement(s)
              </span>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Historique des connexions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Historique des connexions</span>
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {userData.activity.loginHistory.map((login, index) => {
                  const DeviceIcon = getDeviceIcon(login.device)
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {login.success ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <DeviceIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {login.device}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {formatDate(login.date)}
                        </p>
                        <p className="text-xs text-gray-500">
                          IP: {login.ip} - {login.location}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Actions récentes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Actions récentes</span>
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {userData.activity.recentActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3  rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {action.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {action.details}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(action.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Signalements */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Signalements & Rapports</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white  p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 text-sm font-medium">Reçus</p>
                    <p className="text-xl font-bold text-red-700">
                      {userData.activity.reports.received}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white  p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="bg-white  text-sm font-medium">Émis</p>
                    <p className="text-xl font-bold text-blue-700">
                      {userData.activity.reports.sent}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white  p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Score Risque</p>
                    <p className="text-xl font-bold text-purple-700">
                      {userData.kyc.riskScore}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Détails des signalements */}
            {userData.activity.reports.details.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-700 mb-3">Détails des signalements</h5>
                <div className="space-y-2">
                  {userData.activity.reports.details.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{report.type}</p>
                        <p className="text-sm text-gray-500">{formatDate(report.date)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Résolu' ? 'bg-green-100 text-green-800' :
                        report.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions administrateur */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Actions Administrateur</span>
            </h4>
            
            <div className="flex flex-wrap gap-3">
              {userData.status === 'active' ? (
                <button className="flex items-center space-x-2 px-4 py-2 bg-white  text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Lock className="h-4 w-4" />
                  <span>Suspendre compte</span>
                </button>
              ) : (
                <button className="flex items-center space-x-2 px-4 py-2 bg-white  text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Unlock className="h-4 w-4" />
                  <span>Réactiver compte</span>
                </button>
              )}
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white  text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                <AlertTriangle className="h-4 w-4" />
                <span>Signaler utilisateur</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white  text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Modifier profil</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white  text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="h-4 w-4" />
                <span>Exporter données</span>
              </button>
            </div>
          </div>
        </InfoCard>

        {/* Footer avec informations système */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900 mb-1">Informations système</p>
              <p>ID utilisateur: {userData.id}</p>
              <p>Type de compte: {userData.accountType === 'independent' ? 'Indépendant' : 'Microfinance'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Dernière activité</p>
              <p>Connexion: {formatDate(userData.lastLogin)}</p>
              <p>Transaction: {formatDate(userData.wallet.lastTransaction)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Métriques</p>
              <p>Score de confiance: {100 - userData.kyc.riskScore}%</p>
              <p>Nombre de tontines: {userData.tontines.active.length + userData.tontines.history.length}</p>
            </div>
          </div>
        </div>
      </div>
  )
}