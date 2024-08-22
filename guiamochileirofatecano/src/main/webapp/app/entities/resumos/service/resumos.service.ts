import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IResumos, NewResumos } from '../resumos.model';

export type PartialUpdateResumos = Partial<IResumos> & Pick<IResumos, 'id'>;

type RestOf<T extends IResumos | NewResumos> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestResumos = RestOf<IResumos>;

export type NewRestResumos = RestOf<NewResumos>;

export type PartialUpdateRestResumos = RestOf<PartialUpdateResumos>;

export type EntityResponseType = HttpResponse<IResumos>;
export type EntityArrayResponseType = HttpResponse<IResumos[]>;

@Injectable({ providedIn: 'root' })
export class ResumosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/resumos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(resumos: NewResumos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resumos);
    return this.http
      .post<RestResumos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(resumos: IResumos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resumos);
    return this.http
      .put<RestResumos>(`${this.resourceUrl}/${this.getResumosIdentifier(resumos)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(resumos: PartialUpdateResumos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resumos);
    return this.http
      .patch<RestResumos>(`${this.resourceUrl}/${this.getResumosIdentifier(resumos)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestResumos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestResumos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getResumosIdentifier(resumos: Pick<IResumos, 'id'>): number {
    return resumos.id;
  }

  compareResumos(o1: Pick<IResumos, 'id'> | null, o2: Pick<IResumos, 'id'> | null): boolean {
    return o1 && o2 ? this.getResumosIdentifier(o1) === this.getResumosIdentifier(o2) : o1 === o2;
  }

  addResumosToCollectionIfMissing<Type extends Pick<IResumos, 'id'>>(
    resumosCollection: Type[],
    ...resumosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const resumos: Type[] = resumosToCheck.filter(isPresent);
    if (resumos.length > 0) {
      const resumosCollectionIdentifiers = resumosCollection.map(resumosItem => this.getResumosIdentifier(resumosItem)!);
      const resumosToAdd = resumos.filter(resumosItem => {
        const resumosIdentifier = this.getResumosIdentifier(resumosItem);
        if (resumosCollectionIdentifiers.includes(resumosIdentifier)) {
          return false;
        }
        resumosCollectionIdentifiers.push(resumosIdentifier);
        return true;
      });
      return [...resumosToAdd, ...resumosCollection];
    }
    return resumosCollection;
  }

  protected convertDateFromClient<T extends IResumos | NewResumos | PartialUpdateResumos>(resumos: T): RestOf<T> {
    return {
      ...resumos,
      createdDate: resumos.createdDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restResumos: RestResumos): IResumos {
    return {
      ...restResumos,
      createdDate: restResumos.createdDate ? dayjs(restResumos.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestResumos>): HttpResponse<IResumos> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestResumos[]>): HttpResponse<IResumos[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
