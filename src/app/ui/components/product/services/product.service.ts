import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ProductModel } from '../models/product.model';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(
		private _http: GenericHttpService
	) { }

	productsApiEndpoint = "Product/GetAll?"

	fetch = (pageNumber: number, pageSize: number, callBack: (res: ProductModel[]) => void) =>{
		this._http.get<ProductModel[]>(this.productsApiEndpoint+'PageNumber='+pageNumber+'&PageSize='+pageSize, callBack);
	}
}
