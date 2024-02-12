import { Component } from '@angular/core';
import { StoreService } from './services/store.service';
import { StoreModel } from './models/store.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-store',
	standalone: true,
	imports: [],
	templateUrl: './store.component.html',
	styleUrl: './store.component.css'
})
export class StoreComponent {
	
	pageNumber: number = 1;
	pageSize: number = 10;
	totalPages: number = 0;

	constructor(
		private _service : StoreService,
		private _router : Router
	){}

	stores: StoreModel[] = [];

	ngOnInit() {
		this.fetchStores();
	}

	fetchStores() {
		this._service.fetchAllStores(this.pageNumber, this.pageSize, (stores: any) => {
			this.pageNumber = parseInt(stores.data.currentPage);
			this.totalPages = parseInt(stores.data.totalPages);
			this.stores = stores.data.items;
		})
	}

	changePageNumber(check: number) {
		if (check === 1) {
			this.pageNumber = this.pageNumber + 1;
		} else {
			this.pageNumber = this.pageNumber - 1;
		}
		this.fetchStores();
	}
	storeDetail(id: number){
		this._router.navigateByUrl("/store/"+id);
	}
	convertSTR(param: string) {
		param = param.length === 1 ? param+=".0" : param		
		return parseFloat(param);
	}
	addStore(){
		this._router.navigateByUrl("/add-store");
	}
}
