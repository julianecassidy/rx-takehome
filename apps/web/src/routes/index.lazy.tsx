import { trpc } from "@/utils/trpc";
import MedicationCard from "@/components/MedicationCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    const medicationsQuery = trpc.medication.list.useQuery();

    return (
        <div>
            {
                medicationsQuery.status === "pending"
                    ? <LoadingSpinner />
                    : medicationsQuery.data?.map((m) =>
                        <MedicationCard key={m.id} medication={m} />
                    )
            }
        </div>
    );
}