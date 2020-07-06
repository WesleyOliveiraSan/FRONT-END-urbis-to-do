import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

import { TodosComponent } from './todos.component'
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoComponent } from './add-todo/add-todo.component'

@NgModule({
  declarations: [TodosComponent,TodoItemComponent, AddTodoComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularToastifyModule 
  ],
  providers:[ToastService],
  exports: [TodosComponent]
})
export class TodosModule { }
