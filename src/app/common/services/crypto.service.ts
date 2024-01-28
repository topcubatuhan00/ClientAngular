import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
	providedIn: 'root'
})
export class CryptoService {
	getDecodedAccessToken(token: string): any {
		const decodedToken = jwtDecode(token);
		return decodedToken;
	}
}
