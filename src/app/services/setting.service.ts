import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

  getLastNumberTime(): number {
    const lastNumberTime = localStorage.getItem('lastNumberTime');
    return lastNumberTime ? parseInt(lastNumberTime, 10) : 0;
  }

  setLastNumberTime(time: number): void {
    localStorage.setItem('lastNumberTime', time.toString());
  }
  getLastNumberModalIsActive(): boolean {
    const lastNumberModalIsActive = localStorage.getItem(
      'lastNumberModalIsActive'
    );
    return lastNumberModalIsActive
      ? JSON.parse(lastNumberModalIsActive)
      : false;
  }

  setLastNumberModalIsActive(isActive: boolean): void {
    localStorage.setItem('lastNumberModalIsActive', JSON.stringify(isActive));
  }
}
