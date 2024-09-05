import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchApiService } from '../services/fetch-api.service';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { API_URLS } from '../api-urls';

@Component({
  selector: 'app-form-url',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './form-url.component.html',
  styleUrl: './form-url.component.css'
})
export class FormUrlComponent {

  fetchApiService = inject(FetchApiService)

  dataSend= "";

  loader = false;

  urlValue = "https://chatgpt.com/c/c5371a23-6599-4c8a-b82d-649319c2c931"

  @Output() fetchEvent = new EventEmitter<string>();

fetchData(){

  this.fetchApiService.generateShortURL(this.urlValue).subscribe(data => {
    
    const shortURLFull = API_URLS.baseURL +"/"+ data.shortUrl

    this.fetchEvent.emit(shortURLFull)

  })

}
}
