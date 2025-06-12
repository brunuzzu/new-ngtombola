import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { INumeroTombola } from '../tabellone/tabellone.component';

@Component({
  selector: 'app-stampa-cartelle',
  templateUrl: './stampa-cartelle.component.html',
  styleUrls: ['./stampa-cartelle.component.scss'],
})
export class StampaCartelleComponent implements OnInit {
  doc = new jsPDF();
  intestazione: string = '';
  numeroPagine: number = 0;
  cartellePerPagina: number = 0;

  constructor() {}

  ngOnInit(): void {}

  generaNumeriTombola(): number[][] {
    // 1. Prepara le colonne secondo le decine
    const colonne: number[][] = [
      Array.from({ length: 9 }, (_, i) => i + 1), // 1-9
      Array.from({ length: 10 }, (_, i) => i + 10), // 10-19
      Array.from({ length: 10 }, (_, i) => i + 20), // 20-29
      Array.from({ length: 10 }, (_, i) => i + 30), // 30-39
      Array.from({ length: 10 }, (_, i) => i + 40), // 40-49
      Array.from({ length: 10 }, (_, i) => i + 50), // 50-59
      Array.from({ length: 10 }, (_, i) => i + 60), // 60-69
      Array.from({ length: 10 }, (_, i) => i + 70), // 70-79
      Array.from({ length: 11 }, (_, i) => i + 80), // 80-90
    ];

    // 2. Scegli quante caselle per colonna (almeno 1, massimo 3, totale 15)
    const numeriPerColonna = Array(9).fill(1);
    let restanti = 15 - 9;
    while (restanti > 0) {
      const idx = Math.floor(Math.random() * 9);
      if (numeriPerColonna[idx] < 3) {
        numeriPerColonna[idx]++;
        restanti--;
      }
    }

    // 3. Estrai i numeri per ogni colonna
    const numeriEstrattiColonna: number[][] = colonne.map((col, i) => {
      const estratti: number[] = [];
      for (let j = 0; j < numeriPerColonna[i]; j++) {
        const idx = Math.floor(Math.random() * col.length);
        estratti.push(col.splice(idx, 1)[0]);
      }
      return estratti.sort((a, b) => a - b);
    });

    // 4. Prepara la matrice 3x9 con null
    const cartella: (number | null)[][] = Array.from({ length: 3 }, () =>
      Array(9).fill(null)
    );

    // 5. Distribuisci i numeri sulle righe (ogni riga deve avere 5 numeri)
    // Per ogni colonna, assegna i numeri a righe diverse
    const righeDisponibili: number[][] = [[], [], []];
    for (let c = 0; c < 9; c++) {
      const righeUsate = new Set<number>();
      for (const numero of numeriEstrattiColonna[c]) {
        // Scegli una riga casuale tra quelle disponibili con meno di 5 numeri e non già usata per questa colonna
        const possibili = [0, 1, 2].filter(
          (r) => righeDisponibili[r].length < 5 && !righeUsate.has(r)
        );
        const r =
          possibili.length > 0
            ? possibili[Math.floor(Math.random() * possibili.length)]
            : [0, 1, 2][Math.floor(Math.random() * 3)];
        cartella[r][c] = numero;
        righeDisponibili[r].push(c);
        righeUsate.add(r);
      }
    }

    // 6. Ritorna la cartella (converti null in 0 se preferisci)
    return cartella as number[][];
  }

  generaPDFCartelle(): void {
    if (
      !this.intestazione ||
      this.numeroPagine <= 0 ||
      this.cartellePerPagina <= 0
    ) {
      alert('Compila tutti i campi correttamente.');
      return;
    }

    const pdf = new jsPDF();
    let cartellaIndex = 1;

    for (let pagina = 0; pagina < this.numeroPagine; pagina++) {
      if (pagina > 0) pdf.addPage();

      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text(this.intestazione, 10, 10);

      /* pdf.setFontSize(12);
      pdf.text(`Pagina ${pagina + 1} di ${this.numeroPagine}`, 10, 20); */

      let startY = 25; // Posizione iniziale verticale

      for (let i = 0; i < this.cartellePerPagina; i++) {
        const cartella = this.generaNumeriTombola();
        this.disegnaCartella(pdf, cartella, 10, startY, cartellaIndex);
        startY += 50; // Spostamento verso il basso per la cartella successiva
        cartellaIndex++;
      }
    }

    pdf.save('cartelle_tombola.pdf');
  }

  disegnaCartella(
    pdf: jsPDF,
    cartella: number[][],
    startX: number,
    startY: number,
    index: number
  ): void {
    const cellWidth = 20;
    const cellHeight = 15;

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    /* pdf.text(`Cartella #${index}`, startX, startY - 5); */

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        const x = startX + c * cellWidth;
        const y = startY + r * cellHeight;
        pdf.rect(x, y, cellWidth, cellHeight);

        const numero = cartella[r][c];
        if (numero) {
          pdf.text(`${numero}`, x + cellWidth / 2 - 2, y + cellHeight / 2 + 3, {
            align: 'center',
          });
        }
      }
    }
  }

  generaCartelle(): void {
    this.generaPDFCartelle();
  }

  /* public generaCartelle() {
    let contaCartelle: number = 0;

    for (let i = 0; i < this.numeroCartelle; i++) {
      let numeriSingolaCartella = this.generaNumeriCartelle();
      console.log(numeriSingolaCartella);

      autoTable(this.doc, {
        theme: 'grid',
        styles: { textColor: 20, minCellHeight: 5, lineColor: 20, fontSize: 15, cellPadding: 3, minCellWidth: 10 },
        body: [
          this.divideArrayByDecade(numeriSingolaCartella.slice(0, 5).sort((a, b) => a - b)),
          this.divideArrayByDecade(numeriSingolaCartella.slice(5, 10).sort((a, b) => a - b)),
          this.divideArrayByDecade(numeriSingolaCartella.slice(10, 15).sort((a, b) => a - b))
        ]
      })

      if (i % this.cartellePerPage == 0) {
        contaCartelle++;
        this.doc.addPage();
        this.doc.text(this.intestazione + ` - Cartella n. ${contaCartelle} `, 10, 10);
      }
    }

    this.doc.save('CartelleTombola.pdf')
  } */

  /*  generaNumeriCartelle() {
    let tuttiNumeri: INumeroTombola[] = Array(90).fill(0).map((_, idx) => { return { numero: 1 + idx, estratto: false } as INumeroTombola });
    let numeriCartella: number[] = [];
    let primaRiga:number[]=[];
    let secondaRiga:number[]=[];
    let terzaRiga:number[]=[];
    for (let j = 0; j < 15; j++) {
      this.nonStampati = tuttiNumeri.filter(el => el.estratto == false);
      let estratto = Math.floor(Math.random() * this.nonStampati.length);
      this.nonStampati[estratto].estratto = true;
      numeriCartella.push(this.nonStampati[estratto].numero);
     
      primaRiga = numeriCartella.slice(0,5); 
      console.log("prima riga", primaRiga)
      secondaRiga = numeriCartella.slice(5,10);
      console.log("seconda riga", secondaRiga)
      terzaRiga = numeriCartella.slice(10,15);
      console.log("terza riga", terzaRiga)

      this.checkDecine(primaRiga)
      




    }
    return numeriCartella;
  } */

  setIntestazione(value: any) {
    localStorage.setItem('title', value);
  }

  //controllare se ci sono numeri della stessa decina
  //se ci sono, estrarre numero dalla decina con zero numeri estratti
  //se non ci sono restituire decina già estratta

  /* checkDecine(rigaEstratta:number[]){
    let arrayDecine = rigaEstratta.map(el=> ({
      numero: el, 
      decina: Math.floor(el/10)
    }))
    console.log("arrayDecine", arrayDecine)
    const numeriPerDecade: any[] = ['', '', '', '', '', '', '', '', '', ''];
    //quanti numeri abbiamo per ogni decina? 
    numeriPerDecade.forEach((el,index)=> {
      numeriPerDecade[index] = arrayDecine.filter(elem=>elem.decina==index).length
    })
    //zero
    console.log("conta numeri per decade", numeriPerDecade)
  }  */

  /* divideArrayByDecade(numbersArray: number[]) {
   




    const numeriPerDecade: string[] = ['', '', '', '', '', '', '', '', '', ''];
    const arrayDecadiDeiNumeri: number[] = []; 
    

    for(let i=0; i<numbersArray.length; i++){
        numeriPerDecade[Math.floor(numbersArray[i] / 10)] = [numbersArray[i]].toString()
    }

    



    return numeriPerDecade;
  } */

  /* getRandomNumberBetween(a: number, b: number, excludeUpperBound: number): number {
  const randomNumber = Math.floor(Math.random() * (b - a)) + a;
  return randomNumber < excludeUpperBound ? randomNumber : this.getRandomNumberBetween(a, b, excludeUpperBound);
} */

  /* findLeastFrequent(numbers: number[]): number {
  const frequencyMap = new Map<number, number>();

  numbers.forEach(number => {
    const count = frequencyMap.has(number) ? frequencyMap.get(number)! + 1 : 1;
    frequencyMap.set(number, count);
  });

  let leastFrequent = numbers[0];
  frequencyMap.forEach((value, key) => {
    if (value < frequencyMap.values().next().value) {
      leastFrequent = key;
    }
  });

  return leastFrequent;
} */

  /* getOccurrence(array:any[], value:number) {
  return array.filter((v) => (v === value)).length;
} */
}
