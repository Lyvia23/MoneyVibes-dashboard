"use client"
import { useState } from "react"
import { MessageCircle, Send, Phone, Video, MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { cn } from "@/src/lib/utils"

interface ConversationChat {
  id: string
  utilisateur: {
    nom: string
    avatar?: string
    statut: 'en-ligne' | 'absent' | 'occupe'
  }
  dernierMessage: string
  horodatage: string
  messagesNonLus: number
  priorite: 'normale' | 'urgente'
  messages: Message[] // Ajout de la propriété messages
}

interface Message {
  id: string
  contenu: string
  expediteur: 'utilisateur' | 'agent'
  horodatage: string
}

// Composant pour afficher un message
function MessageItem({ message }: { message: Message }) {
  const estAgent = message.expediteur === 'agent'
  
  return (
    <div className={cn(
      "flex",
      estAgent ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[70%] p-3 rounded-lg",
        estAgent 
          ? "bg-gray-100 text-gray-900" 
          : "bg-orange-500 text-white"
      )}>
        <p className="text-sm">{message.contenu}</p>
        <p className={cn(
          "text-xs mt-1",
          estAgent ? "text-gray-500" : "text-orange-100"
        )}>
          {message.horodatage}
        </p>
      </div>
    </div>
  )
}

const messagesExample: Message[] = [
  {
    id: '1',
    contenu: 'Bonjour, j\'ai un problème pour me connecter à mon compte.',
    expediteur: 'utilisateur',
    horodatage: '14:20'
  },
  {
    id: '2',
    contenu: 'Bonjour ! Je vais vous aider avec ce problème. Pouvez-vous me dire quel message d\'erreur vous voyez ?',
    expediteur: 'agent',
    horodatage: '14:21'
  },
  {
    id: '3',
    contenu: 'Il me dit "Identifiants incorrects" mais je suis sûr de mon mot de passe.',
    expediteur: 'utilisateur',
    horodatage: '14:23'
  },
  {
    id: '4',
    contenu: 'Je vois le problème. Votre compte a été temporairement verrouillé pour sécurité. Je vais le débloquer maintenant.',
    expediteur: 'agent',
    horodatage: '14:24'
  }
]

const conversationsChat: ConversationChat[] = [
  {
    id: '1',
    utilisateur: {
      nom: 'Koffi Asante',
      avatar: '/avatar1.jpg',
      statut: 'en-ligne'
    },
    dernierMessage: 'Je n\'arrive pas à me connecter depuis ce matin...',
    horodatage: '14:25',
    messagesNonLus: 2,
    priorite: 'urgente',
    messages: messagesExample
  },
  {
    id: '2',
    utilisateur: {
      nom: 'Aminata Traoré',
      avatar: '/avatar2.jpg',
      statut: 'en-ligne'
    },
    dernierMessage: 'Merci pour votre aide, c\'est résolu !',
    horodatage: '13:45',
    messagesNonLus: 0,
    priorite: 'normale',
    messages: [
      {
        id: '5',
        contenu: 'Merci pour votre aide, c\'est résolu !',
        expediteur: 'utilisateur',
        horodatage: '13:45'
      }
    ]
  },
  {
    id: '3',
    utilisateur: {
      nom: 'Ibrahim Ouattara',
      avatar: '/avatar3.jpg',
      statut: 'absent'
    },
    dernierMessage: 'Pouvez-vous m\'expliquer comment...',
    horodatage: '12:30',
    messagesNonLus: 1,
    priorite: 'normale',
    messages: [
      {
        id: '6',
        contenu: 'Pouvez-vous m\'expliquer comment...',
        expediteur: 'utilisateur',
        horodatage: '12:30'
      }
    ]
  },
  {
    id: '4',
    utilisateur: {
      nom: 'Fatou Coulibaly',
      avatar: '/avatar4.jpg',
      statut: 'occupe'
    },
    dernierMessage: 'Le système affiche une erreur...',
    horodatage: '11:15',
    messagesNonLus: 3,
    priorite: 'urgente',
    messages: [
      {
        id: '7',
        contenu: 'Le système affiche une erreur...',
        expediteur: 'utilisateur',
        horodatage: '11:15'
      }
    ]
  }
]

const configStatut = {
  'en-ligne': { couleur: 'bg-green-500', label: 'En ligne' },
  'absent': { couleur: 'bg-gray-400', label: 'Absent' },
  'occupe': { couleur: 'bg-red-500', label: 'Occupé' }
}

export function ChatSupport() {
  const [conversationActive, setConversationActive] = useState<string>('1')
  const [nouveauMessage, setNouveauMessage] = useState('')
  
  const conversationSelectionnee = conversationsChat.find(c => c.id === conversationActive)
  
  const envoyerMessage = () => {
    if (nouveauMessage.trim()) {
      console.log('Envoi du message:', nouveauMessage)
      setNouveauMessage('')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Liste des conversations */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversations actives
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4">
              {conversationsChat.map((conversation) => {
                const statutConfig = configStatut[conversation.utilisateur.statut]
                const initiales = conversation.utilisateur.nom
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()

                return (
                  <div
                    key={conversation.id}
                    onClick={() => setConversationActive(conversation.id)}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
                      conversationActive === conversation.id
                        ? "bg-orange-50 border border-orange-200"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.utilisateur.avatar} />
                        <AvatarFallback className="text-sm bg-gray-100">
                          {initiales}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                        statutConfig.couleur
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.utilisateur.nom}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {conversation.horodatage}
                          </span>
                          {conversation.messagesNonLus > 0 && (
                            <Badge className="bg-orange-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {conversation.messagesNonLus}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {conversation.dernierMessage}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Fenêtre de chat */}
      <Card className="lg:col-span-2">
        {conversationSelectionnee ? (
          <>
            {/* En-tête de conversation */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversationSelectionnee.utilisateur.avatar} />
                      <AvatarFallback className="text-sm bg-gray-100">
                        {conversationSelectionnee.utilisateur.nom.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                      configStatut[conversationSelectionnee.utilisateur.statut].couleur
                    )} />
                  </div>
                  <div>
                    <p className="font-semibold">{conversationSelectionnee.utilisateur.nom}</p>
                    <p className="text-sm text-gray-500">
                      {configStatut[conversationSelectionnee.utilisateur.statut].label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Corps de la conversation */}
            <CardContent className="p-4">
              <ScrollArea className="h-[350px] mb-4">
                <div className="flex flex-col space-y-4">
                  {conversationSelectionnee.messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>
              
              {/* Zone de saisie */}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={nouveauMessage}
                  onChange={(e) => setNouveauMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && envoyerMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={envoyerMessage}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Sélectionnez une conversation pour afficher les messages</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}