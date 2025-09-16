import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Check, X } from "lucide-react"

interface PendingRequest {
  id: string
  name: string
  avatar?: string
  memberSince: string
  amount: string
  duration: string
  purpose: string
  purposeColor?: string
}

interface PendingRequestsProps {
  requests: PendingRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

const purposeColors = {
  Commerce: "bg-blue-100 text-blue-800",
  Education: "bg-purple-100 text-purple-800",
  Agriculture: "bg-green-100 text-green-800",
  Santé: "bg-red-100 text-red-800",
  Personnel: "bg-gray-100 text-gray-800"
}

export function PendingRequests({ requests }: PendingRequestsProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Demandes en attente</CardTitle>
        <Badge variant="secondary" className="text-orange-600 bg-orange-100">
          {requests.length} demandes
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={request.avatar} />
                  <AvatarFallback>{getInitials(request.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-muted-foreground">{request.memberSince}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Montant:</span>
                  <span className="font-semibold">{request.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Durée:</span>
                  <span className="font-semibold">{request.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Motif:</span>
                  <Badge 
                    className={purposeColors[request.purpose as keyof typeof purposeColors] || purposeColors.Personnel}
                    variant="secondary"
                  >
                    {request.purpose}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {}}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Valider
                {/* onClick={() => onReject(request.id)} */}
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => {}}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Refuser
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}