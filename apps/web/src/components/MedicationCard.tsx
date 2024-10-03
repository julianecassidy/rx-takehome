import type { Medication } from "@/types";
import { useState } from "react";
import PrescribeModal from "./PrescribeModal";

type MedicationCardProps = {
    medication: Medication;
};

export default function MedicationCard({ medication }: MedicationCardProps) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{medication.name}</h2>
                    <p>{medication.details}</p>
                    <div className="flex justify-between">
                        <div className="badge badge-secondary mt-2 p-4">
                            Cost: ${medication.cost}
                        </div>
                        <div className="card-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => setModalShow(true)}>
                                Get
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {modalShow &&
                <PrescribeModal
                    modalShow={modalShow}
                    onHide={() => setModalShow(false)}
                    medication={medication}
                />}
        </>
    );
}