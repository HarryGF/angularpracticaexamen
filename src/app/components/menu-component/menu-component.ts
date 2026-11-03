import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceAlumnos } from '../../services/service.alumnos';

@Component({
  selector: 'app-menu-component',
  standalone: false,
  styleUrl: './menu-component.css',
  templateUrl: './menu-component.html',
})
export class MenuComponent implements OnInit{
  public cursos !: Array<number>
  constructor(
    private _cdr: ChangeDetectorRef,
    private _service: ServiceAlumnos
  ){}
  
  logOutEmpleado(): void {
    sessionStorage.removeItem("Token")
  }

  async ngOnInit(): Promise<void> {
    await this.loadCursos()
  }

  async loadCursos(): Promise<void> {
    this.cursos = await this._service.getCursos()
    this._cdr.detectChanges()
  }
}
