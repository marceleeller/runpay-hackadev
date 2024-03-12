import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEquipeComponent } from './card-equipe.component';

describe('CardEquipeComponent', () => {
  let component: CardEquipeComponent;
  let fixture: ComponentFixture<CardEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEquipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
