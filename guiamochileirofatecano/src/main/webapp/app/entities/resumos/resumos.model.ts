import dayjs from 'dayjs/esm';
import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';

export interface IResumos {
  id: number;
  assunto?: string | null;
  resumo?: string | null;
  createdDate?: dayjs.Dayjs | null;
  disciplinas?: Pick<IDisciplinas, 'id'> | null;
}

export type NewResumos = Omit<IResumos, 'id'> & { id: null };
