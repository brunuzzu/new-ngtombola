import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.scss'],
})
export class ImpostazioniComponent implements OnInit {
  lastNumberModalIsActive: boolean = true;
  lastNumberTime: number = 5;
  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.lastNumberModalIsActive =
      this.settingService.getLastNumberModalIsActive();
    this.lastNumberTime = this.settingService.getLastNumberTime();
  }

  onLastNumberModalIsActiveChange(event: any): void {
    this.lastNumberModalIsActive = event.target.checked;
    this.saveSettings();
  }

  onLastNumberTimeChange(event: any): void {
    console.log('event', event);
    this.lastNumberTime = event;
    this.saveSettings();
  }

  saveSettings(): void {
    this.settingService.setLastNumberModalIsActive(
      this.lastNumberModalIsActive
    );
    this.settingService.setLastNumberTime(this.lastNumberTime);
  }
}
