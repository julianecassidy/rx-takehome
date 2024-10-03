import type { Medication } from "@/types";

type MedicationCardProps = {
    medication: Medication;
};

export default function MedicationCard({ medication }: MedicationCardProps) {
    return (
        <div>
            {medication.id} {medication.name}
        </div>
    );
}