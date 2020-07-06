import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from 'angular-toastify'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router, private _toastService: ToastService) { }

  formGroup: FormGroup;

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/todos']);
    }
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(res => {
        res === "server" && this.addInfoToast('Erro ao tentar conectar com o Servidor');
        !res && this.addInfoToast('Usuário ou senha incorreto!');
      });
    }
  }

  addInfoToast(message: string) {
    this._toastService.error(message);
  }

}
