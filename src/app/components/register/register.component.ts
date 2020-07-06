import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from 'angular-toastify'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router, private _toastService: ToastService) { }

  formGroup: FormGroup;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/todos']);
    }
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  get name() { return this.formGroup.get('name'); }
  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.register(this.formGroup.value).subscribe(res => this.addInfoToast(res));
    }
  }
  
  addInfoToast(message: string) {
    this._toastService.error(message);
  }

}
