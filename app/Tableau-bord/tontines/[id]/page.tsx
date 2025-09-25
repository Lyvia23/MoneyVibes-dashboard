// app/Tableau-bord/tontines/[id]/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import VueEnsemble from "@/src/components/tontines/Overview";
import ParticipantsSection from "@/src/components/tontines/Participants";
import TransactionsSection from "@/src/components/tontines/Transactions";
import { ConfigurationSection } from "@/src/components/tontines/Configuration";


export default function TontineDetailPage({ params }) {
  const router = useRouter();
  const tontineId = params.id;

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-10">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
      >
        Retour
      </button>

      <VueEnsemble tontineId={tontineId} />

      <ParticipantsSection />

      <TransactionsSection />

      <ConfigurationSection />
    </main>
  );
}
