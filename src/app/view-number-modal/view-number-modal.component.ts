import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-number-modal',
  templateUrl: './view-number-modal.component.html',
  styleUrls: ['./view-number-modal.component.scss']
})
export class ViewNumberModalComponent implements OnInit {

  numeroEstratto?:number; 
  smorfiaNumeroEstratto?:string; 

  constructor(public ngbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngbActiveModal.close()
    },5000); // Simulate a delay for the modal to open
  }

}
