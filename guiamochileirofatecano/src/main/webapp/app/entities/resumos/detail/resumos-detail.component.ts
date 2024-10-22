import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResumos } from '../resumos.model';
import { DataUtils } from 'app/core/util/data-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resumos-detail',
  templateUrl: './resumos-detail.component.html',
  styleUrls: ['./resumos-detail.component.scss']
})
export class ResumosDetailComponent implements OnInit {
  resumos: IResumos | null = null;
  resumoSelecionado: any;
  confirmationMessage: string = '';

  constructor(
    protected dataUtils: DataUtils, 
    protected activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.warn("Chegando objeto no detail => ", this.resumoSelecionado);
    this.activatedRoute.data.subscribe(({ resumos }) => {
      this.resumos = resumos;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }

  close():void {
    this.modalService.dismissAll();
  }

  copyContent() {
    const content = this.resumoSelecionado?.resumo;
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        this.showConfirmationMessage();
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }

  showConfirmationMessage() {
    this.confirmationMessage = 'Resumo copiado para área de transferência';
    setTimeout(() => {
      this.confirmationMessage = '';
    }, 3000);
  }
}
