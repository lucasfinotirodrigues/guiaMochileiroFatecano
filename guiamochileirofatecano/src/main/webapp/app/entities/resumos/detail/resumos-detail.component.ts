import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResumos } from '../resumos.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'app-resumos-detail',
  templateUrl: './resumos-detail.component.html',
})
export class ResumosDetailComponent implements OnInit {
  resumos: IResumos | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
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
}
