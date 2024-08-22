import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';

export interface IProjetos {
  id: number;
  nome?: string | null;
  assunto?: string | null;
  disciplinas?: Pick<IDisciplinas, 'id'> | null;
}

export type NewProjetos = Omit<IProjetos, 'id'> & { id: null };
