import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjetos } from '../projetos.model';

@Component({
  selector: 'app-projetos-detail',
  templateUrl: './projetos-detail.component.html',
})
export class ProjetosDetailComponent implements OnInit {
  projetos: IProjetos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projetos }) => {
      this.projetos = projetos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
