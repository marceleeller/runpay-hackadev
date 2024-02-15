import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCadastroComponent } from './header-cadastro.component';

describe('HeaderCadastroComponent', () => {
  let component: HeaderCadastroComponent;
  let fixture: ComponentFixture<HeaderCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
