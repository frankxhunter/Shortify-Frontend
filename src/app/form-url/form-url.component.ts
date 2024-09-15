import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { API_URLS } from '../api-urls';
import { FetchApiService } from '../services/fetch-api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { url } from 'inspector';
import { error } from 'console';

@Component({
  selector: 'app-form-url',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgStyle, MatProgressSpinnerModule],
  templateUrl: './form-url.component.html',
  styleUrl: './form-url.component.css',
})
export class FormUrlComponent {
  fetchApiService = inject(FetchApiService);

  dataSend = '';

  urlForm: FormGroup;

  loading = false;

  errorInput = false;

  // urlValue = 'https://chatgpt.com/c/c5371a23-6599-4c8a-b82d-649319c2c931';
  urlValue = '';

  @Output() fetchEvent = new EventEmitter<string>();
  @Output() errorEvent = new EventEmitter<boolean>();

  constructor(private _form: FormBuilder) {
    this.urlForm = this._form.group({
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.urlForm.patchValue({
      url: this.urlValue,
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.urlForm.get(controlName)?.hasError(errorType)
    );
  }
  hasErrorsGeneral(controlName: string) {
    return (
      this.urlForm.get(controlName)?.errors != null
    );
  }

  fetchData() {
    if (!this.hasErrorsGeneral("url")) {
      this.loading = true;
      this.errorInput = false;

      this.fetchApiService.generateShortURL(this.urlValue).subscribe(
        (data) => {
          this.loading= false;
          const shortURLFull = API_URLS.baseURL + '/' + data.shortUrl;

          //console.log(shortURLFull);
          this.fetchEvent.emit(shortURLFull);
        },
        (error) => {
          console.log(error);
          this.errorEvent.emit(true);
        }
      );
    }
    else{
      this.errorInput = true;
    }
  }
}
