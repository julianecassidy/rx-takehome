import { Medication } from "@/types";
import { useUserDataStore } from '@/utils/userStore';
import type { UserToken } from '@/types';
import React, { useState } from "react";
import { trpc } from "@/utils/trpc";

type PrescribeModalProps = {
    modalShow: boolean;
    onHide: () => void;
    medication: Medication;
};

type FormDataState = {
    dosage: string;
    notes: string;
};

export default function PrescribeModal({ modalShow, onHide, medication }: PrescribeModalProps) {

    const user = useUserDataStore((state) => state.userData) as UserToken;
    const prescribeMutation = trpc.user.prescribe.useMutation();
    const [formData, setFormData] = useState<FormDataState>({ dosage: "", notes: "" });

    function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const fieldName = evt.target.name as keyof FormDataState;
        const value = evt.target.value;

        setFormData((currData: FormDataState) => {
            currData[fieldName] = value;
            return { ...currData };
        });
    };

    function handleSave() {
        const { dosage, notes } = formData;

        prescribeMutation.mutate(
            {
                userId: user.id,
                medicationId: medication.id,
                dosage,
                notes,
            }
        );
        onHide();
    }


    const modalClass = `modal ${modalShow && "modal-open"}`;

    return (
        <dialog id="my_modal_1" className={modalClass}>
            <div className="modal-box">
                <p className="font-bold text-lg">
                    Save {medication.name} to your medicine cabinet.
                </p>
                <div className="modal-action">
                    <form method="dialog" className="mx-auto flex flex-col gap-4">
                        <label
                            htmlFor="dosage"
                            className="w-full input input-bordered flex items-center gap-2">
                            Dosage:
                            <input
                                type="text"
                                id="dosage"
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleChange} />
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            className="textarea textarea-bordered w-full"
                            placeholder="Notes"
                            value={formData.notes}
                            onChange={handleChange}></textarea>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >Save
                        </button>
                        <button
                            className="btn"
                            onClick={() => onHide()}
                        >Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );

}