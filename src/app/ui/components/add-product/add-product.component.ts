import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-add-product',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-product.component.html',
	styleUrl: './add-product.component.css'
})
export class AddProductComponent {

	constructor(
		private _activateRoute: ActivatedRoute
	){}

	storeId: number = 0;

	ngOnInit(){
		this._activateRoute.paramMap.subscribe(params => {
			let storeId = params.get("id");
			this.storeId = parseInt(storeId ? storeId : '0')
			console.log(this.storeId);
		})
	}

	name = new FormControl('', Validators.required)
	description = new FormControl('', Validators.required)
	brandName = new FormControl('', Validators.required)
	barcode = new FormControl('', Validators.required)
	packageInformation = new FormControl('', Validators.required)
	productionProcessInformation = new FormControl('', Validators.required)
	price = new FormControl('', Validators.required)

	submitForm(){}

}
