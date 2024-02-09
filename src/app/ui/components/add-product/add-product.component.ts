import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from './services/add-product.service';
import { CategoryModel } from './models/category.model';
import { CryptoService } from '../../../common/services/crypto.service';

@Component({
	selector: 'app-add-product',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-product.component.html',
	styleUrl: './add-product.component.css'
})
export class AddProductComponent {

	constructor(
		private _activateRoute: ActivatedRoute,
		private _service: AddProductService,
		private _crypto: CryptoService
	) {
		let token = localStorage.getItem('accessToken');
		let decoded = _crypto.getDecodedAccessToken(token ? token : '');
		this.userName = decoded.Name;
	}
	
	userName: string = "";
	storeId: number = 0;
	categories: CategoryModel[] = [];
	selectedCategoryId: number = 0;

	ngOnInit() {
		this._activateRoute.paramMap.subscribe(params => {
			let storeId = params.get("id");
			this.storeId = parseInt(storeId ? storeId : '0')
		})

		this._service.fetchCategories((categoryResponse: any) => {
			this.categories = categoryResponse.data.items;
		})
	}

	name = new FormControl('', Validators.required)
	description = new FormControl('', Validators.required)
	brandName = new FormControl('', Validators.required)
	barcode = new FormControl('', Validators.required)
	packageInformation = new FormControl('', Validators.required)
	productionProcessInformation = new FormControl('', Validators.required)
	price = new FormControl('', Validators.required)

	submitForm() {
		let obj = {
			name: this.name.value,
			description: this.description.value,
			categoryId: this.selectedCategoryId === 0 ? 3 : this.selectedCategoryId,
			brandName: this.brandName.value,
			barcode: this.barcode.value,
			packageInformation: this.packageInformation.value,
			productionProcessInformation: this.productionProcessInformation.value,
			sustainabilityScore: "0",
			averageScore: "0",
			creatorName: this.userName,
			price: this.price.value ? this.price.value.toString() : '0',
			storeId: this.storeId
		}		
		this._service.addProduct(obj);
	}

	OnlyNumbersAllowed(event: any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	onCategoryChange(event: any) {
		this.selectedCategoryId = parseInt(event.target.value);
	}

}
