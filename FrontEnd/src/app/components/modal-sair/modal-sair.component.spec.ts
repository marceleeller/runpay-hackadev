import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSairComponent } from './modal-sair.component';

describe('ModalSairComponent', () => {
  let component: ModalSairComponent;
  let fixture: ComponentFixture<ModalSairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
