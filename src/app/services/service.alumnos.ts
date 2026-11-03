import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Alumno } from "../models/alumno";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServiceAlumnos {
    url = environment.urlApi
    constructor(private _http: HttpClient){}

    async getCursos(): Promise<number[]> {
        let request = "api/alumnos/cursos"
        return firstValueFrom(this._http.get<number[]>(this.url + request))
    }
}