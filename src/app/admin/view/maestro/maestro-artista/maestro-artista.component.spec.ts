import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroArtistaComponent } from './maestro-artista.component';

describe('MaestroArtistaComponent', () => {
  let component: MaestroArtistaComponent;
  let fixture: ComponentFixture<MaestroArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaestroArtistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaestroArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
