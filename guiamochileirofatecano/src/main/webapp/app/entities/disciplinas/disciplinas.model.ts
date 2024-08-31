import dayjs from 'dayjs/esm';
import { ITermos } from 'app/entities/termos/termos.model';

export interface IDisciplinas {
  id: number;
  nome?: string | null;
  createdDate?: dayjs.Dayjs | null;
  termos?: Pick<ITermos, 'id'> | null;
}

export type NewDisciplinas = Omit<IDisciplinas, 'id'> & { id: null };
