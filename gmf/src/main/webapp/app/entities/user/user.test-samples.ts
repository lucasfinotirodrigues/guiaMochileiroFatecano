import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 22496,
  login: '7*@jLgLs',
};

export const sampleWithPartialData: IUser = {
  id: 9525,
  login: 'nKCS~&@zOlhJP\\xnwjl',
};

export const sampleWithFullData: IUser = {
  id: 15734,
  login: 'A-`^@cWG\\US',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
