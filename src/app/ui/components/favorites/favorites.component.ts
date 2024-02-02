import { Component } from '@angular/core';
import { FavoriteService } from './services/favorite.service';
import { FavoritesModel } from './models/favorites.model';
import { CryptoService } from '../../../common/services/crypto.service';
import { ProductDetailService } from '../product-detail/services/product-detail.service';

@Component({
	selector: 'app-favorites',
	standalone: true,
	imports: [],
	templateUrl: './favorites.component.html',
	styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

	constructor(
		private _favoriteService : FavoriteService,
		private _crypto: CryptoService,
		private _productDetailService : ProductDetailService
	){}

	favorites: FavoritesModel[] = [];
	userId: number = 0;

	ngOnInit(){
		let token = localStorage.getItem("accessToken");
		let decoded = this._crypto.getDecodedAccessToken(token ? token : '');
		this.userId = decoded.Id;
		this._favoriteService.fetchFavs(this.userId, (res: FavoritesModel[]) => {
			this.favorites = res;
		})

		console.log(this.favorites.length);
	}

	removeFav(id: number){
		this._productDetailService.removeFavorite(id, (res: any) => {
			window.location.reload();
		})
	}
}
