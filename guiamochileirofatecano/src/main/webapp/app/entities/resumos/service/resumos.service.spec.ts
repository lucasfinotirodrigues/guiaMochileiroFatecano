import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IResumos } from '../resumos.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../resumos.test-samples';

import { ResumosService, RestResumos } from './resumos.service';

const requireRestSample: RestResumos = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
};

describe('Resumos Service', () => {
  let service: ResumosService;
  let httpMock: HttpTestingController;
  let expectedResult: IResumos | IResumos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ResumosService);
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

    it('should create a Resumos', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const resumos = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(resumos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Resumos', () => {
      const resumos = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(resumos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Resumos', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Resumos', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Resumos', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addResumosToCollectionIfMissing', () => {
      it('should add a Resumos to an empty array', () => {
        const resumos: IResumos = sampleWithRequiredData;
        expectedResult = service.addResumosToCollectionIfMissing([], resumos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(resumos);
      });

      it('should not add a Resumos to an array that contains it', () => {
        const resumos: IResumos = sampleWithRequiredData;
        const resumosCollection: IResumos[] = [
          {
            ...resumos,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addResumosToCollectionIfMissing(resumosCollection, resumos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Resumos to an array that doesn't contain it", () => {
        const resumos: IResumos = sampleWithRequiredData;
        const resumosCollection: IResumos[] = [sampleWithPartialData];
        expectedResult = service.addResumosToCollectionIfMissing(resumosCollection, resumos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(resumos);
      });

      it('should add only unique Resumos to an array', () => {
        const resumosArray: IResumos[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const resumosCollection: IResumos[] = [sampleWithRequiredData];
        expectedResult = service.addResumosToCollectionIfMissing(resumosCollection, ...resumosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const resumos: IResumos = sampleWithRequiredData;
        const resumos2: IResumos = sampleWithPartialData;
        expectedResult = service.addResumosToCollectionIfMissing([], resumos, resumos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(resumos);
        expect(expectedResult).toContain(resumos2);
      });

      it('should accept null and undefined values', () => {
        const resumos: IResumos = sampleWithRequiredData;
        expectedResult = service.addResumosToCollectionIfMissing([], null, resumos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(resumos);
      });

      it('should return initial array if no Resumos is added', () => {
        const resumosCollection: IResumos[] = [sampleWithRequiredData];
        expectedResult = service.addResumosToCollectionIfMissing(resumosCollection, undefined, null);
        expect(expectedResult).toEqual(resumosCollection);
      });
    });

    describe('compareResumos', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareResumos(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareResumos(entity1, entity2);
        const compareResult2 = service.compareResumos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareResumos(entity1, entity2);
        const compareResult2 = service.compareResumos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareResumos(entity1, entity2);
        const compareResult2 = service.compareResumos(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
