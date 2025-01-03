import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampaCartelleComponent } from './stampa-cartelle.component';

describe('StampaCartelleComponent', () => {
  let component: StampaCartelleComponent;
  let fixture: ComponentFixture<StampaCartelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampaCartelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StampaCartelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
