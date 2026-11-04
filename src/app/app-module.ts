import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MenuComponent } from './components/menu-component/menu-component';
import { HomeComponent } from './components/home-component/home-component';
import { CursoComponent } from './components/curso-component/curso-component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ServiceAlumnos } from './services/service.alumnos';
import { LoginComponent } from './components/login-component/login-component';
import { ErrorComponent } from './components/error-component/error-component';
import { provideToastService } from 'ngx-yet-another-toast-library';
import { errorInterceptor } from './interceptors/error-interceptor';
import { AuthGuard } from './guards/auth-guard';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './components/update-component/update-component';
import { authTokenInterceptor } from './interceptors/auth-token-interceptor';
import { CreateComponent } from './components/create-component/create-component';

@NgModule({
  declarations: [
    App,
    MenuComponent,
    HomeComponent,
    CursoComponent,
    LoginComponent,
    ErrorComponent,
    UpdateComponent,
    CreateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authTokenInterceptor, errorInterceptor])),
    provideToastService(),
    ServiceAlumnos,
    AuthGuard,
  ],
  bootstrap: [App],
})
export class AppModule {}
