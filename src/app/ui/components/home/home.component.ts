import { Component } from '@angular/core';
import { HomeService } from './services/home.service';
import { HomeProductModel } from './models/home-product.model';
import { HomeStoreModel } from './models/home-store.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

	constructor(
		private _homeService: HomeService,
		private _router: Router
	) { }

	productResponse: HomeProductModel[] = [];
	storeResponse: HomeStoreModel[] = [];

	ngOnInit() {
		this._homeService.fetchProducts((productResponse: any) => {
			this.productResponse = productResponse.data;
		})
		this._homeService.fetchStores((storeResponse: any) => {
			this.storeResponse = storeResponse.data;
		})
	}
	
	productDetail(id:number){
		this._router.navigateByUrl("/product/"+id);
	}

	storeDetail(id:number){
		this._router.navigateByUrl("/store/"+id);
	}
	
}
