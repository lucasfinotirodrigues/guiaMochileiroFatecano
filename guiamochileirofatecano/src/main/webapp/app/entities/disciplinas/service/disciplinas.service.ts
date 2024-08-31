import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisciplinas, NewDisciplinas } from '../disciplinas.model';

export type PartialUpdateDisciplinas = Partial<IDisciplinas> & Pick<IDisciplinas, 'id'>;

type RestOf<T extends IDisciplinas | NewDisciplinas> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestDisciplinas = RestOf<IDisciplinas>;

export type NewRestDisciplinas = RestOf<NewDisciplinas>;

export type PartialUpdateRestDisciplinas = RestOf<PartialUpdateDisciplinas>;

export type EntityResponseType = HttpResponse<IDisciplinas>;
export type EntityArrayResponseType = HttpResponse<IDisciplinas[]>;

@Injectable({ providedIn: 'root' })
export class DisciplinasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disciplinas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disciplinas: NewDisciplinas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disciplinas);
    return this.http
      .post<RestDisciplinas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(disciplinas: IDisciplinas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disciplinas);
    return this.http
      .put<RestDisciplinas>(`${this.resourceUrl}/${this.getDisciplinasIdentifier(disciplinas)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(disciplinas: PartialUpdateDisciplinas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disciplinas);
    return this.http
      .patch<RestDisciplinas>(`${this.resourceUrl}/${this.getDisciplinasIdentifier(disciplinas)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDisciplinas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDisciplinas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDisciplinasIdentifier(disciplinas: Pick<IDisciplinas, 'id'>): number {
    return disciplinas.id;
  }

  compareDisciplinas(o1: Pick<IDisciplinas, 'id'> | null, o2: Pick<IDisciplinas, 'id'> | null): boolean {
    return o1 && o2 ? this.getDisciplinasIdentifier(o1) === this.getDisciplinasIdentifier(o2) : o1 === o2;
  }

  addDisciplinasToCollectionIfMissing<Type extends Pick<IDisciplinas, 'id'>>(
    disciplinasCollection: Type[],
    ...disciplinasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const disciplinas: Type[] = disciplinasToCheck.filter(isPresent);
    if (disciplinas.length > 0) {
      const disciplinasCollectionIdentifiers = disciplinasCollection.map(
        disciplinasItem => this.getDisciplinasIdentifier(disciplinasItem)!
      );
      const disciplinasToAdd = disciplinas.filter(disciplinasItem => {
        const disciplinasIdentifier = this.getDisciplinasIdentifier(disciplinasItem);
        if (disciplinasCollectionIdentifiers.includes(disciplinasIdentifier)) {
          return false;
        }
        disciplinasCollectionIdentifiers.push(disciplinasIdentifier);
        return true;
      });
      return [...disciplinasToAdd, ...disciplinasCollection];
    }
    return disciplinasCollection;
  }

  protected convertDateFromClient<T extends IDisciplinas | NewDisciplinas | PartialUpdateDisciplinas>(disciplinas: T): RestOf<T> {
    return {
      ...disciplinas,
      createdDate: disciplinas.createdDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDisciplinas: RestDisciplinas): IDisciplinas {
    return {
      ...restDisciplinas,
      createdDate: restDisciplinas.createdDate ? dayjs(restDisciplinas.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDisciplinas>): HttpResponse<IDisciplinas> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDisciplinas[]>): HttpResponse<IDisciplinas[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
