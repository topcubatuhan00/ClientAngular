import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule,FormsModule,ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	
	constructor(
		private _auth: AuthService,
		private _router: Router,
	) { }

	userName = new FormControl('', [Validators.required]);
	password = new FormControl('', [Validators.required]);

	login(){
		let obj = {
			userName: this.userName.value,
			password: this.password.value
		}

		this._auth.login(obj);
	}
}
