import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoService } from '../../../services/todo.service';

import { Todo } from '../../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

  constructor(private todoService: TodoService) {

  }

  ngOnInit() {

  }

  onToggle(todo: Todo) {
    todo.completed = !todo.completed;

    this.todoService.toggleCompleted(todo).subscribe();
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

}
