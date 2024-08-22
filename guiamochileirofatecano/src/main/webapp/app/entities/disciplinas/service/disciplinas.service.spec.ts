import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDisciplinas } from '../disciplinas.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../disciplinas.test-samples';

import { DisciplinasService, RestDisciplinas } from './disciplinas.service';

const requireRestSample: RestDisciplinas = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
};

describe('Disciplinas Service', () => {
  let service: DisciplinasService;
  let httpMock: HttpTestingController;
  let expectedResult: IDisciplinas | IDisciplinas[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisciplinasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Disciplinas', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const disciplinas = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(disciplinas).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Disciplinas', () => {
      const disciplinas = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(disciplinas).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Disciplinas', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Disciplinas', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Disciplinas', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDisciplinasToCollectionIfMissing', () => {
      it('should add a Disciplinas to an empty array', () => {
        const disciplinas: IDisciplinas = sampleWithRequiredData;
        expectedResult = service.addDisciplinasToCollectionIfMissing([], disciplinas);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disciplinas);
      });

      it('should not add a Disciplinas to an array that contains it', () => {
        const disciplinas: IDisciplinas = sampleWithRequiredData;
        const disciplinasCollection: IDisciplinas[] = [
          {
            ...disciplinas,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDisciplinasToCollectionIfMissing(disciplinasCollection, disciplinas);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Disciplinas to an array that doesn't contain it", () => {
        const disciplinas: IDisciplinas = sampleWithRequiredData;
        const disciplinasCollection: IDisciplinas[] = [sampleWithPartialData];
        expectedResult = service.addDisciplinasToCollectionIfMissing(disciplinasCollection, disciplinas);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disciplinas);
      });

      it('should add only unique Disciplinas to an array', () => {
        const disciplinasArray: IDisciplinas[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const disciplinasCollection: IDisciplinas[] = [sampleWithRequiredData];
        expectedResult = service.addDisciplinasToCollectionIfMissing(disciplinasCollection, ...disciplinasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disciplinas: IDisciplinas = sampleWithRequiredData;
        const disciplinas2: IDisciplinas = sampleWithPartialData;
        expectedResult = service.addDisciplinasToCollectionIfMissing([], disciplinas, disciplinas2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disciplinas);
        expect(expectedResult).toContain(disciplinas2);
      });

      it('should accept null and undefined values', () => {
        const disciplinas: IDisciplinas = sampleWithRequiredData;
        expectedResult = service.addDisciplinasToCollectionIfMissing([], null, disciplinas, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disciplinas);
      });

      it('should return initial array if no Disciplinas is added', () => {
        const disciplinasCollection: IDisciplinas[] = [sampleWithRequiredData];
        expectedResult = service.addDisciplinasToCollectionIfMissing(disciplinasCollection, undefined, null);
        expect(expectedResult).toEqual(disciplinasCollection);
      });
    });

    describe('compareDisciplinas', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDisciplinas(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDisciplinas(entity1, entity2);
        const compareResult2 = service.compareDisciplinas(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDisciplinas(entity1, entity2);
        const compareResult2 = service.compareDisciplinas(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDisciplinas(entity1, entity2);
        const compareResult2 = service.compareDisciplinas(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
