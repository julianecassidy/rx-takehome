import { trpc } from "@/utils/trpc";
import MedicationCard from "@/components/MedicationCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    const medicationsQuery = trpc.medication.list.useQuery();

    if (medicationsQuery.isLoading) {
        return <LoadingSpinner />
      }

      if (medicationsQuery.isError) {
        return <div>Error fetching medications.</div>;
      }

    return (
        <div>
            {
                !medicationsQuery.data?.length
                    ? <div>There are no medications currently available.</div>
                    : medicationsQuery.data?.map((m) =>
                        <MedicationCard key={m.id} medication={m} />
                    )
            }
        </div>
    );
}