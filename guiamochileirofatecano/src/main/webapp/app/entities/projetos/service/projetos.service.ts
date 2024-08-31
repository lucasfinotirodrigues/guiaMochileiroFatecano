import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProjetos, NewProjetos } from '../projetos.model';

export type PartialUpdateProjetos = Partial<IProjetos> & Pick<IProjetos, 'id'>;

export type EntityResponseType = HttpResponse<IProjetos>;
export type EntityArrayResponseType = HttpResponse<IProjetos[]>;

@Injectable({ providedIn: 'root' })
export class ProjetosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/projetos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(projetos: NewProjetos): Observable<EntityResponseType> {
    return this.http.post<IProjetos>(this.resourceUrl, projetos, { observe: 'response' });
  }

  update(projetos: IProjetos): Observable<EntityResponseType> {
    return this.http.put<IProjetos>(`${this.resourceUrl}/${this.getProjetosIdentifier(projetos)}`, projetos, { observe: 'response' });
  }

  partialUpdate(projetos: PartialUpdateProjetos): Observable<EntityResponseType> {
    return this.http.patch<IProjetos>(`${this.resourceUrl}/${this.getProjetosIdentifier(projetos)}`, projetos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProjetos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProjetos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProjetosIdentifier(projetos: Pick<IProjetos, 'id'>): number {
    return projetos.id;
  }

  compareProjetos(o1: Pick<IProjetos, 'id'> | null, o2: Pick<IProjetos, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjetosIdentifier(o1) === this.getProjetosIdentifier(o2) : o1 === o2;
  }

  addProjetosToCollectionIfMissing<Type extends Pick<IProjetos, 'id'>>(
    projetosCollection: Type[],
    ...projetosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projetos: Type[] = projetosToCheck.filter(isPresent);
    if (projetos.length > 0) {
      const projetosCollectionIdentifiers = projetosCollection.map(projetosItem => this.getProjetosIdentifier(projetosItem)!);
      const projetosToAdd = projetos.filter(projetosItem => {
        const projetosIdentifier = this.getProjetosIdentifier(projetosItem);
        if (projetosCollectionIdentifiers.includes(projetosIdentifier)) {
          return false;
        }
        projetosCollectionIdentifiers.push(projetosIdentifier);
        return true;
      });
      return [...projetosToAdd, ...projetosCollection];
    }
    return projetosCollection;
  }
}
