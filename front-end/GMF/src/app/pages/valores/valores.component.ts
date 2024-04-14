import { Component } from '@angular/core';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.scss']
})
export class ValoresComponent {
  conteudo = false;

  constructor(){}

  mostrarConteudo(){
    this.conteudo = !this.conteudo;
  }

  valoresUm = [
    { valores: 'Cliente Feliz', cor: '#FFFFDD', img: '../../../assets/clienteFeliz.svg' },
    { valores: 'Ninguém cresce sozinho', cor: '#E2F4C5', img: '../../../assets/ninguemCresceSozinho.svg' },
    { valores: 'Desenvolver a nossa gente', cor: '#C5EBAA', img: '../../../assets/desenvolverNossa.svg' },
    { valores: 'Trabalhar duro como forma de prosperar', cor: '#A5DD9B', img: '../../../assets/trabalharDuro.svg' },
    { valores: 'Honrar compromissos', cor: '#AFC8AD', img: '../../../assets/honrarCompromissos.svg' },
  ];

  valoresDois = [
    { valores: 'Evitar Dívidas', cor: '#AFC8AD', img: '../../../assets/evitarDividas.svg' },
    { valores: 'Três virtudedades', cor: '#A5DD9B', img: '../../../assets/tresVirtudidades.svg' },
    { valores: 'Espírito inovador', cor: '#E2F4C5', img: '../../../assets/espiritoInovador.svg' },
    { valores: 'Responsabilidade socioambiental', cor: '#FFFFDD', img: '../../../assets/responsabilidade.svg' },
    { valores: 'Felicidade em compartilhar', cor: '#C5EBAA', img: '../../../assets/felicidadeCompartilhar.svg' },
  ];
}
