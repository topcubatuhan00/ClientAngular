import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { CryptoService } from './../../../../common/services/crypto.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	userName: string = "";
	constructor(
		private _http: GenericHttpService,
		private _crypto: CryptoService
	) {
		let token = localStorage.getItem('accessToken');
		let decoded = _crypto.getDecodedAccessToken(token ? token : '');
		this.userName = decoded.Name;
	}

	fetchAllSettingsApiEndpoint = "Settings/GetAllByUserName?userName="

	addSettings(){}
	updateSettings(){}
	
	fetchAllSettings = (callBack : (res: any) => void) => {
		this._http.post<any>(this.fetchAllSettingsApiEndpoint+this.userName, {userName: this.userName}, callBack)
	}
}
