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
    { valores: 'Cliente Feliz', cor: '#FFFFDD', img: 'clienteFeliz' },
    { valores: 'Ninguém cresce sozinho', cor: '#E2F4C5', img: 'ninguemCresceSozinho' },
    { valores: 'Desenvolver a nossa gente', cor: '#C5EBAA', img: 'desenvolverNossa' },
    { valores: 'Trabalhar duro como forma de prosperar', cor: '#A5DD9B', img: 'trabalharDuro' },
    { valores: 'Honrar compromissos', cor: '#AFC8AD', img: 'honrarCompromissos' },
  ];

  valoresDois = [
    { valores: 'Evitar Dívidas', cor: '#AFC8AD', img: 'evitarDividas' },
    { valores: 'Três virtudedades', cor: '#A5DD9B', img: 'tresVirtudidades' },
    { valores: 'Espírito inovador', cor: '#E2F4C5', img: 'espiritoInovador' },
    { valores: 'Responsabilidade socioambiental', cor: '#FFFFDD', img: 'responsabilidade' },
    { valores: 'Felicidade em compartilhar', cor: '#C5EBAA', img: 'felicidadeCompartilhar' },
  ];
}
