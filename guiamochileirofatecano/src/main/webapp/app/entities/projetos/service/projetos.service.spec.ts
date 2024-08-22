import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProjetos } from '../projetos.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../projetos.test-samples';

import { ProjetosService } from './projetos.service';

const requireRestSample: IProjetos = {
  ...sampleWithRequiredData,
};

describe('Projetos Service', () => {
  let service: ProjetosService;
  let httpMock: HttpTestingController;
  let expectedResult: IProjetos | IProjetos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProjetosService);
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

    it('should create a Projetos', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const projetos = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(projetos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Projetos', () => {
      const projetos = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(projetos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Projetos', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Projetos', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Projetos', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProjetosToCollectionIfMissing', () => {
      it('should add a Projetos to an empty array', () => {
        const projetos: IProjetos = sampleWithRequiredData;
        expectedResult = service.addProjetosToCollectionIfMissing([], projetos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projetos);
      });

      it('should not add a Projetos to an array that contains it', () => {
        const projetos: IProjetos = sampleWithRequiredData;
        const projetosCollection: IProjetos[] = [
          {
            ...projetos,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProjetosToCollectionIfMissing(projetosCollection, projetos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Projetos to an array that doesn't contain it", () => {
        const projetos: IProjetos = sampleWithRequiredData;
        const projetosCollection: IProjetos[] = [sampleWithPartialData];
        expectedResult = service.addProjetosToCollectionIfMissing(projetosCollection, projetos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projetos);
      });

      it('should add only unique Projetos to an array', () => {
        const projetosArray: IProjetos[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const projetosCollection: IProjetos[] = [sampleWithRequiredData];
        expectedResult = service.addProjetosToCollectionIfMissing(projetosCollection, ...projetosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projetos: IProjetos = sampleWithRequiredData;
        const projetos2: IProjetos = sampleWithPartialData;
        expectedResult = service.addProjetosToCollectionIfMissing([], projetos, projetos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projetos);
        expect(expectedResult).toContain(projetos2);
      });

      it('should accept null and undefined values', () => {
        const projetos: IProjetos = sampleWithRequiredData;
        expectedResult = service.addProjetosToCollectionIfMissing([], null, projetos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projetos);
      });

      it('should return initial array if no Projetos is added', () => {
        const projetosCollection: IProjetos[] = [sampleWithRequiredData];
        expectedResult = service.addProjetosToCollectionIfMissing(projetosCollection, undefined, null);
        expect(expectedResult).toEqual(projetosCollection);
      });
    });

    describe('compareProjetos', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProjetos(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProjetos(entity1, entity2);
        const compareResult2 = service.compareProjetos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProjetos(entity1, entity2);
        const compareResult2 = service.compareProjetos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProjetos(entity1, entity2);
        const compareResult2 = service.compareProjetos(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
