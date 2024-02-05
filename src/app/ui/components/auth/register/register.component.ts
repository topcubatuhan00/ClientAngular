import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {

	constructor(
		private _service: AuthService
	) { }

	selectedFile = File;

	userName = new FormControl('', Validators.required);
	password = new FormControl('', Validators.required);
	email = new FormControl('', [Validators.required, Validators.email]);

	register() {
		console.log(this.selectedFile);

		let obj = {
			userName: this.userName.value,
			password: this.password.value,
			email: this.email.value,
			photo: this.selectedFile.name,
			image: this.selectedFile,
			role: 'member'
		}

		this._service.register(obj);
	}

	onFileSelected(event: any): void {
		this.selectedFile = event.target.files[0];
	}

}
