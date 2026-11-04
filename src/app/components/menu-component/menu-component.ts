import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ServiceAlumnos } from '../../services/service.alumnos';
import { ServiceAuthAlumnos } from '../../services/service.auth.alumno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: false,
  styleUrl: './menu-component.css',
  templateUrl: './menu-component.html',
})
export class MenuComponent implements OnInit{
  private _serviceAuth: ServiceAuthAlumnos = 
    inject(ServiceAuthAlumnos)
  public cursos !: Array<number>
  public logged = this._serviceAuth.logged
  constructor(
    private _cdr: ChangeDetectorRef,
    private _service: ServiceAlumnos,
    private _router: Router,
  ){}

  logOutEmpleado(): void {
    this._serviceAuth.logOut();
    this._router.navigate(['/login']);
  }

  async ngOnInit(): Promise<void> {
    await this.loadCursos()
  }

  async loadCursos(): Promise<void> {
    this.cursos = await this._service.getCursos()
    this._cdr.detectChanges()
  }
}
