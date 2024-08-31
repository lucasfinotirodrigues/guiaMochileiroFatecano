import { NumeroTermo } from 'app/entities/enumerations/numero-termo.model';
import { NumeroSemestre } from 'app/entities/enumerations/numero-semestre.model';

import { ITermos, NewTermos } from './termos.model';

export const sampleWithRequiredData: ITermos = {
  id: 64880,
  nome: NumeroTermo['QUARTO'],
  semestre: NumeroSemestre['SEGUNDO'],
  ano: 'Travessa',
};

export const sampleWithPartialData: ITermos = {
  id: 84335,
  nome: NumeroTermo['TERCEIRO'],
  semestre: NumeroSemestre['PRIMEIRO'],
  ano: 'toolset solutions middleware',
};

export const sampleWithFullData: ITermos = {
  id: 55465,
  nome: NumeroTermo['SEXTO'],
  semestre: NumeroSemestre['PRIMEIRO'],
  ano: 'Aço content',
};

export const sampleWithNewData: NewTermos = {
  nome: NumeroTermo['SEXTO'],
  semestre: NumeroSemestre['PRIMEIRO'],
  ano: 'Marginal Luxemburgo Corporate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
