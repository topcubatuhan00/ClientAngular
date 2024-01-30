import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ProductDetailModel } from '../models/product-detail.model';

@Injectable({
	providedIn: 'root'
})
export class ProductDetailService {

	constructor(
		private _http: GenericHttpService
	) { }

	productDetailApiEndpoint = 'Product/'
	commentApiEndpoint = 'Comment/GetAll'
	
	fetchProductById = (id: number, callBack: (res: ProductDetailModel) => void) => {
		this._http.get<ProductDetailModel>(this.productDetailApiEndpoint + id, callBack)
	}

	// fetchComments(model: any) {
	// 	this._http.post<any>(this.commentApiEndpoint, model, res => {
	// 		console.log(res);
			
	// 		return;
	// 	})
	// }

	fetchComments = (model: any, callBack: (res: any) => void) =>{
		this._http.post<any>(this.commentApiEndpoint,model, callBack);
	}
}
