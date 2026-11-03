import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MenuComponent } from './components/menu-component/menu-component';
import { HomeComponent } from './components/home-component/home-component';
import { CursoComponent } from './components/curso-component/curso-component';
import { provideHttpClient } from '@angular/common/http';
import { ServiceAlumnos } from './services/service.alumnos';

@NgModule({
  declarations: [App, MenuComponent, HomeComponent, CursoComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideHttpClient(),
    ServiceAlumnos
  ],
  bootstrap: [App],
})
export class AppModule {}
