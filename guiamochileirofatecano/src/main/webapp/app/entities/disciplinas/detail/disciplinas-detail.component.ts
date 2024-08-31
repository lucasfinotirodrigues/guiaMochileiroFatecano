import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisciplinas } from '../disciplinas.model';

@Component({
  selector: 'app-disciplinas-detail',
  templateUrl: './disciplinas-detail.component.html',
})
export class DisciplinasDetailComponent implements OnInit {
  disciplinas: IDisciplinas | null = null;
  disciplina: any;
  
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disciplinas }) => {
      this.disciplinas = disciplinas;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
