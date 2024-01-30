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
	updateScoreApiEndpoint = 'Product/UpdateScore/'
	sentCommentApiEndpoint = 'Comment/Create'
	
	fetchProductById = (id: number, callBack: (res: ProductDetailModel) => void) => {
		this._http.get<ProductDetailModel>(this.productDetailApiEndpoint + id, callBack)
	}

	updateLike = (id: number, callBack: (res: any) => void) =>{
		this._http.post<any>(this.updateScoreApiEndpoint+id,{id: id}, callBack);
	}

	updateScore = (id: number, num: number, callBack: (res: any) => void) =>{
		this._http.post<any>(this.updateScoreApiEndpoint+id,{id: id,number: num}, callBack);
	}

	fetchComments = (model: any, callBack: (res: any) => void) =>{
		this._http.post<any>(this.commentApiEndpoint,model, callBack);
	}

	sendComment = (model: any, callBack: (res: any) => void) => {
		this._http.post<any>(this.sentCommentApiEndpoint, model, callBack);
	}
}
