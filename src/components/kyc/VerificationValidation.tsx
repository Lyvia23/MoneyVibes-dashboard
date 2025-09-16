import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { VerificationStatut } from "@/src/types/kyc";

interface VerificationValidationProps {
  verification: VerificationStatut;
  onApprouver: () => void;
  onRejeter: () => void;
  onDemanderInfos: () => void;
}

export function VerificationValidation({ 
  verification, 
  onApprouver, 
  onRejeter, 
  onDemanderInfos 
}: VerificationValidationProps) {
  const [commentaire, setCommentaire] = useState("");

  const criteres = [
    {
      label: "Photo claire et lisible",
      valide: verification.photoClaireEtLisible,
      icon: verification.photoClaireEtLisible ? CheckCircle : XCircle,
      couleur: verification.photoClaireEtLisible ? "text-green-600" : "text-red-600"
    },
    {
      label: "Informations correspondantes",
      valide: verification.informationsCorrespondantes,
      icon: verification.informationsCorrespondantes ? CheckCircle : XCircle,
      couleur: verification.informationsCorrespondantes ? "text-green-600" : "text-red-600"
    },
    {
      label: "Document non expiré",
      valide: verification.documentNonExpire,
      icon: verification.documentNonExpire ? CheckCircle : XCircle,
      couleur: verification.documentNonExpire ? "text-green-600" : "text-red-600"
    },
    {
      label: "Vérification en cours",
      valide: verification.verificationEnCours,
      icon: AlertTriangle,
      couleur: "text-orange-600"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Vérification et validation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteres.map((critere, index) => {
            const Icon = critere.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Icon className={`h-5 w-5 ${critere.couleur}`} />
                <span className="text-sm font-medium">{critere.label}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <label htmlFor="commentaire" className="text-sm font-medium">
            Commentaires administrateur
          </label>
          <Textarea
            id="commentaire"
            placeholder="Ajouter des commentaires ou notes de vérification (optionnel)"
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="min-h-20"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onApprouver} 
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approuver le KYC
          </Button>
          
          <Button 
            onClick={onRejeter} 
            variant="destructive" 
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Rejeter le KYC
          </Button>
          
          <Button 
            onClick={onDemanderInfos} 
            variant="outline" 
            className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Info className="w-4 h-4 mr-2" />
            Demander infos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}