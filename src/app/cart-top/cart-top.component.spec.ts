import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTopComponent } from './cart-top.component';

describe('CartTopComponent', () => {
  let component: CartTopComponent;
  let fixture: ComponentFixture<CartTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
