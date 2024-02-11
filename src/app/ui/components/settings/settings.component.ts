import { Component } from '@angular/core';
import { SettingsService } from './settings/settings.service';

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
	){}

	ngOnInit() {
		this._service.fetchAllSettings((res: any) => {
			console.log(res);
		})
	}

}
