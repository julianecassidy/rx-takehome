import type { Medication, Rx } from "@/types";

type MedicationCardProps = {
    medication: Medication | Rx;
};

export default function MedicationCard({ medication }: MedicationCardProps) {
    return (
        <div>
            {medication.id}
        </div>
    );
}