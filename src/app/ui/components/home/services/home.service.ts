import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { HomeProductModel } from '../models/home-product.model';
import { HomeStoreModel } from '../models/home-store.model';

@Injectable({
	providedIn: 'root'
})
export class HomeService {

	productsHomeApiEndpoint = 'Product/GetAllForHomePage';
	storesHomeApiEndpoint = 'Store/GetAllForHomePage';
	constructor(
		private _httpService: GenericHttpService
	) { }

	fetchProducts = (callBack: (res: HomeProductModel[]) => void) =>{
		this._httpService.get<HomeProductModel[]>(this.productsHomeApiEndpoint, callBack);
	}

	fetchStores = (callBack: (res: HomeStoreModel[]) => void) =>{
		this._httpService.get<HomeStoreModel[]>(this.storesHomeApiEndpoint, callBack);
	}
}
