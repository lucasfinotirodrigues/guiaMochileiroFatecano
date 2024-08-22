import dayjs from 'dayjs/esm';

import { IDisciplinas, NewDisciplinas } from './disciplinas.model';

export const sampleWithRequiredData: IDisciplinas = {
  id: 24724,
  nome: 'Madeira projection verde',
  createdDate: dayjs('2024-08-22T11:24'),
};

export const sampleWithPartialData: IDisciplinas = {
  id: 22591,
  nome: 'Mexican index',
  createdDate: dayjs('2024-08-22T01:48'),
};

export const sampleWithFullData: IDisciplinas = {
  id: 7872,
  nome: 'services Litas',
  createdDate: dayjs('2024-08-21T23:50'),
};

export const sampleWithNewData: NewDisciplinas = {
  nome: 'invoice Samoa',
  createdDate: dayjs('2024-08-21T19:13'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
