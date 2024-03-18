import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroCancionesComponent } from './maestro-canciones.component';

describe('MaestroCancionesComponent', () => {
  let component: MaestroCancionesComponent;
  let fixture: ComponentFixture<MaestroCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaestroCancionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaestroCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
