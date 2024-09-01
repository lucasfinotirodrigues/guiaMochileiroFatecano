import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisciplinas } from '../disciplinas.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-disciplinas-detail',
  templateUrl: './disciplinas-detail.component.html',
})
export class DisciplinasDetailComponent implements OnInit {
  disciplinas: IDisciplinas | null = null;
  disciplinaSelcionada: any;
  
  constructor(
    protected activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  close():void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    console.warn("disciplinaSelcionada => ", this.disciplinaSelcionada);
    this.activatedRoute.data.subscribe(({ disciplinas }) => {
      this.disciplinas = disciplinas;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
