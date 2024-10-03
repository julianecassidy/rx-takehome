import type { Rx } from "@/types";

type RxCardProps = {
    rx: Rx;
};

export default function Rx({ rx }: RxCardProps) {

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{rx.medication.name}</h2>
                <p>{rx.medication.details}</p>
                <p>Dosage: {rx.dosage}</p>
                <p>Notes: {rx.notes}</p>
                <div className="badge badge-secondary">
                    Current Cost: ${rx.medication.cost}
                </div>
                <small>Warnings: {rx.medication.warnings}</small>
            </div>
        </div>
    );
}