import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { CursoComponent } from './components/curso-component/curso-component';
import { ErrorComponent } from './components/error-component/error-component';
import { LoginComponent } from './components/login-component/login-component';
import { UpdateComponent } from './components/update-component/update-component';
import { AuthGuard } from './guards/auth-guard';
import { CreateComponent } from './components/create-component/create-component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "curso/:idCurso", component: CursoComponent},
  {path: "error", component: ErrorComponent},
  {path: "login", component: LoginComponent},
  {
    path: "update/:id", 
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create", 
    component: CreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
