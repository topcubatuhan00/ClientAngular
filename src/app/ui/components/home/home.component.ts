import { Component } from '@angular/core';
import { HomeService } from './services/home.service';
import { HomeProductModel } from './models/home-product.model';
import { HomeStoreModel } from './models/home-store.model';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

	constructor(
		private _homeService: HomeService
	) { }

	productResponse: HomeProductModel[] = [];
	storeResponse: HomeStoreModel[] = [];
	// commentResponse: HomeCommentModel[] = [];

	ngOnInit() {
		this._homeService.fetchProducts((productResponse: any) => {
			this.productResponse = productResponse.data;
		})

		this._homeService.fetchStores((storeResponse: any) => {
			this.storeResponse = storeResponse.data;
		})
		
	}
	

}
