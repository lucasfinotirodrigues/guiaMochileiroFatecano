import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITermos, NewTermos } from '../termos.model';

export type PartialUpdateTermos = Partial<ITermos> & Pick<ITermos, 'id'>;

export type EntityResponseType = HttpResponse<ITermos>;
export type EntityArrayResponseType = HttpResponse<ITermos[]>;

@Injectable({ providedIn: 'root' })
export class TermosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/termos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(termos: NewTermos): Observable<EntityResponseType> {
    return this.http.post<ITermos>(this.resourceUrl, termos, { observe: 'response' });
  }

  update(termos: ITermos): Observable<EntityResponseType> {
    return this.http.put<ITermos>(`${this.resourceUrl}/${this.getTermosIdentifier(termos)}`, termos, { observe: 'response' });
  }

  partialUpdate(termos: PartialUpdateTermos): Observable<EntityResponseType> {
    return this.http.patch<ITermos>(`${this.resourceUrl}/${this.getTermosIdentifier(termos)}`, termos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITermos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITermos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTermosIdentifier(termos: Pick<ITermos, 'id'>): number {
    return termos.id;
  }

  compareTermos(o1: Pick<ITermos, 'id'> | null, o2: Pick<ITermos, 'id'> | null): boolean {
    return o1 && o2 ? this.getTermosIdentifier(o1) === this.getTermosIdentifier(o2) : o1 === o2;
  }

  addTermosToCollectionIfMissing<Type extends Pick<ITermos, 'id'>>(
    termosCollection: Type[],
    ...termosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const termos: Type[] = termosToCheck.filter(isPresent);
    if (termos.length > 0) {
      const termosCollectionIdentifiers = termosCollection.map(termosItem => this.getTermosIdentifier(termosItem)!);
      const termosToAdd = termos.filter(termosItem => {
        const termosIdentifier = this.getTermosIdentifier(termosItem);
        if (termosCollectionIdentifiers.includes(termosIdentifier)) {
          return false;
        }
        termosCollectionIdentifiers.push(termosIdentifier);
        return true;
      });
      return [...termosToAdd, ...termosCollection];
    }
    return termosCollection;
  }
}
