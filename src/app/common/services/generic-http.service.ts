import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GenericHttpService {
	apiUrl: string = "https://localhost:7269/";
	constructor(
		private _http: HttpClient,
        private _error: ErrorService
	) { }

	get<T>(api: string, callBack: (res: T) => void) {
        this._http.get<T>(this.apiUrl+api).subscribe(
            (res) => {
                callBack(res);
            },
            (err: HttpErrorResponse) => {
                this._error.errorHandler(err);
            }
        );
    }

    post<T>(api: string, model: any, callBack: (res: T) => void, diffApi: boolean = false) {        
        this._http.post<T>(`${this.setApi(diffApi, api)}`, model).subscribe(
            (res) => {               
                callBack(res);
            },
            (err) => {
                callBack(err)
                
            }
        );
    }

    setApi(diffApi: boolean, api: string) {
        if (diffApi) {
            return api;
        }
        return this.apiUrl + api;
    }
}
