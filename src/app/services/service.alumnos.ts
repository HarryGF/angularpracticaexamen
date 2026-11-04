import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { Alumno } from "../models/alumno";
import { first, firstValueFrom } from "rxjs";
import { Usuario } from "../models/usuario";
import { SKIP_TOKEN } from "../utils/token.context";
import { ServiceAuthAlumnos } from "./service.auth.alumno";

@Injectable()
export class ServiceAlumnos {
    url = environment.urlApi
    constructor(
        private _http: HttpClient,
        private _authState: ServiceAuthAlumnos
    ){}

    async getCursos(): Promise<number[]> {
        let request = "api/alumnos/cursos"
        return firstValueFrom(
            this._http.get<number[]>(this.url + request, {
                context: new HttpContext().set(SKIP_TOKEN, true)
            })
        )
    }

    async getCurso(idCurso: string): Promise<Alumno[]> {
        let request = "api/alumnos/filtrarcurso/" + idCurso
        return firstValueFrom(
            this._http.get<Alumno[]>(this.url + request, {
                context: new HttpContext().set(SKIP_TOKEN, true)
            })
        )
    }

    async deleteAlumnoToken(id: string): Promise<any> {
        let request = "api/alumnos/deletealumnotoken/" + id
        let token = sessionStorage.getItem("Token");
        let header = new HttpHeaders()
            .set("Authorization", "bearer " + token);
        return firstValueFrom(
            this._http.delete(this.url+request, {
                headers: header,
                context: new HttpContext().set(SKIP_TOKEN, true)
            })
        )
    }

    async logInAlumnosAsync(user: Usuario): Promise<any>{
        let request = "api/auth/login"
        let json = JSON.stringify(user)
        let header = new HttpHeaders()
            .set("content-type", "application/json")
        let response = await firstValueFrom(
            this._http.post<any>(this.url + request, json, {
                headers: header,
                context: new HttpContext().set(SKIP_TOKEN, true)
            })
        )
        if (response && response.response) {
            this._authState.logIn(response.response);
        }
        return response
    }

    async getAlumnoToken(id: string): Promise<Alumno> {
        let request = "api/alumnos/findAlumnoToken/" + id
        return firstValueFrom(this._http.get<Alumno>(this.url+request))
    }

    async updateAlumnoToken(alumno: Alumno): Promise<any> {
        let request = "api/alumnos/updatealumnotoken"
        let json = JSON.stringify(alumno)
        let header = new HttpHeaders().set("content-type", "application/json");
        return firstValueFrom(this._http.put(this.url + request, json, {headers: header}))
    }

    async postAlumnoToken(alumno: Alumno): Promise<any> {
        let request = "api/alumnos/insertalumnotoken"
        let json = JSON.stringify(alumno)
        let header = new HttpHeaders().set("content-type", "application/json");
        return firstValueFrom(this._http.post(this.url + request, json, {headers: header}))
    }

}