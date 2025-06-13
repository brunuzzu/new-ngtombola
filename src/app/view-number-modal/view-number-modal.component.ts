import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-view-number-modal',
  templateUrl: './view-number-modal.component.html',
  styleUrls: ['./view-number-modal.component.scss'],
})
export class ViewNumberModalComponent implements OnInit {
  numeroEstratto?: number;
  smorfiaNumeroEstratto?: string;

  showLastNumberModal: boolean = false;
  lastNumberTime: number = 0;

  constructor(
    public ngbActiveModal: NgbActiveModal,
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    console.log(
      'modale parameters',
      this.showLastNumberModal,
      this.lastNumberTime
    );
    if (this.showLastNumberModal === true) {
      setTimeout(() => {
        this.ngbActiveModal.close();
      }, this.lastNumberTime * 1000);
    }
  }
}
