import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProjetos } from '../projetos.model';
import { ProjetosService } from '../service/projetos.service';

@Injectable({ providedIn: 'root' })
export class ProjetosRoutingResolveService implements Resolve<IProjetos | null> {
  constructor(protected service: ProjetosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjetos | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((projetos: HttpResponse<IProjetos>) => {
          if (projetos.body) {
            return of(projetos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
