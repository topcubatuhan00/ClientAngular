import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { AddProductModel } from '../models/add-product.model';
import { CategoryModel } from '../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AddProductService {

	constructor(
		private _http: GenericHttpService,
		private _toastr: ToastrService,
		private _router: Router
	) { }

	createApiEndpoint = "Product/Create";
	fetchCategoryApiEndpoint = "Category/GetAll?PageNumber=1&PageSize=1000";

	addProduct(model: any){
		this._http.post<any>(this.createApiEndpoint,model, res => {
			if(res?.error?.error?.length > 0){
				this._toastr.error(res.error.error,'Hata!');
			}else {
				this._toastr.success('Mağaza başarıyla eklendi.','Başarılı!');
				this._router.navigateByUrl("/products")
			}
		})
	}

	fetchCategories = (callBack: (res: CategoryModel[]) => void) => {
		this._http.get<CategoryModel[]>(this.fetchCategoryApiEndpoint, callBack)
	}

}
