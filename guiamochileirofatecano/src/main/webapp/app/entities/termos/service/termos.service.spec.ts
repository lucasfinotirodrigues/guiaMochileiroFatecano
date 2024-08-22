import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITermos } from '../termos.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../termos.test-samples';

import { TermosService } from './termos.service';

const requireRestSample: ITermos = {
  ...sampleWithRequiredData,
};

describe('Termos Service', () => {
  let service: TermosService;
  let httpMock: HttpTestingController;
  let expectedResult: ITermos | ITermos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TermosService);
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

    it('should create a Termos', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const termos = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(termos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Termos', () => {
      const termos = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(termos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Termos', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Termos', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Termos', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTermosToCollectionIfMissing', () => {
      it('should add a Termos to an empty array', () => {
        const termos: ITermos = sampleWithRequiredData;
        expectedResult = service.addTermosToCollectionIfMissing([], termos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(termos);
      });

      it('should not add a Termos to an array that contains it', () => {
        const termos: ITermos = sampleWithRequiredData;
        const termosCollection: ITermos[] = [
          {
            ...termos,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTermosToCollectionIfMissing(termosCollection, termos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Termos to an array that doesn't contain it", () => {
        const termos: ITermos = sampleWithRequiredData;
        const termosCollection: ITermos[] = [sampleWithPartialData];
        expectedResult = service.addTermosToCollectionIfMissing(termosCollection, termos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(termos);
      });

      it('should add only unique Termos to an array', () => {
        const termosArray: ITermos[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const termosCollection: ITermos[] = [sampleWithRequiredData];
        expectedResult = service.addTermosToCollectionIfMissing(termosCollection, ...termosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const termos: ITermos = sampleWithRequiredData;
        const termos2: ITermos = sampleWithPartialData;
        expectedResult = service.addTermosToCollectionIfMissing([], termos, termos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(termos);
        expect(expectedResult).toContain(termos2);
      });

      it('should accept null and undefined values', () => {
        const termos: ITermos = sampleWithRequiredData;
        expectedResult = service.addTermosToCollectionIfMissing([], null, termos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(termos);
      });

      it('should return initial array if no Termos is added', () => {
        const termosCollection: ITermos[] = [sampleWithRequiredData];
        expectedResult = service.addTermosToCollectionIfMissing(termosCollection, undefined, null);
        expect(expectedResult).toEqual(termosCollection);
      });
    });

    describe('compareTermos', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTermos(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTermos(entity1, entity2);
        const compareResult2 = service.compareTermos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTermos(entity1, entity2);
        const compareResult2 = service.compareTermos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTermos(entity1, entity2);
        const compareResult2 = service.compareTermos(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
