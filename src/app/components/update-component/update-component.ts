import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceAlumnos } from '../../services/service.alumnos';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-update-component',
  standalone: false,
  styleUrl: './update-component.css',
  templateUrl: './update-component.html',
})

export class UpdateComponent implements OnInit{
  @ViewChild("cajaId") cajaId!: ElementRef
  @ViewChild("cajaNombre") cajaNombre!: ElementRef
  @ViewChild("cajaApellidos") cajaApellidos!: ElementRef
  @ViewChild("cajaImagen") cajaImagen!: ElementRef
  @ViewChild("cajaEstado") cajaEstado!: ElementRef
  @ViewChild("cajaCurso") cajaCurso!: ElementRef
  public alumno!: Alumno
  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: ServiceAlumnos,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ){}

  async ngOnInit(): Promise<void>{
    this._activeRoute.params.subscribe(async(params: Params) => {
      await this.getAlumnoToken((params['id']))
    })
  }

  async getAlumnoToken(id: string): Promise<void> {
    this.alumno = await this._service.getAlumnoToken(id)
    this._cdr.detectChanges()
  }

  async updateAlumnoToken(): Promise<void> {
    let id = parseInt(this.cajaId.nativeElement.value)
    let nombre = this.cajaNombre.nativeElement.value
    let apellidos = this.cajaApellidos.nativeElement.value
    let imagen = this.cajaImagen.nativeElement.value
    let estado = parseInt(this.cajaEstado.nativeElement.value)
    let curso = parseInt(this.cajaCurso.nativeElement.value)

    let alumno = new Alumno(id, nombre, apellidos, imagen, estado, curso)
    await this._service.updateAlumnoToken(alumno)
    this._router.navigate(['/curso/' + this.cajaCurso.nativeElement.value])
  }
}
