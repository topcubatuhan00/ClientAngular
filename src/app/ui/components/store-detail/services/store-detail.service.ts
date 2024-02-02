import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { StoreDetailModel } from '../models/store-detail.model';
import { StoreProductModel } from '../models/store-product.model';

@Injectable({
	providedIn: 'root'
})
export class StoreDetailService {

	constructor(
		private _http: GenericHttpService
	) { }

	fetchStoreById = (id: number, callBack: (res: StoreDetailModel) => void) => {
		let url = "Store/"+id
		this._http.get<StoreDetailModel>(url, callBack)
	}

	fetchProductByStoreId = (id: number, callBack: (res: StoreProductModel) => void) => {
		let url = "Product/GetWithStoreId/"+id
		this._http.get<StoreProductModel>(url, callBack)
	}
}
