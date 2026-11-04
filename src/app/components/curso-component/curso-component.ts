import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { ServiceAlumnos } from '../../services/service.alumnos';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-curso-component',
  standalone: false,
  styleUrl: './curso-component.css',
  templateUrl: './curso-component.html',
})
export class CursoComponent {
  public idCurso!: string
  public alumnos!: Alumno[]
  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: ServiceAlumnos,
    private _cdr: ChangeDetectorRef
  ){}

  async ngOnInit(): Promise<void>{
    this._activeRoute.params.subscribe(async(params: Params) => {
      await this.getAlumnosFiltro((params['idCurso']))
    })
  }

  async getAlumnosFiltro(idCurso: string): Promise<void> {
    this.idCurso = idCurso
    this.alumnos = await this._service.getCurso(idCurso)
    this._cdr.detectChanges()
  }

  async deleteAlumno(id: number): Promise<void> {
    let response = await this._service.deleteAlumnoToken(id.toString())
    await this.getAlumnosFiltro(this.idCurso)
  }

  generarPDF(): void {
    if (!this.alumnos || this.alumnos.length == 0) return;

    let document: jsPDF = new jsPDF();
    document.setFontSize(18);
    document.text(`Listado de Alumnos - Curso ${this.idCurso}`, 10, 15);
    document.setFontSize(12);

    const headers = [["ID", "Nombre", "Apellidos", "Activo"]];
    const data = this.alumnos.map(alumno => [
      alumno.idAlumno,
      alumno.nombre,
      alumno.apellidos,
      alumno.activo == 1 ? 'Sí' : 'No'
    ]);
    autoTable(document, {
      head: headers,
      body: data,
      startY: 25 
    });
    document.save(`informe_curso_${this.idCurso}.pdf`);
  }
}
