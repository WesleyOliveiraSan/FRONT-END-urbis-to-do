import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service'
import { AuthService } from '../../services/auth.service'

import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  username: string;
  todos: Todo[];

  constructor(private todoService: TodoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => this.todos.push(todo));
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(td => td.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  logout() {
    this.authService.logout();
  }

}
