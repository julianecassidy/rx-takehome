import { createFileRoute } from '@tanstack/react-router'
import { trpc } from "@/utils/trpc";
import { useUserDataStore } from '@/utils/userStore';
import type { UserToken } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import RxCard from '@/components/RxCard';

export const Route = createFileRoute('/cabinet')({
  component: Cabinet,
})

function Cabinet() {

  const user = useUserDataStore((state) => state.userData) as UserToken;
  const cabinetQuery = trpc.user.get.useQuery({id: user.id});

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
                : cabinetQuery.data?.rxs.map((rx) =>
                    <RxCard key={rx.id} rx={rx} />
                )
        }
    </div>
);


}