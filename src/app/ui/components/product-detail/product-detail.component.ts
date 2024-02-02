import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './services/product-detail.service';
import { ProductDetailModel } from './models/product-detail.model';
import { CryptoService } from '../../../common/services/crypto.service';
import { CommentModel } from './models/comment.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-product-detail',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './product-detail.component.html',
	styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

	constructor(
		private _activateRoute: ActivatedRoute,
		private _service: ProductDetailService,
		private _crypto: CryptoService,
	) { }

	id: number = 0;
	product = new ProductDetailModel();
	score = 0;
	comments = new Array<CommentModel>();
	apiLink = 'https://localhost:7269/Image/GetImage/'
	userId = 0;
	userName = "";
	favoriteId = 0;

	comment = new FormControl('');

	ngOnInit() {
		this._activateRoute.paramMap.subscribe(params => {
			let productId = params.get("id");
			this.id = parseInt(productId ? productId : '0')

			this._service.fetchProductById(this.id, (product: any) => {
				this.product = product.data
								
			})
		})
		let token = localStorage.getItem('accessToken')
		let userName = "";
		let userId = 0;
		if (token) {
			let decodedToken = token ? this._crypto.getDecodedAccessToken(token) : null
			userName = decodedToken.Name;
			userId = decodedToken.Id;
			this.userId = userId;		
			this.userName = userName;		
		}

		let scoreName = 'score' + this.id + userName
		let score = localStorage.getItem(scoreName)
		this.score = score ? parseInt(score) : 0;

		let obj = {
			userId: userId,
			productId: this.id
		}
		this._service.fetchComments(obj, (comments: any) => {
			this.comments = comments
			
		});

		let favsObj = {
			userId: userId,
			productId : this.id
		}
		this._service.fetchFavs(favsObj, (favs: any) => {
			if (favs !== null){
				this.favoriteId = favs.id;				
			}
		})
	}

	setScore(num: number) {
		let userName = localStorage.getItem('rememberUserName')
		let scoreName = 'score' + this.id + userName
		localStorage.setItem(scoreName, num.toString())

		this._service.updateScore(this.id,num, (res: any) => {
			window.location.reload()
		})
	}

	updateLike(num: number) {
		this._service.updateLike(num, (res: any) => {
			console.log(res);
		})
	}

	sendComment(){
		let obj = {
			productId : this.id,
			userId: this.userId,
			text: this.comment.value,
			commentScore: 0,
			creatorName: this.userName
		} 
		
		this._service.sendComment(obj, (res: any) => {
			window.location.reload()
		})
	}

	favorite(){
		console.log(this.favoriteId);
		
		if(this.favoriteId > 0){
			this._service.removeFavorite(this.favoriteId, (res : any) => {
				this.favoriteId = -1;
			});
		}else{
			let obj = {
				productId: this.id,
				userId : this.userId
			}			
			this._service.createFavorite(obj, (res: any) => {
				this.favoriteId = res;
			});
		}
	}
}
