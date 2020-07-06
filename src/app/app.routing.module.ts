import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { TodosComponent } from '../app/components/todos/todos.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }