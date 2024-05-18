import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '60123306-25fe-4148-9a30-738a025d82ac',
};

export const sampleWithPartialData: IAuthority = {
  name: 'bdea6899-056c-4ae5-86c9-e98c7d71cb90',
};

export const sampleWithFullData: IAuthority = {
  name: 'da43ceb8-521a-4c7f-a47e-9de4ca8984ea',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
