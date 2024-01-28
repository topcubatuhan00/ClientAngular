import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService, ToastrType } from './toastr.service';


@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	constructor(
		private _toastr: ToastrService
	) { }

	errorHandler(err: HttpErrorResponse) {
		switch (err.status) {
			case 0:
				this._toastr.toast(ToastrType.Error, "Hata!", "Api Adresine Ulaşılamadı...")
				break;
			case 404:
				this._toastr.toast(ToastrType.Error, "Hata!", "Api Adresi Bulunamıyor...")
				break;
			case 400:
				if (err.error.Errors) {
					err.error.Errors.forEach((element: any) => {
						this._toastr.toast(ToastrType.Error, "Hata!", element)
						console.log(element);
					});
				} else {
					this._toastr.toast(ToastrType.Error, "Hata!", err.error.title)
				}
				break;
			case 500:
				if (err.error.Errors) {
					err.error.Errors.forEach((element: any) => {
						this._toastr.toast(ToastrType.Error, "Hata!", element)
						console.log(element);
					});
				} else {
					this._toastr.toast(ToastrType.Error, "Hata!", err.error.title)
				}
				break;
			default:
				break;
		}
	}
}