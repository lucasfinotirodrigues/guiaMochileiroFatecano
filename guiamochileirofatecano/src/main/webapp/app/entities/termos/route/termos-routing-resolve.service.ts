import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITermos } from '../termos.model';
import { TermosService } from '../service/termos.service';

@Injectable({ providedIn: 'root' })
export class TermosRoutingResolveService implements Resolve<ITermos | null> {
  constructor(protected service: TermosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITermos | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((termos: HttpResponse<ITermos>) => {
          if (termos.body) {
            return of(termos.body);
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
