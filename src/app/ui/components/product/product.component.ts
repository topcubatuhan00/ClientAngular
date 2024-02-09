import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductModel } from './models/product.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product',
	standalone: true,
	imports: [],
	templateUrl: './product.component.html',
	styleUrl: './product.component.css'
})
export class ProductComponent {
	constructor(
		private _service: ProductService,
		private _router: Router
	) { }

	products: ProductModel[] = [];
	pageNumber: number = 1;
	pageSize: number = 10;
	totalPages: number = 0;

	ngOnInit() {
		this.fetchProducts();
	}

	fetchProducts() {
		this._service.fetch(this.pageNumber, this.pageSize, (products: any) => {
			this.products = products.data.items;
			this.pageNumber = parseInt(products.data.currentPage);
			this.totalPages = parseInt(products.data.totalPages);			
		})
	}

	convertSTR(param: string) {
		param = param.length === 1 ? param+=".0" : param		
		return parseFloat(param);
	}

	changePageNumber(check: number) {
		if (check === 1) {
			this.pageNumber = this.pageNumber + 1;
		} else {
			this.pageNumber = this.pageNumber - 1;
		}
		this.fetchProducts();
	}

	productDetail(id:number){
		this._router.navigateByUrl("/product/"+id);
	}

}
