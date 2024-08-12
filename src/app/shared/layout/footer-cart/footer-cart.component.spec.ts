import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCartComponent } from './footer-cart.component';

describe('FooterCartComponent', () => {
  let component: FooterCartComponent;
  let fixture: ComponentFixture<FooterCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCartComponent]
    });
    fixture = TestBed.createComponent(FooterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
