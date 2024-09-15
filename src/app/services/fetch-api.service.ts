import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../Models/UrlModel';
import { API_URLS } from '../api-urls';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {


  constructor(private httpClient: HttpClient){}

  public generateShortURL(originalUrl: string){
    console.log("hola");
    console.log(originalUrl);
    console.log("hola");
    const params = new HttpParams().set("url", originalUrl)
    const result =  this.httpClient.post<Url>(API_URLS.createURL, params, {
      headers: {"content-type": "application/x-www-form-urlencoded"}
      
    })
    return result
  }

}
