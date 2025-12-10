import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { API_URLS } from '../../../api-urls';
import { FetchApiService } from '../../../services/fetch-api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-form-url',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './form-url.component.html',
  styleUrls: ['./form-url.component.css']
})
export class FormUrlComponent {
  fetchApiService = inject(FetchApiService);

  dataSend = '';

  urlForm: FormGroup;

  loading = false;

  errorInput = false;

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

      this.fetchApiService.generateShortURL(this.urlForm.value.url).subscribe(
        (data) => {
          this.loading= false;
          this.fetchApiService.refreshList();
          const shortURLFull = API_URLS.baseURL + '/' + data.shortUrl;

          //console.log(shortURLFull);
          this.fetchEvent.emit(shortURLFull);
        },
        (error) => {
          this.loading = false;
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
