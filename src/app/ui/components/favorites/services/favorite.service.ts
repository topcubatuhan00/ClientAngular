import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';

@Injectable({
	providedIn: 'root'
})
export class FavoriteService {

	constructor(
		private _http : GenericHttpService
	) { }

	fetchAllEndpoint = "Favorite/GetAll?userId=";

	fetchFavs = (userId: number, callBack: (res: any) => void) =>{
		let url = this.fetchAllEndpoint+userId;
		this._http.post<any>(url,{userId: userId}, callBack);
	}
}
