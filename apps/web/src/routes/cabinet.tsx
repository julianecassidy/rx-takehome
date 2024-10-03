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
    <div className="mt-8 mb-32 mx-8 lg:mx-32 flex flex-wrap gap-8 justify-center">
        {
            !cabinetQuery.data?.rxs.length
                ? <div className="mt-24 text-center text-neutral text-xl">
                  You don't currently have any prescriptions.
                </div>
                : cabinetQuery.data?.rxs.map((rx) =>
                    <RxCard key={rx.id} rx={rx} />
                )
        }
    </div>
);


}