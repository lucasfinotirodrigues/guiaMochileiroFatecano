import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisciplinas } from '../disciplinas.model';
import { DisciplinasService } from '../service/disciplinas.service';

@Injectable({ providedIn: 'root' })
export class DisciplinasRoutingResolveService implements Resolve<IDisciplinas | null> {
  constructor(protected service: DisciplinasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisciplinas | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disciplinas: HttpResponse<IDisciplinas>) => {
          if (disciplinas.body) {
            return of(disciplinas.body);
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
