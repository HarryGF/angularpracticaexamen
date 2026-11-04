import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, MaybeAsync, GuardResult } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (sessionStorage.getItem("Token")){
      //si tenemos token, dejamos pasar
      return true;
    }else{
      //si el usuario no está autorizado, lo llevamos a la
      //pagina de login.
      //tenemos que enviar también el estado de la url, para que no 
      //Se pierdan los parámetros
      return this._router.createUrlTree(['/login'],
        {queryParams: {returnUrl: state.url}}
      )
    }
  }
}