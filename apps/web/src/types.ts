export type Medication = {
  id: number;
  name: string;
  details: string;
  warnings: string;
  cost?: number | null;
};

export type User = {
  id: number;
  email: string;
  name: string;
  rx: Rx[];
};

export type UserToken = {
  id: number;
  name: string;
}

export type Rx = {
  id: number;
  userId: number;
  medicationId: number;
  dosage: string | null;
  notes: string | null;
  medication: Medication;
}