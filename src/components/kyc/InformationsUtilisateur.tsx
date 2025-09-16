import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UtilisateurKYC } from "@/src/types/kyc";

interface InformationsUtilisateurProps {
  utilisateur: UtilisateurKYC;
}

export function InformationsUtilisateur({ utilisateur }: InformationsUtilisateurProps) {
  const getStatutBadge = (statut: string) => {
    const variants = {
      en_attente: { variant: "secondary" as const, text: "En attente" },
      approuve: { variant: "default" as const, text: "Approuvé" },
      rejete: { variant: "destructive" as const, text: "Rejeté" },
      verification_en_cours: { variant: "outline" as const, text: "Vérification en cours" }
    };
    return variants[statut as keyof typeof variants] || variants.en_attente;
  };

  const badgeConfig = getStatutBadge(utilisateur.statut);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Informations utilisateur</CardTitle>
          <Badge variant={badgeConfig.variant} className="ml-2">
            {badgeConfig.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <Avatar className="w-20 h-20 lg:w-24 lg:h-24 mx-auto lg:mx-0">
            <AvatarImage src={utilisateur.photoProfile} alt={utilisateur.nomComplet} />
            <AvatarFallback className="text-lg rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold">
              {utilisateur.nomComplet.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
              <p className="text-base font-semibold">{utilisateur.nomComplet}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Numéro de téléphone</p>
              <p className="text-base">{utilisateur.telephone}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{utilisateur.email}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date de naissance</p>
              <p className="text-base">{utilisateur.dateNaissance}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Adresse</p>
              <p className="text-base">{utilisateur.adresse}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}