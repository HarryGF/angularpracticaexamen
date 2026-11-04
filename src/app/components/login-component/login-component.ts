import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceAlumnos } from '../../services/service.alumnos';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login-component',
  standalone: false,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  @ViewChild("cajaUsuario") cajaUser!: ElementRef;
  @ViewChild("cajaContraseña") cajaPassword!: ElementRef;
  public mensaje!: string;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _service: ServiceAlumnos
  ){}

  async logInEmpleado(): Promise<void>{
    let userName = this.cajaUser.nativeElement.value;
    let password = this.cajaPassword.nativeElement.value;
    let login = new Usuario(userName, password);
    let response = await this._service.logInAlumnosAsync(login);
    if(response.response) {
      this.mensaje = "Sesion iniciada"
    }
    this._cdr.detectChanges();
  }
}
