import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarralateraComponent } from './barralatera.component';

describe('BarralateraComponent', () => {
  let component: BarralateraComponent;
  let fixture: ComponentFixture<BarralateraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarralateraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarralateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
