import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IResumos } from '../resumos.model';
import { ResumosService } from '../service/resumos.service';

@Injectable({ providedIn: 'root' })
export class ResumosRoutingResolveService implements Resolve<IResumos | null> {
  constructor(protected service: ResumosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResumos | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((resumos: HttpResponse<IResumos>) => {
          if (resumos.body) {
            return of(resumos.body);
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
