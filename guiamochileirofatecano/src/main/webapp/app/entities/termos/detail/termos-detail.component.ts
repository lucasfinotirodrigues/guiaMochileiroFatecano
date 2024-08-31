import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITermos } from '../termos.model';

@Component({
  selector: 'app-termos-detail',
  templateUrl: './termos-detail.component.html',
})
export class TermosDetailComponent implements OnInit {
  termos: ITermos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ termos }) => {
      this.termos = termos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
