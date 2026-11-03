import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-curso-component',
  standalone: false,
  styleUrl: './curso-component.css',
  templateUrl: './curso-component.html',
})
export class CursoComponent {
  public idCurso!: number
  constructor(
    private _activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void{
    this._activeRoute.params.subscribe((params: Params) => {
      this.idCurso = parseInt(params['idCurso'])
      
    })
  }
}
