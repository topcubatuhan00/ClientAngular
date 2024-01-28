import { Component } from '@angular/core';
import { CryptoService } from '../../../common/services/crypto.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

	constructor(
		private _crypto: CryptoService
	){}

	userName = 'greenChoice User';
	apiUrl = '';


	ngOnInit() {
		let token = localStorage.getItem("accessToken")
		let decodedToken =token ? this._crypto.getDecodedAccessToken(token) : null
		this.userName = decodedToken.Name
		this.apiUrl = 'https://localhost:7269/Image/GetImage/'+decodedToken.Photo;
	}

}
