import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class GenericHttpService {
	apiUrl: string = "https://localhost:7269/";
	constructor(
		private _http: HttpClient,
        private _toastr: ToastrService
	) { }

	get<T>(api: string, callBack: (res: T) => void) {
        this._http.get<T>(this.apiUrl+api).subscribe(
            (res) => {
                callBack(res);
            },
            (err: HttpErrorResponse) => {
                this._toastr.error(err.message,'Hata!');
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

    delete<T>(api: string, callBack: (res: T) => void, diffApi: boolean = false) {
        this._http.delete<T>(`${this.setApi(diffApi, api)}`).subscribe(
          (res) => {
            callBack(res);
          },
          (err) => {
            this._toastr.error(err.message, 'Hata!');
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
