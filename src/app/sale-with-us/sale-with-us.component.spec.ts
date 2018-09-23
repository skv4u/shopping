import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleWithUsComponent } from './sale-with-us.component';

describe('SaleWithUsComponent', () => {
  let component: SaleWithUsComponent;
  let fixture: ComponentFixture<SaleWithUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleWithUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
