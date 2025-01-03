import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabellone',
  templateUrl: './tabellone.component.html',
  styleUrls: ['./tabellone.component.scss']
})
export class TabelloneComponent implements OnInit {
  
  smorfia:string[]= [ 
    'L\'Italia',
    'La bambina',
    'La gatta',
    'Il maiale',
    'La mano',
    'La cosa che guarda in terra',
    'Il vaso',
    'La Madonna',
    'La figliolanza',
    'I fagioli',
    'I topi',
    'I soldati',
    'S. Antonio',
    'L\'ubriaco',
    'Il ragazzo',
    'Il culo',
    'La sfortuna',
    'Il sangue',
    'La risata',
    'La festa',
    'La donna nuda',
    'Il matto',
    'Io scemo',
    'Le guardie',
    'Il Natale',
    'Anna',
    'il vaso da notte',
    'il seno',
    'Il padre dei bambini',
    'Il Tenente',
    'il padrone di casa',
    'Il capitone',
    'Gli anni di Cristo',
    'La testa',
    'L\'uccello',
    'Le nacchere',
    'Il monaco',
    'Le bastonate',
    'Una corda al collo',
    'L\'ernia',
    'Il coltello',
    'Il caffè',
    'Donna al balcone',
    'Le carceri',
    'Il buon vino',
    'I soldi',
    'Il morto',
    'Il morto che parla',
    'La "carne"',
    'Il pane',
    'Il giardino',
    'La mamma',
    'Il vecchio',
    'Il cappello',
    'La musica',
    'La caduta',
    'Il gobbetto',
    'Il cartoccio',
    'I peli',
    'Il lamento',
    'Il cacciatore',
    'Il morto ammazzato',
    'La sposa',
    'La marsina',
    'Il pianto',
    'Le due zitelle',
    'il polpo nella chitarra',
    'La minestra cotta',
    'Sottosopra',
    'Il palazzo',
    'Uomo senza valore',
    'Lo stupore',
    'L\'ospedale',
    'La grotta',
    'Pulcinella ',
    'La fontana',
    'I diavoli',
    'La prostituta',
    'Il ladro',
    'La bocca',
    'I fiori',
    'La tavola imbandita',
    'Il maltempo',
    'La chiesa',
    'Le anime del Purgatorio',
    'La bottega',
    'I pidocchi',
    'I caciocavalli',
    'La vecchia',
    'La paura',
  ]

numeriTombola: INumeroTombola[] = Array(90).fill(0).map((_, idx) => { return { numero: 1 + idx, estratto: false, smorfia:this.smorfia[idx] } as INumeroTombola }) 
contaEstratti: number = 0;
nonEstratti?: INumeroTombola[];
ultimoEstratto : INumeroTombola = {numero: 0, estratto:false, smorfia:'smorfia'}as INumeroTombola;
intestazione:string = 'La tombolata';


  constructor() { }

  ngOnInit(): void {
    this.getIntestazione();
  }

  public estrai() {
    this.nonEstratti = this.numeriTombola.filter(el => el.estratto == false);
    let posEstratto = (Math.floor(Math.random() * this.nonEstratti.length));
    this.nonEstratti[posEstratto].estratto = true;
    this.ultimoEstratto = {numero: this.nonEstratti[posEstratto].numero, estratto:true, smorfia:this.nonEstratti[posEstratto].smorfia}

    this.contaEstratti++;
  }

  public svuota() {
    this.numeriTombola.map(el => el.estratto = false);
    this.contaEstratti = 0;
    this.ultimoEstratto = {numero: 0, estratto:false, smorfia:''}; 
  }

  getIntestazione(){
    if(localStorage.getItem('title')){
      return localStorage.getItem('title')
    }
    else{
      return 'La Super Tombolata'
    }
    
  }




}


export interface INumeroTombola {
  numero: number; 
  estratto:boolean;
  smorfia?: string
}