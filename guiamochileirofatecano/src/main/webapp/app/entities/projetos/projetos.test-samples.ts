import { IProjetos, NewProjetos } from './projetos.model';

export const sampleWithRequiredData: IProjetos = {
  id: 91582,
  nome: 'Avenida laranja',
  assunto: 'reinvent',
};

export const sampleWithPartialData: IProjetos = {
  id: 83311,
  nome: 'Manager',
  assunto: 'infrastructures',
};

export const sampleWithFullData: IProjetos = {
  id: 67912,
  nome: 'SAS Aço',
  assunto: 'task-force madeira',
};

export const sampleWithNewData: NewProjetos = {
  nome: 'ferrugem',
  assunto: 'Alameda payment Legacy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
