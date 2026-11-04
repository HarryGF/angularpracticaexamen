import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ServiceAuthAlumnos {
    // tipo de valor y el valor que le asignamos
    public logged = signal<boolean>(false)

    constructor(
    ){
        this.checkInitialState()
    }

    private checkInitialState(): void {
        const token = sessionStorage.getItem('Token')
        if (token) {
            this.logged.set(true)
        }
    }

    logIn(token: string): void {
        sessionStorage.setItem('Token',token)
        this.logged.set(true)
    }

    logOut(): void {
        sessionStorage.removeItem("accessToken");
        this.logged.set(false)
    }
}