import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGastoseganhosComponent } from './card-gastoseganhos.component';

describe('CardGastoseganhosComponent', () => {
  let component: CardGastoseganhosComponent;
  let fixture: ComponentFixture<CardGastoseganhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGastoseganhosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGastoseganhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
