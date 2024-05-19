import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from 'app/entities/post/post.model';

@Component({
  selector: 'jhi-modal-conteudo',
  standalone: true,
  imports: [],
  templateUrl: './modal-conteudo.component.html',
  styleUrl: './modal-conteudo.component.scss'
})
export class ModalConteudoComponent implements OnInit{
  post?: IPost;
  confirmationMessage: string = '';

  constructor(
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    console.warn("Cheguei aqui no detail => ", this.post);
  }

  close():void {
    this.modalService.dismissAll();
  }

  copyContent() {
    const content = this.post?.content;
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
