import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basestation } from './model/basestation';

@Injectable({
	providedIn: 'root'
})
export class LbsService {
	private apiUrl = 'v1';

	// private googleApiKey = 'AIzaSyCy5C-BOZl9quQ8oP3oR8sBdmR11V70Mcg'; // Batizhamal

	constructor(private readonly http: HttpClient) {}

	addBasestation(basestation: Basestation[]) {
		return this.http.post(`${this.apiUrl}/base-station`, basestation);
	}

	getPointAddress(latitude: number, longitude: number, apiKey: string) {
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
			params: new HttpParams({
				fromObject: {
					latlng: [`${latitude},${longitude}`],
					key: apiKey,
          language: 'ru'
				}
			})
		});
	}
}
