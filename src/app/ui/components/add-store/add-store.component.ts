import { Component } from '@angular/core';
import { locations } from './extends/locations';
import { districts } from './extends/districts';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CryptoService } from '../../../common/services/crypto.service';
import { CreateStoreModel } from './models/create-store.model';

@Component({
	selector: 'app-add-store',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-store.component.html',
	styleUrl: './add-store.component.css'
})
export class AddStoreComponent {

	locs: any;
	dists: any;
	loggedUserName: string = "";

	constructor(
		private _crypto: CryptoService
	) {
		this.locs = locations.cities;
		this.dists = districts;

		let token = localStorage.getItem('accessToken');
		let decoded = _crypto.getDecodedAccessToken(token ? token : '');
		this.loggedUserName = decoded.Name;
	}

	selectedCity: string = "";
	selectedDistrict: string = "";
	districts: any;
	toggleSwitch: boolean = false;

	// Form Variables
	storeName = new FormControl('', Validators.required);
	storeNeighbourhood = new FormControl('', Validators.required);
	storeStreet = new FormControl('', Validators.required);
	storeBuildingNo = new FormControl(0);
	storeHouseNo = new FormControl(0);
	storePhoneNumber = new FormControl('', Validators.required);
	// storeIsOnline: boolean = false;
	storeCreator: string = "";
	storeAverage: number = 0;

	OnlyNumbersAllowed(event: any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	onLocChange(event: any) {
		this.selectedCity = event.target.value.toLowerCase();
		let dis = districts.filter(d => d.city === event.target.value)
		this.dists = dis[0].dists;
	}

	onDistChange(event: any) {
		this.selectedDistrict = event.target.value.toLowerCase();
	}

	changeToggle() {
		this.toggleSwitch = !this.toggleSwitch
	}

	submitForm() {
		let obj = new CreateStoreModel();

		obj.name = this.storeName.value ? this.storeName.value : "";
		obj.address = this.storeNeighbourhood.value + " " + this.storeStreet.value + " no:" + this.storeBuildingNo.value + "/" + this.storeHouseNo.value + " " + this.selectedDistrict + " " + this.selectedCity;
		obj.phoneNumber = this.storePhoneNumber.value ? this.storePhoneNumber.value : "";
		obj.isOnlineAvailable = this.toggleSwitch;
		obj.creatorName = this.loggedUserName;
		obj.averageScore = 0;

		console.log(obj);
		
	}
}
