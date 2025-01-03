import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNumberModalComponent } from './view-number-modal.component';

describe('ViewNumberModalComponent', () => {
  let component: ViewNumberModalComponent;
  let fixture: ComponentFixture<ViewNumberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNumberModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
