import { HttpInterceptorFn } from '@angular/common/http';
import { SKIP_TOKEN } from '../utils/token.context';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(SKIP_TOKEN)) {
    return next(req)
  }
  // Centralizo el token para no que haga falta pedir el token cada vez que vaya a hacer una peticion,
  // el problema es que usara el token para todas las peticiones aunque no haga falta
  // por ello creamos una variable SKIP_TOKEN
  const token = sessionStorage.getItem("Token")
  if (token) {
    const tokenRequest = req.clone({
      setHeaders: {
        Authorization: "bearer " + token
      }
    })
    return next(tokenRequest)
  }
  return next(req)
};
