import { createFileRoute } from '@tanstack/react-router'
import { trpc } from "@/utils/trpc";
import { useUserDataStore } from '@/utils/userStore';
import { useShallow } from 'zustand/shallow';
import type { User } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import MedicationCard from '@/components/MedicationCard';

export const Route = createFileRoute('/cabinet')({
  component: Cabinet,
})

function Cabinet() {

  const user = useUserDataStore(useShallow((state) => state.userData)) as User;
  const cabinetQuery = trpc.user.get.useQuery({id: user.id});

  // console.debug("Cabinet, user", user, cabinetQuery.data);

  if (cabinetQuery.isLoading) {
    return <LoadingSpinner />
  }

  if (cabinetQuery.isError) {
    return <div>Error fetching your prescriptions.</div>;
  }

  return (
    <div>
        {
            !cabinetQuery.data?.rxs.length
                ? <div>You don't currently have any prescriptions.</div>
                : cabinetQuery.data?.rxs.map((m) =>
                    <MedicationCard key={m.id} medication={m} />
                )
        }
    </div>
);


}