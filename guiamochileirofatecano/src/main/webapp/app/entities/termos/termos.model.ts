import { NumeroTermo } from 'app/entities/enumerations/numero-termo.model';
import { NumeroSemestre } from 'app/entities/enumerations/numero-semestre.model';

export interface ITermos {
  id: number;
  nome?: NumeroTermo | null;
  semestre?: NumeroSemestre | null;
  ano?: string | null;
}

export type NewTermos = Omit<ITermos, 'id'> & { id: null };
