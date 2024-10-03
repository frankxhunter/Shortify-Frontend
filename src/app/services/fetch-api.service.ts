import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShortUrl } from '../Models/UrlModel';
import { API_URLS } from '../api-urls';
import { Url } from '../interfaces/url.interface';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchApiService {
  // Estado para indicar q la lista de urls se ha actualizado
  private refreshUrlList = new BehaviorSubject<Url[]>([]);

  stateUrlList$ = this.refreshUrlList.asObservable();

  public refreshList() {
    this.getAllUrlsOfUser().subscribe((data) => {
      this.refreshUrlList.next(data);
    });
  }

  constructor(private httpClient: HttpClient) {}

  public generateShortURL(originalUrl: string) {
    const params = new HttpParams().set('url', originalUrl);
    const result = this.httpClient.post<ShortUrl>(API_URLS.createURL, params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    });
    return result;
  }

  public getAllUrlsOfUser() {
    return this.httpClient.get<Url[]>(API_URLS.getUrls, {
      withCredentials: true,
    });
  }

  public updateOriginalUrl(id: number, originalUrl: string) {
    let params = new HttpParams().set('id', id).set('originalUrl', originalUrl);

    return this.httpClient.post(API_URLS.getUrls, params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    });
  }

  public getRegisterOfUrl(idUrl: string) {
    console.log(idUrl);
    const params = new HttpParams().set('id', idUrl);

    return this.httpClient.get<Register[]>(API_URLS.getRegisters, {
      params: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    });
  }
}
