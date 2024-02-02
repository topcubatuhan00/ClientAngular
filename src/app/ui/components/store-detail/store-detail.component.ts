import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreDetailModel } from './models/store-detail.model';
import { StoreDetailService } from './services/store-detail.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StoreProductModel } from './models/store-product.model';

@Component({
	selector: 'app-store-detail',
	standalone: true,
	imports: [],
	templateUrl: './store-detail.component.html',
	styleUrl: './store-detail.component.css'
})
export class StoreDetailComponent {
	
	url: SafeResourceUrl = "";
	store: StoreDetailModel = new StoreDetailModel();
	products: StoreProductModel[] = [];
	storeId = 0;
	
	constructor(
		private _service: StoreDetailService,
		private _activateRoute: ActivatedRoute,
		private _sanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this._activateRoute.paramMap.subscribe(params => {
			let storeId = params.get("id");
			this.storeId = parseInt(storeId ? storeId : '0')

			this._service.fetchStoreById(this.storeId, (store: any) => {
				this.store = store.data;
				console.log(this.store);
				this.generateMapsUrl();
			})

			this._service.fetchProductByStoreId(this.storeId, (products: any) => {
				this.products = products.data;
				console.log(this.products);
			})
		})
	}

	generateMapsUrl() {
		let address = this.store.address;
		let text = address.replaceAll(" ", "+")
		let ext = 'https://www.google.com/maps/embed/v1/place?q='+text+'&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
		this.url = this._sanitizer.bypassSecurityTrustResourceUrl(ext);
	}

	convertSTR(param: string) {
		param = param.length === 1 ? param+=".0" : param		
		return parseFloat(param);
	}

}
