import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { CryptoService } from './../../../../common/services/crypto.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	userName: string = "";
	constructor(
		private _http: GenericHttpService,
		private _crypto: CryptoService,
		private _toastr: ToastrService
	) {
		let token = localStorage.getItem('accessToken');
		let decoded = _crypto.getDecodedAccessToken(token ? token : '');
		this.userName = decoded.Name;
	}

	fetchAllSettingsApiEndpoint = "Settings/GetAllByUserName?userName="
	updateValueApiEndpoint = "Settings/UpdateValue"

	addSettings(){}
	updateSettings(){}
	
	fetchAllSettings = (callBack : (res: any) => void) => {
		this._http.post<any>(this.fetchAllSettingsApiEndpoint+this.userName, {userName: this.userName}, callBack)
	}

	updateValue(obj: any){
		this._http.post<any>(this.updateValueApiEndpoint, obj, (res) => {
			if(res === null){
				this._toastr.success("Ayar Başarıyla Güncellendi", "Başarılı!");
			}else{
				this._toastr.error("Ayar Güncelleme Sırasında Bir Hata Oluştu!","Hata!");
			}
		})
	}
}
