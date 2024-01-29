import { Component } from '@angular/core';
import { CryptoService } from '../../../common/services/crypto.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

	constructor(
		private _crypto: CryptoService,
		private _authService: AuthService
	) { }

	userName = 'NotLogged User';
	apiUrl = '../../../../assets/stockUser.jpg';
	flag = false;


	ngOnInit() {
		let token = localStorage.getItem("accessToken")
		if (token) {
			let decodedToken = token ? this._crypto.getDecodedAccessToken(token) : null
			this.userName = decodedToken.Name
			this.apiUrl = 'https://localhost:7269/Image/GetImage/' + decodedToken.Photo;
		}else{
			this.flag = true;
		}
	}

	logout() {
		this._authService.logOut();
		window.location.reload();
	}

}
