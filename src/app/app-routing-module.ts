import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { CursoComponent } from './components/curso-component/curso-component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "curso/:idCurso", component: CursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
