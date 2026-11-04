import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceAlumnos } from '../../services/service.alumnos';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-create-component',
  standalone: false,
  styleUrl: './create-component.css',
  templateUrl: './create-component.html',
})
export class CreateComponent {
  @ViewChild("cajaId") cajaId!: ElementRef
  @ViewChild("cajaNombre") cajaNombre!: ElementRef
  @ViewChild("cajaApellidos") cajaApellidos!: ElementRef
  @ViewChild("cajaImagen") cajaImagen!: ElementRef
  @ViewChild("cajaEstado") cajaEstado!: ElementRef
  @ViewChild("cajaCurso") cajaCurso!: ElementRef

  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: ServiceAlumnos,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ){}

  async insertAlumnoToken(): Promise<void> {
      let id = parseInt(this.cajaId.nativeElement.value)
      let nombre = this.cajaNombre.nativeElement.value
      let apellidos = this.cajaApellidos.nativeElement.value
      let imagen = this.cajaImagen.nativeElement.value
      let estado = parseInt(this.cajaEstado.nativeElement.value)
      let curso = parseInt(this.cajaCurso.nativeElement.value)
  
      let alumno = new Alumno(id, nombre, apellidos, imagen, estado, curso)
      await this._service.postAlumnoToken(alumno)
      this._router.navigate(['/curso/' + this.cajaCurso.nativeElement.value])
    }
}
