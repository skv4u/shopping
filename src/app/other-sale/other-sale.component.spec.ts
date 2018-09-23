import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSaleComponent } from './other-sale.component';

describe('OtherSaleComponent', () => {
  let component: OtherSaleComponent;
  let fixture: ComponentFixture<OtherSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
