import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barralatera',
  standalone: true,
  imports: [],
  templateUrl: './barralatera.component.html',
  styleUrl: './barralatera.component.css'
})
export class BarralateraComponent {
  constructor(private _ruta: Router) { }


}
