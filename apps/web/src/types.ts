export type Medication = {
  id: number;
  name: string;
  details: string;
  warnings: string;
  cost?: number | null;
};