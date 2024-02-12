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

	ngOnInit() {
		let userName = localStorage.getItem("rememberUserName");
		if(userName){
			this.flag = true;
			this.rememberUserName = userName;
			let photo = 'https://localhost:7269/Image/GetImage/'+localStorage.getItem("rememberUserPhoto");
			this.rememberUserPhoto = photo ? photo : '';
		}
	}
	
	flag = false;
	rememberUserName = '';
	rememberUserPhoto = '';
	userName = new FormControl('', [Validators.required]);
	password = new FormControl('', [Validators.required]);
	rememberPassword = new FormControl('', [Validators.required]);
	rememberMe = new FormControl(true, [Validators.required]);

	login(){
		let obj = {}
		if(!this.flag){
			obj = {
				userName: this.userName.value,
				password: this.password.value
			}
		}else{
			obj = {
				userName: this.rememberUserName,
				password: this.rememberPassword.value
			}
		}
		this._auth.login(obj, this.rememberMe.value ? this.rememberMe.value : false);
	}

	reset(){
		localStorage.removeItem("rememberUserName");
		localStorage.removeItem("rememberUserPhoto");
		window.location.reload();
	}
}
