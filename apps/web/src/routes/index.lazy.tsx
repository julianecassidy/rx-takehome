import { trpc } from "@/utils/trpc";
import MedicationCard from "@/components/MedicationCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchForm from "@/components/SearchForm";
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from "react";

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {

    const [searchTerm, setSearchTerm] = useState("")


    const medicationsQuery = trpc.medication.list.useQuery({search: searchTerm});

    function search(term: string) {
        setSearchTerm(term);
    }

    if (medicationsQuery.isLoading) {
        return <LoadingSpinner />;
    }

    if (medicationsQuery.isError) {
        return <div>Error fetching medications.</div>;
    }

    return (
        <div>
            <SearchForm search={search} currSearch={searchTerm} />
            <hr />
            <div className="mt-8 mb-32 mx-8 lg:mx-32 flex flex-wrap gap-8 justify-center">
            {
                !medicationsQuery.data?.length
                    ? <div className="mt-24 text-center text-neutral text-xl">
                        There are no medications currently available.
                    </div>
                    : medicationsQuery.data?.map((m) =>
                        <MedicationCard
                            key={m.id}
                            medication={m}
                        />
                    )
            }
            </div>
        </div>
    );
}