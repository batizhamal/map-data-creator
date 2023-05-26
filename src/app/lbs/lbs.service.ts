import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basestation } from './model/basestation';

@Injectable({
  providedIn: 'root'
})
export class LbsService {

  private apiUrl = 'v1';

  constructor(private readonly _http: HttpClient) { }

  addBasestation(basestation: Basestation[]) {
    return this._http.post(`${this.apiUrl}/base-station`, basestation);
  }

}
