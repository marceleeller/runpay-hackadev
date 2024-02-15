import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInicialComponent } from './header-inicial.component';

describe('HeaderInicialComponent', () => {
  let component: HeaderInicialComponent;
  let fixture: ComponentFixture<HeaderInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
