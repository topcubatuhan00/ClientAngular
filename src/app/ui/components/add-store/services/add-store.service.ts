import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AddStoreService {

	constructor(
		private _http: GenericHttpService,
		private _toastr: ToastrService,
		private _router: Router
	) { }

	apiCreateStoreEndpoint = "Store/Create";

	addStore(model: any){
		this._http.post<any>(this.apiCreateStoreEndpoint, model, res => {
			if(res?.error?.error?.length > 0){
				this._toastr.error(res.error.error,'Hata!');
			}else {
				this._toastr.success('Mağaza başarıyla eklendi.','Başarılı!');
				this._router.navigateByUrl("/stores")
			}
		})
	}	
}
