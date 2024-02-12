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
	favsFetchApiEndpoint = 'Favorite/Get'
	
	favsRemoveApiEndpoint = 'Favorite/Delete?id='
	favsCreateApiEndpoint = 'Favorite/Create'
	
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

	fetchFavs = (model: any, callBack: (res: any) => void) =>{
		this._http.post<any>(this.favsFetchApiEndpoint,model, callBack);
	}

	sendComment = (model: any, callBack: (res: any) => void) => {
		this._http.post<any>(this.sentCommentApiEndpoint, model, callBack);
	}

	removeFavorite = (favoriteId: number, callBack: (res: any) => void) => {
		let url = this.favsRemoveApiEndpoint+favoriteId
		this._http.post<any>(url, {id: favoriteId}, callBack);
	}
	createFavorite = (model: any, callBack: (res: any) => void ) => {
		this._http.post<any>(this.favsCreateApiEndpoint, model, callBack);
	}
}
