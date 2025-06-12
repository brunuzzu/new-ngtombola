import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaccoltaFondiComponent } from './raccolta-fondi.component';

describe('RaccoltaFondiComponent', () => {
  let component: RaccoltaFondiComponent;
  let fixture: ComponentFixture<RaccoltaFondiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaccoltaFondiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaccoltaFondiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
