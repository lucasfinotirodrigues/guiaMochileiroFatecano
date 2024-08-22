import dayjs from 'dayjs/esm';

import { IResumos, NewResumos } from './resumos.model';

export const sampleWithRequiredData: IResumos = {
  id: 83041,
  assunto: 'navigating bypass Quiribati',
  resumo: '../fake-data/blob/hipster.txt',
  createdDate: dayjs('2024-08-21T18:23'),
};

export const sampleWithPartialData: IResumos = {
  id: 43045,
  assunto: 'Casa Auto',
  resumo: '../fake-data/blob/hipster.txt',
  createdDate: dayjs('2024-08-21T23:20'),
};

export const sampleWithFullData: IResumos = {
  id: 25171,
  assunto: 'Reactive Fresco compressing',
  resumo: '../fake-data/blob/hipster.txt',
  createdDate: dayjs('2024-08-21T18:33'),
};

export const sampleWithNewData: NewResumos = {
  assunto: 'Avenida online Prático',
  resumo: '../fake-data/blob/hipster.txt',
  createdDate: dayjs('2024-08-21T23:38'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
