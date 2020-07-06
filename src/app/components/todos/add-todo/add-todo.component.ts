import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastService } from 'angular-toastify'

import { Todo } from '../../../models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  formGroup: FormGroup;

  @Output() addTodo: EventEmitter<Todo> = new EventEmitter()

  constructor(private _toastService: ToastService) { }

  todo: Todo;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl("", [Validators.nullValidator, Validators.maxLength(20)]),
      description: new FormControl("", [Validators.maxLength(255)])
    })
  }

  get title() { return this.formGroup.get('title') };
  get description() { return this.formGroup.get('description'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.addTodo.emit(this.formGroup.value);
    } else {
      this.title.invalid && this.addInfoToast('Tarefa não pode ter mais de 20 caracteres');
      this.description.invalid && this.addInfoToast('Descrição não pode ter mais de 255 caracteres');
    }
  }

  addInfoToast(message: string) {
    this._toastService.error(message);
  }
}
