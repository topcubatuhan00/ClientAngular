import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { StoreModel } from '../models/store.model';

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	constructor(
		private _http: GenericHttpService
	) { }

	fetchAllStoresApiEndpoint = "Store/GetAll?PageNumber=";

	fetchAllStores = (pageNumber: number, pageSize: number, callBack: (res: StoreModel[]) => void) => {
		this._http.get<StoreModel[]>(this.fetchAllStoresApiEndpoint+pageNumber+'&PageSize='+pageSize, callBack)
	}
}
