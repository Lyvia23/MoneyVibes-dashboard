import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { DocumentIdentite } from "@/src/types/kyc";

interface DocumentsIdentiteProps {
  documents: DocumentIdentite[];
}

export function DocumentsIdentite({ documents }: DocumentsIdentiteProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Documents d&apos;identité</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  Carte d&apos;identité ({doc.type === 'recto' ? 'Recto' : 'Verso'})
                </h3>
                <Badge variant="outline" className="text-xs">
                  {doc.type === 'recto' ? 'Carte Nationale d\'Identité' : 'Verso de la CNI'}
                </Badge>
              </div>
              
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={doc.url}
                  alt={`Document ${doc.type}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Uploadé le {doc.dateUpload}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
