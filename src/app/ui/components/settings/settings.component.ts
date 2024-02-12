import { Component } from '@angular/core';
import { SettingsService } from './settings/settings.service';
import { SettingsModel } from './models/settings.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.css'
})
export class SettingsComponent {

	constructor(
		private _service: SettingsService
	) { }

	settings: SettingsModel[] = [];
	set = { value: 0 };

	ngOnInit() {
		this._service.fetchAllSettings((res: any) => {
			this.settings = res
		})
	}

	generateName(name: string): string {
		let array = name.split(/([A-Z][a-z]*)/);

		if (array.includes("Products") && array.includes("Count")) {
			return "Ana Sayfada Görünen Ürün Sayısı";
		} else if (array.includes("Stores") && array.includes("Count")) {
			return "Ana Sayfada Görünen Mağaza Sayısı";
		} else if (array.includes("Comments") && array.includes("Count")) {
			return "Ana Sayfada Görünen Yorum Sayısı";
		}


		return '';
	}

	updateInputValue(event: any) {
		this.set.value = event.target.value;
	}

	logInputValue(settings: SettingsModel) {
		let obj = {
			id: settings.id,
			name: settings.name,
			value: this.set.value,
			updaterName: settings.creatorName
		}
		this._service.updateValue(obj);
	}

}
