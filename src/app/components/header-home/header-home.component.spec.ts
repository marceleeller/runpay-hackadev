import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomeComponent } from './header-home.component';

describe('HeaderHomeComponent', () => {
  let component: HeaderHomeComponent;
  let fixture: ComponentFixture<HeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
